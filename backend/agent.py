import os
import json
from datetime import datetime
from dotenv import load_dotenv
from typing import TypedDict

from langgraph.graph import StateGraph
from langchain_groq import ChatGroq

from tools import (
    log_interaction,
    edit_interaction,
    suggest_followup,
    add_sample
)

load_dotenv()

# -----------------------------------------------------
# LLM CONFIG
# -----------------------------------------------------

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    groq_api_key=os.getenv("GROQ_API_KEY")
)


# -----------------------------------------------------
# STATE DEFINITION
# -----------------------------------------------------

class CRMState(TypedDict, total=False):
    message: str
    intent: str
    data: dict
    response: dict


# -----------------------------------------------------
# SAFE JSON PARSER
# -----------------------------------------------------

def safe_json_parse(text):
    try:
        text = text.strip()

        # Remove markdown blocks safely
        if "```" in text:
            text = text.replace("```json", "")
            text = text.replace("```", "")
            text = text.strip()

        return json.loads(text)

    except Exception:
        print("JSON PARSE ERROR:", text)
        raise ValueError(f"LLM did not return valid JSON:\n{text}")


# -----------------------------------------------------
# 1️⃣ INTENT CLASSIFIER
# -----------------------------------------------------

def classify_intent(state: CRMState):
    message = state.get("message")

    prompt = f"""
You are a strict JSON API.

Classify the CRM message into ONE of:
- log_interaction
- edit_interaction
- suggest_followup
- add_sample

Message:
{message}

Respond ONLY in valid JSON:
{{"intent": "log_interaction"}}
"""

    response = llm.invoke(prompt)
    print("INTENT RAW RESPONSE:", response.content)

    parsed = safe_json_parse(response.content)

    return {
        "message": message,
        "intent": parsed["intent"]
    }


# -----------------------------------------------------
# 2️⃣ DATA EXTRACTION
# -----------------------------------------------------

def extract_data(state: CRMState):
    message = state.get("message")
    intent = state.get("intent")

    prompt = f"""
You are a professional CRM data extractor.

Extract ALL structured information.

Rules:
- If "today" is mentioned → return today's date as DD-MM-YYYY.
- If time is mentioned → extract exact time.
- If meeting words like "met", "meeting", "face to face" → interaction_type = "Meeting".
- If call words like "called", "phone call" → interaction_type = "Call".
- If not found → write "unknown".

Message:
{message}

Return ONLY valid JSON:

{{
  "hcp_name": "",
  "interaction_type": "",
  "date": "",
  "time": "",
  "attendees": "",
  "sentiment": "",
  "topics": "",
  "materials_shared": "",
  "samples_distributed": "",
  "outcomes": "",
  "follow_up": ""
}}
"""

    response = llm.invoke(prompt)
    print("EXTRACT RAW RESPONSE:", response.content)

    data = safe_json_parse(response.content)

    # 🔥 Deterministic Fix for "today"
    if data.get("date", "").lower() == "today":
        data["date"] = datetime.now().strftime("%d-%m-%Y")

    return {
        "message": message,
        "intent": intent,
        "data": data
    }


# -----------------------------------------------------
# 3️⃣ EXECUTE TOOL
# -----------------------------------------------------

def execute_tool(state: CRMState):
    intent = state.get("intent")
    data = state.get("data")

    if intent == "log_interaction":
        result = log_interaction.invoke({"data": data})

    else:
        result = {"error": "Unknown intent"}

    print("TOOL RESULT:", result)

    return {
        "message": state.get("message"),
        "intent": intent,
        "data": data,
        "response": result
    }



# -----------------------------------------------------
# LANGGRAPH WORKFLOW
# -----------------------------------------------------

workflow = StateGraph(CRMState)

workflow.add_node("intent", classify_intent)
workflow.add_node("extract", extract_data)
workflow.add_node("execute", execute_tool)

workflow.set_entry_point("intent")
workflow.add_edge("intent", "extract")
workflow.add_edge("extract", "execute")

workflow.set_finish_point("execute")

graph = workflow.compile()
