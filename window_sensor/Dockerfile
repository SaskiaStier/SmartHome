# Basis-Image
FROM node:14

# Arbeitsverzeichnis erstellen
WORKDIR /usr/src/window_sensor/server  
# Abhängigkeiten installieren
COPY package*.json ./
RUN npm install

# Quellcode kopieren
COPY . .


# Container-Name setzen (optional)
ARG CONTAINER_NAME
ENV CONTAINER_NAME=${CONTAINER_NAME}

# Anwendung starten
CMD ["npm", "start"]