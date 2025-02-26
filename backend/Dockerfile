FROM python:3.9-slim

# Installieren Sie Docker-Client
RUN apt-get update && apt-get install -y docker.io && rm -rf /var/lib/apt/lists/*

# Arbeitsverzeichnis setzen
WORKDIR /app

# Abhängigkeiten installieren
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Restlichen Code kopieren
COPY . .

# Startbefehl
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]