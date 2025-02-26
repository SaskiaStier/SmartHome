// Raum-Schnittstelle
interface Raum {
    name: string;
    temperaturSensoren: string[];
    temperatur: number;
}

// Klasse für das Smart Home
class SmartHome {
    private raumListe: Raum[] = [];

    constructor() {
        this.addRaum("Wohnzimmer");
    }

    // Methode zum Hinzufügen eines Raums
    async addRaum(name: string): Promise<void> {
        const temperaturSensoren: string[] = [];
        const temperatur: number = 23;
        this.raumListe.push({ name, temperaturSensoren, temperatur });

        const fensterSensorName = `fensterkontakt-${name}`;
        const response = await fetch('http://localhost:8000/window_sensors/', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: fensterSensorName, room_name: name })
        });

        if (!response.ok) {
            alert("Fehler beim Erstellen des Fensterkontakts.");
        }

        this.render();
    }

    // Methode zum Hinzufügen eines Temperatursensors
    async addTemperaturSensor(raumName: string, sensorName: string, currentTemperature: number): Promise<void> {
        const response = await fetch('http://localhost:8000/thermostats/', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: sensorName, current_temperature: currentTemperature })
        });

        if (response.ok) {
            const raum = this.raumListe.find(r => r.name === raumName);
            if (raum) {
                raum.temperaturSensoren.push(sensorName);
                this.render();
            }
        } else {
            alert("Fehler beim Hinzufügen des Sensors.");
        }
    }

    render(): void {
        const raumListeElement = document.getElementById("raumListe");
        const overviewRoomList = document.getElementById("overviewRoomList");

        if (raumListeElement) {
            raumListeElement.innerHTML = ""; // Liste zurücksetzen
            if (overviewRoomList) {
                overviewRoomList.innerHTML = ""; // Übersicht zurücksetzen
            }

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
                    this.addRaum(raumName);
                    roomInput.value = ""; // Eingabefeld zurücksetzen
                } else {
                    alert("Bitte einen Namen für den Raum eingeben.");
                }
            };

            // Elemente zum Container der Raumerstellung hinzufügen
            createRoomContainer.appendChild(roomInput);
            createRoomContainer.appendChild(createRoomButton);
            raumListeElement.appendChild(createRoomContainer); // Container zum Raumlisten-Element hinzufügen

            // Neuer Container für alle Räume
            const roomsContainer = document.createElement("div");
            roomsContainer.className = "rooms-container"; // Klasse für den neuen Container

            // Raumliste rendern
            this.raumListe.forEach(raum => {
                const raumDiv = document.createElement("div");
                raumDiv.className = "raum";
                raumDiv.id = raum.name; // ID für den Raum hinzufügen
                raumDiv.innerHTML = `<strong>${raum.name}</strong>`;
                raumDiv.dataset.raumName = raum.name; // Raumname als Datenattribut speichern

                // Aktuelle Temperatur anzeigen
                const tempDisplay = document.createElement("p");
                tempDisplay.textContent = `Aktuelle Temperatur: ${raum.temperatur}°C`;
                raumDiv.appendChild(tempDisplay);

                // Vorherige Temperatur speichern
                let previousTemperature = raum.temperatur;

                // Buttons für Öffnen und Schließen
                const openButton = document.createElement("button");
                openButton.textContent = "Öffnen";
                openButton.onclick = () => {
                    previousTemperature = raum.temperatur; // Vorherige Temperatur speichern
                    raum.temperatur = previousTemperature-10; // Temperatur auf 15 Grad setzen
                    tempDisplay.textContent = `Aktuelle Temperatur: ${raum.temperatur}°C`; // Temperatur aktualisieren
                    alert(`Fensterkontakt ${raum.name} wurde geöffnet`);
                };

                const closeButton = document.createElement("button");
                closeButton.textContent = "Schließen";
                closeButton.onclick = () => {
                    raum.temperatur = previousTemperature; // Temperatur zurücksetzen
                    tempDisplay.textContent = `Aktuelle Temperatur: ${raum.temperatur}°C`; // Temperatur aktualisieren
                    alert(`Fensterkontakt ${raum.name} wurde geschlossen`);
                };

                // Buttons zum Container hinzufügen
                raumDiv.appendChild(openButton);
                raumDiv.appendChild(closeButton);

                // Sensoren als Liste in einem eigenen div hinzufügen
                const sensorContainer = document.createElement("div");
                sensorContainer.className = "sensor-container"; // Für CSS-Styling

                const sensorList = document.createElement("ul");
                raum.temperaturSensoren.forEach(sensorName => {
                    const sensorItem = document.createElement("li");
                    sensorItem.textContent = sensorName;
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
                        this.addTemperaturSensor(raumName, sensorName, raum.temperatur);
                        sensorInput.value = ""; // Eingabefeld zurücksetzen
                    } else {
                        alert("Bitte einen Namen für den Temperatursensor eingeben.");
                    }
                };

                // Eingabefelder und Buttons zum Sensor-Input-Container hinzufügen
                sensorInputContainer.appendChild(sensorInput);
                sensorInputContainer.appendChild(addTempSensorButton);
                raumDiv.appendChild(sensorInputContainer); // Sensor-Input-Container zum Raum-Container hinzufügen

                // Container für Eingabefelder zur Temperatureingabe
                const temperatureInputContainer = document.createElement("div");
                temperatureInputContainer.className = "temperature-input-container"; // Für CSS-Styling

                // Eingabefeld für die Temperatur
                const temperatureInput = document.createElement("input");
                temperatureInput.type = "number";
                temperatureInput.placeholder = "Temperatur (°C)";
                temperatureInput.className = "temperature-input"; // Optional: Für CSS-Styling

                // Button zum Setzen der Temperatur
                const setTemperatureButton = document.createElement("button");
                setTemperatureButton.textContent = "Temperatur setzen";
                setTemperatureButton.onclick = () => {
                    const newTemperature = parseFloat(temperatureInput.value);
                    if (!isNaN(newTemperature)) {
                        raum.temperatur = newTemperature; // Temperatur setzen
                        tempDisplay.textContent = `Aktuelle Temperatur: ${raum.temperatur}°C`; // Temperatur aktualisieren
                        alert(`Temperatur für ${raum.name} auf ${raum.temperatur}°C gesetzt`);
                        temperatureInput.value = ""; // Eingabefeld zurücksetzen
                    } else {
                        alert("Bitte eine gültige Temperatur eingeben.");
                    }
                };

                // Eingabefeld und Button zum Temperatur-Input-Container hinzufügen
                temperatureInputContainer.appendChild(temperatureInput);
                temperatureInputContainer.appendChild(setTemperatureButton);
                raumDiv.appendChild(temperatureInputContainer); // Temperatur-Input-Container zum Raum-Container hinzufügen

                // Füge den Raum-Container zum roomsContainer hinzu
                roomsContainer.appendChild(raumDiv);

                // Raum zur Übersichtsliste hinzufügen (optional, wenn overviewRoomList null ist)
                if (overviewRoomList) {
                    const roomItem = document.createElement("li");
                    roomItem.textContent = raum.name;
                    roomItem.onclick = () => {
                        // Scrollen zum entsprechenden Raum
                        raumDiv.scrollIntoView({ behavior: 'smooth' });
                    };
                    overviewRoomList.appendChild(roomItem); // Raum zur Übersichtsliste hinzufügen
                }
            });

            // Füge den neuen Container für die Räume zum raumListeElement hinzu
            raumListeElement.appendChild(roomsContainer);
        }
    }
}

// Initialisierung
const smartHome = new SmartHome();
const addRaumButton = document.getElementById("addRaumButton");
const addTemperaturSensorButton = document.getElementById("addTemperaturSensorButton");