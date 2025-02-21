from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import os

# Datenbank-URL (wird von docker-compose per Environment-Variable gesetzt)
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@db:5432/smarthome")

engine = create_engine(DATABASE_URL)
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

@app.post("/rooms/{room_id}/thermostats/", response_model=ThermostatCreate)
def add_thermostat(room_id: int, thermostat: ThermostatCreate):
    db = SessionLocal()
    db_room = db.query(Room).filter(Room.id == room_id).first()
    if not db_room:
        db.close()
        raise HTTPException(status_code=404, detail="Room not found")
    db_thermostat = Thermostat(
        name=thermostat.name,
        current_temperature=thermostat.current_temperature,
        room_id=room_id
    )
    db.add(db_thermostat)
    db.commit()
    db.refresh(db_thermostat)
    db.close()
    return db_thermostat

@app.post("/rooms/{room_id}/window/")
def update_window_state(room_id: int, state: str):
    db = SessionLocal()
    db_room = db.query(Room).filter(Room.id == room_id).first()
    if not db_room:
        db.close()
        raise HTTPException(status_code=404, detail="Room not found")
    if state not in ["open", "closed"]:
        db.close()
        raise HTTPException(status_code=400, detail="Invalid state")
    db_room.window_state = state
    db.commit()
    db.refresh(db_room)
    db.close()
    return {"room_id": room_id, "window_state": state}

@app.post("/rooms/{room_id}/thermostats/{thermostat_id}/update")
def update_thermostat_temperature(room_id: int, thermostat_id: int, temperature: float):
    db = SessionLocal()
    thermostat = db.query(Thermostat).filter(
        Thermostat.id == thermostat_id,
        Thermostat.room_id == room_id
    ).first()
    if not thermostat:
        db.close()
        raise HTTPException(status_code=404, detail="Thermostat not found")
    thermostat.current_temperature = temperature
    db.commit()
    db.refresh(thermostat)
    db.close()
    return {"thermostat_id": thermostat_id, "new_temperature": temperature}
