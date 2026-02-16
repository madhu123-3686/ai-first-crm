# AI-First CRM – HCP Interaction Module

## 📌 Overview

This project implements an AI-First Customer Relationship Management (CRM) system focused on Healthcare Professional (HCP) interaction logging.

The system allows field representatives to log HCP interactions using:
- Structured Form Interface
- Conversational AI Chat Interface

The AI backend uses LangGraph and Groq LLMs for intelligent extraction, classification, and tool execution.

---

## 🏗 Tech Stack

### Frontend
- React
- Redux (State Management)
- Google Inter Font

### Backend
- Python
- FastAPI
- LangGraph (AI Agent Framework)
- Groq LLM (llama-3.3-70b-versatile)
- PostgreSQL

---

## 🤖 LangGraph AI Agent Architecture

The LangGraph agent performs:

1. Intent Classification
2. Data Extraction (structured JSON)
3. Tool Execution
4. Response Handling

The agent workflow:

Intent → Extract → Execute Tool → Return Result

---

## 🛠 Implemented AI Tools

### 1️⃣ Log Interaction (Mandatory Tool)

Captures structured interaction data from conversational input.

Process:
- LLM extracts structured fields
- Tool inserts record into PostgreSQL
- Returns success response with record ID

Fields captured:
- HCP Name
- Interaction Type
- Date
- Time
- Attendees
- Sentiment
- Topics
- Materials Shared
- Samples Distributed
- Outcomes
- Follow-up

---

### 2️⃣ Edit Interaction (Mandatory Tool)

Allows modification of most recent logged interaction.

Process:
- Retrieves latest record
- Updates only provided fields
- Commits changes to database

---

### 3️⃣ Suggest Follow-up

Generates follow-up suggestions based on sentiment analysis.

---

### 4️⃣ Add Sample

Logs product sample distribution information.

---

### 5️⃣ Summarize Voice Note

Allows summarization of voice-based interaction logs into structured format.

---

## 🧠 Why llama-3.3-70b-versatile?

The originally specified model `gemma2-9b-it` has been deprecated by Groq.

The implementation was upgraded to `llama-3.3-70b-versatile` for:

- Better structured JSON extraction
- Improved reasoning
- Stable long-term support in Groq

---

## 🚀 How To Run

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload


Backend runs at:

http://127.0.0.1:8000


Frontend
cd frontend
npm install
npm start


Frontend runs at:

http://localhost:3000


📊 Database

PostgreSQL is used to store interaction logs.

Tables:

interactions



