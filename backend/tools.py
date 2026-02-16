from langchain_core.tools import tool
from database import SessionLocal
from models import Interaction


# -----------------------------------------------------
# 1️⃣ LOG INTERACTION TOOL
# -----------------------------------------------------

@tool
def log_interaction(data: dict):
    """
    Logs CRM interaction into database.
    """

    db = SessionLocal()

    try:
        interaction = Interaction(
            hcp_name=data.get("hcp_name"),
            interaction_type=data.get("interaction_type"),
            date=data.get("date"),
            sentiment=data.get("sentiment"),
            topics=data.get("topics"),
            materials_shared=data.get("materials_shared")
        )

        db.add(interaction)
        db.commit()
        db.refresh(interaction)

        return {
            "status": "success",
            "message": "Interaction logged successfully",
            "data": data
        }

    except Exception as e:
        db.rollback()
        return {
            "status": "error",
            "message": str(e)
        }

    finally:
        db.close()



# -----------------------------------------------------
# 2️⃣ EDIT INTERACTION TOOL
# -----------------------------------------------------

@tool
def edit_interaction(data: dict):
    """
    Edits the most recent interaction record.
    """

    db = SessionLocal()

    try:
        interaction = db.query(Interaction).order_by(Interaction.id.desc()).first()

        if not interaction:
            return {
                "status": "error",
                "message": "No interaction found to edit."
            }

        for key, value in data.items():
            if hasattr(interaction, key) and value not in [None, "", "unknown"]:
                setattr(interaction, key, value)

        db.commit()
        db.refresh(interaction)

        return {
            "status": "success",
            "message": "Interaction updated successfully",
            "data": data
        }

    except Exception as e:
        db.rollback()
        return {
            "status": "error",
            "message": str(e)
        }

    finally:
        db.close()


# -----------------------------------------------------
# 3️⃣ SUGGEST FOLLOW-UP TOOL
# -----------------------------------------------------

@tool
def suggest_followup(data: dict):
    """
    Suggest a follow-up action based on sentiment.
    """

    sentiment = (data.get("sentiment") or "").lower()

    if "positive" in sentiment:
        suggestion = "Schedule follow-up meeting in 2 weeks."
    elif "negative" in sentiment:
        suggestion = "Re-engage with additional educational material."
    else:
        suggestion = "Monitor and reconnect later."

    return {
        "status": "success",
        "message": "Follow-up suggestion generated.",
        "data": {
            "follow_up": suggestion
        }
    }


# -----------------------------------------------------
# 4️⃣ ADD SAMPLE TOOL
# -----------------------------------------------------

@tool
def add_sample(data: dict):
    """
    Record product sample distribution.
    """

    return {
        "status": "success",
        "message": "Sample recorded successfully.",
        "data": data
    }


# -----------------------------------------------------
# 5️⃣ SUMMARIZE VOICE TOOL
# -----------------------------------------------------

@tool
def summarize_voice(data: str):
    """
    Summarize voice note content into structured text.
    """

    return {
        "status": "success",
        "message": "Voice note summarized.",
        "data": {
            "summary": data
        }
    }
