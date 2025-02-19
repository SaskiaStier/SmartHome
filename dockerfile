# Basis-Image
FROM node:14

# Arbeitsverzeichnis erstellen
WORKDIR /usr/src/app1

# Abhängigkeiten installieren
COPY package*.json ./
RUN npm install

# Quellcode kopieren
COPY . .

# Anwendung starten
CMD ["npm", "start"]