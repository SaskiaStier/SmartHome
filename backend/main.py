from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import docker
import os
import logging
import subprocess

logging.basicConfig(level=logging.INFO)
app = FastAPI()

# CORS-Middleware hinzufügen
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Docker-Client initialisieren
client = docker.from_env()

# --- Datenmodelle ---
class ThermostatCreate(BaseModel):
    name: str
    current_temperature: float

class WindowSensorCreate(BaseModel):
    name: str
    room_name: str
# --- Hilfsfunktionen ---
def create_container_with_cmd(image_name, container_name, environment, current_temperature=None):
    env_params = ["-e", f"CONTAINER_NAME={container_name}"]
    
    if current_temperature is not None:
        env_params.append(f"-e CURRENT_TEMPERATURE={current_temperature}")
    
    cmd = ["docker", "run", "--name", container_name] + env_params + [image_name]

    try:
        result = subprocess.run(cmd, check=True, capture_output=True, text=True)
        logging.info(f"Befehl ausgeführt: {result.stdout}")
        return True
    except subprocess.CalledProcessError as e:
        logging.error(f"Fehler bei Befehlsausführung: {e.stderr}")
        print(f"Fehler bei Befehlsausführung: {e.stderr}")  
        return False

# --- Endpunkte ---
@app.post("/thermostats/")
def create_thermostat(sensor: ThermostatCreate):
    container_name = f"thermostat_{sensor.name.replace(' ', '_')}"
    
    logging.info(f"Versuche Container {container_name} zu erstellen")
    
    if create_container_with_cmd("smarthome-thermostat_sensor", container_name, {}, sensor.current_temperature):
        return {
            "message": "Thermostat-Container erstellt",
            "sensor_name": sensor.name,  # Name des Sensors zurückgeben
            "container_name": container_name  # Optional: Falls der Containername benötigt wird
        }
    else:
        raise HTTPException(status_code=500, detail="Fehler beim Erstellen des Thermostat-Containers")

@app.post("/window_sensors/")
def create_window_sensor(sensor: WindowSensorCreate):
    container_name = f"window_sensor_{sensor.name.replace(' ', '_')}_{sensor.room_name.replace(' ', '_')}"
    
    logging.info(f"Versuche Container {container_name} zu erstellen")
    
    if create_container_with_cmd("smarthome-window_sensor", container_name, {}):
        return {"message": "Fenstersensor-Container erstellt", "sensor_name": sensor.name}
    else:
        raise HTTPException(status_code=500, detail="Fehler beim Erstellen des Fenstersensor-Containers")