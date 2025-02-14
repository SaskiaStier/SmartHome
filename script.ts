// Schnittstelle für Sensoren
interface Sensor {
    name: string;
}

// Raum-Schnittstelle
// Raum-Schnittstelle
interface Raum {
    name: string;
    fensterSensor: Sensor;
    temperaturSensoren: Sensor[];
    temperatur: number; // Neue Eigenschaft für die Temperatur
}

// Klasse für das Smart Home
class SmartHome {
    private raumListe: Raum[] = [];

    constructor() {
        // Beispielraum hinzufügen
        this.addRaum("Wohnzimmer");
    }

    // Methode zum Hinzufügen eines Raums
    // Methode zum Hinzufügen eines Raums
addRaum(name: string): void {
    const fensterSensor: Sensor = { name: "Fensterkontakt 1" }; // Fester Name
    const temperaturSensoren: Sensor[] = []; // Leere Liste
    const temperatur: number = 23; // Standardtemperatur
    this.raumListe.push({ name, fensterSensor, temperaturSensoren, temperatur });
    this.render();
}


    // Methode zum Rendern der Raumliste
    // Methode zum Rendern der Raumliste
    // Methode zum Rendern der Raumliste
// Methode zum Rendern der Raumliste
render(): void {
    const raumListeElement = document.getElementById("raumListe");
    const overviewRoomList = document.getElementById("overviewRoomList");
    
    if (raumListeElement) {
        raumListeElement.innerHTML = ""; // Liste zurücksetzen
        overviewRoomList.innerHTML = ""; // Übersicht zurücksetzen

        // Container für die Eingabefelder zur Raumerstellung
        const createRoomContainer = document.createElement("div");
        createRoomContainer.className = "create-room-container"; // Für CSS-Styling

        // Eingabefeld für den neuen Raum
        const roomInput = document.createElement("input");
        roomInput.type = "text";
        roomInput.placeholder = "Name des neuen Raums";
        roomInput.className = "room-input"; // Optional: Für CSS-Styling

        // Button zum Erstellen eines Raums
        const createRoomButton = document.createElement("button");
        createRoomButton.textContent = "Raum erstellen";
        createRoomButton.onclick = () => {
            const raumName = roomInput.value;
            if (raumName) {
                smartHome.addRaum(raumName);
                roomInput.value = ""; // Eingabefeld zurücksetzen
            } else {
                alert("Bitte einen Namen für den Raum eingeben.");
            }
        };

        // Elemente zum Container der Raumerstellung hinzufügen
        createRoomContainer.appendChild(roomInput);
        createRoomContainer.appendChild(createRoomButton);
        raumListeElement.appendChild(createRoomContainer); // Container zum Raumlisten-Element hinzufügen

        // Raumliste rendern
        this.raumListe.forEach(raum => {
            const raumDiv = document.createElement("div");
            raumDiv.className = "raum";
            raumDiv.innerHTML = `<strong>${raum.name}</strong>`;
            raumDiv.dataset.raumName = raum.name; // Raumname als Datenattribut speichern
            
            // Container für den Fenstersensor
            const fensterContainer = document.createElement("div");
            fensterContainer.className = "fenster-container";
            fensterContainer.innerHTML = `<strong>${raum.fensterSensor.name}</strong>`;

            // Buttons für Öffnen und Schließen
            const openButton = document.createElement("button");
            openButton.textContent = "Öffnen";
            openButton.onclick = () => alert(`${raum.fensterSensor.name} wurde geöffnet`);

            const closeButton = document.createElement("button");
            closeButton.textContent = "Schließen";
            closeButton.onclick = () => alert(`${raum.fensterSensor.name} wurde geschlossen`);

            // Buttons zum Container hinzufügen
            fensterContainer.appendChild(openButton);
            fensterContainer.appendChild(closeButton);
            raumDiv.appendChild(fensterContainer); // Fenstercontainer zum Raum-Container hinzufügen

            // Aktuelle Temperatur anzeigen
            const tempDisplay = document.createElement("p");
            tempDisplay.textContent = `Aktuelle Temperatur: ${raum.temperatur}°C`;
            raumDiv.appendChild(tempDisplay);

            // Sensoren als Liste in einem eigenen div hinzufügen
            const sensorContainer = document.createElement("div");
            sensorContainer.className = "sensor-container"; // Für CSS-Styling

            const sensorList = document.createElement("ul");
            raum.temperaturSensoren.forEach(sensor => {
                const sensorItem = document.createElement("li");
                sensorItem.textContent = sensor.name;
                sensorList.appendChild(sensorItem);
            });
            
            // Wenn keine Temperatursensoren vorhanden sind
            if (raum.temperaturSensoren.length === 0) {
                const noSensorItem = document.createElement("li");
                noSensorItem.textContent = "Keine Temperatursensoren";
                sensorList.appendChild(noSensorItem);
            }

            // Sensorliste zum Sensor-Container hinzufügen
            sensorContainer.appendChild(sensorList);
            raumDiv.appendChild(sensorContainer); // Sensor-Container zum Raum-Container hinzufügen

            // Container für Eingabefelder zum Hinzufügen eines Temperatursensors
            const sensorInputContainer = document.createElement("div");
            sensorInputContainer.className = "sensor-input-container"; // Für CSS-Styling
            
            // Eingabefeld für den neuen Temperatursensor
            const sensorInput = document.createElement("input");
            sensorInput.type = "text";
            sensorInput.placeholder = "Name des Temperatursensors";
            sensorInput.className = "sensor-input"; // Optional: Für CSS-Styling

            // Button zum Hinzufügen eines Temperatursensors
            const addTempSensorButton = document.createElement("button");
            addTempSensorButton.textContent = "Temperatursensor hinzufügen";
            addTempSensorButton.onclick = () => {
                const sensorName = sensorInput.value;
                const raumName = raumDiv.dataset.raumName; // Raumname vom Datenattribut abfragen
                if (raumName && sensorName) {
                    smartHome.addTemperaturSensor(raumName, sensorName);
                    sensorInput.value = ""; // Eingabefeld zurücksetzen
                } else {
                    alert("Bitte einen Namen für den Temperatursensor eingeben.");
                }
            };

            // Eingabefelder und Buttons zum Sensor-Input-Container hinzufügen
            sensorInputContainer.appendChild(sensorInput);
            sensorInputContainer.appendChild(addTempSensorButton);
            raumDiv.appendChild(sensorInputContainer); // Sensor-Input-Container zum Raum-Container hinzufügen
            
            // Hinzufügen von Temperature Input und Setze Temperatur Button
            const tempInputContainer = document.createElement("div");
            tempInputContainer.className = "temp-input-container"; // Für CSS-Styling

            const tempInput = document.createElement("input");
            tempInput.type = "number";
            tempInput.placeholder = "Temperatur setzen";
            tempInput.className = "temp-input"; // Optional: Für CSS-Styling

            const setTempButton = document.createElement("button");
            setTempButton.textContent = "Setze Temperatur";
            setTempButton.onclick = () => {
                const newTemperature = parseFloat(tempInput.value);
                if (!isNaN(newTemperature)) {
                    raum.temperatur = newTemperature; // Temperatur aktualisieren
                    this.render(); // Neu rendern, um die Änderungen zu zeigen
                } else {
                    alert("Bitte eine gültige Temperatur eingeben.");
                }
            };

            // Eingabefelder und Buttons zum Temperature Input Container hinzufügen
            tempInputContainer.appendChild(tempInput);
            tempInputContainer.appendChild(setTempButton);
            raumDiv.appendChild(tempInputContainer); // Temperatur-Input-Container zum Raum-Container hinzufügen
            
            raumListeElement.appendChild(raumDiv);

            // Raum zur Übersicht hinzufügen
            const roomItem = document.createElement("li");
            roomItem.textContent = raum.name;
            overviewRoomList.appendChild(roomItem); // Raum zur Übersichtsliste hinzufügen
        });
    }
}

    // Methode zum Hinzufügen eines Temperatursensors
    addTemperaturSensor(raumName: string, sensorName: string): void {
        const raumListeGefunden = this.raumListe.filter(r => r.name === raumName);
        
        if (raumListeGefunden.length > 0) {
            const raum = raumListeGefunden[0]; // Nimm den ersten gefundenen Raum
            raum.temperaturSensoren.push({ name: sensorName });
            this.render();
        } else {
            console.log("Raum nicht gefunden"); // Optional: Fehlermeldung ausgeben
        }
    }
}

// Initialisierung
const smartHome = new SmartHome();
const addRaumButton = document.getElementById("addRaumButton");
const addTemperaturSensorButton = document.getElementById("addTemperaturSensorButton");

addRaumButton?.addEventListener("click", () => {
    const raumName = prompt("Geben Sie den Namen des neuen Raums ein:");
    if (raumName) {
        smartHome.addRaum(raumName);
    }
});

addTemperaturSensorButton?.addEventListener("click", () => {
    const raumName = prompt("In welchem Raum?");
    const sensorName = prompt("Geben Sie den Namen des Temperatursensors ein:");
    if (raumName && sensorName) {
        smartHome.addTemperaturSensor(raumName, sensorName);
    }
});