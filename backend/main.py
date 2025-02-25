import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

# Verwende die Universal.db im Ordner "Database"
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./Database/Universal.db")

# Wichtig: Für SQLite muss check_same_thread auf False gesetzt werden
engine = create_engine(
    DATABASE_URL,
    #connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# --- Models ---
class Room(Base):
    __tablename__ = "rooms"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    temperature = Column(Float, default=23.0)
    window_state = Column(String, default="closed")  # "open" oder "closed"
    thermostats = relationship("Thermostat", back_populates="room")

class Thermostat(Base):
    __tablename__ = "thermostats"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    current_temperature = Column(Float, default=23.0)
    room_id = Column(Integer, ForeignKey("rooms.id"))
    room = relationship("Room", back_populates="thermostats")

# Erstellt (oder nutzt) die Tabellen in Universal.db
Base.metadata.create_all(bind=engine)

# --- Schemas ---
class ThermostatCreate(BaseModel):
    name: str
    current_temperature: Optional[float] = 23.0

class RoomCreate(BaseModel):
    name: str

class RoomResponse(BaseModel):
    id: int
    name: str
    temperature: float
    window_state: str
    thermostats: List[ThermostatCreate] = []
    class Config:
        orm_mode = True

# --- API ---
app = FastAPI()

@app.post("/rooms/", response_model=RoomResponse)
def create_room(room: RoomCreate):
    db = SessionLocal()
    db_room = Room(name=room.name)
    db.add(db_room)
    db.commit()
    db.refresh(db_room)
    db.close()
    return db_room

@app.get("/rooms/", response_model=List[RoomResponse])
def get_rooms():
    db = SessionLocal()
    rooms = db.query(Room).all()
    db.close()
    return rooms
