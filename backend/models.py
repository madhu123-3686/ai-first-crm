from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from database import Base

class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    hcp_name = Column(String)
    interaction_type = Column(String)
    date = Column(String)
    time = Column(String)  # NEW
    attendees = Column(Text)  # NEW
    sentiment = Column(String)
    topics = Column(Text)
    materials_shared = Column(String)
    samples_distributed = Column(String)  # NEW
    outcomes = Column(Text)  # NEW
    follow_up = Column(Text)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
