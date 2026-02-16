from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from agent import graph
from database import Base, engine

app = FastAPI()

# ✅ ADD CORS (THIS FIXES NETWORK ERROR)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure tables exist
Base.metadata.create_all(bind=engine)

@app.post("/chat")
async def chat(data: dict):
    try:
        result = graph.invoke({"message": data.get("text")})

        print("FINAL GRAPH RESULT:", result)

        return result   # ✅ RETURN FULL GRAPH

    except Exception as e:
        return {"error": str(e)}



