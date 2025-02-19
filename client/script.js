// Klasse für das Smart Home
var SmartHome = /** @class */ (function () {
    function SmartHome() {
        this.raumListe = [];
        // Beispielraum hinzufügen
        this.addRaum("Wohnzimmer");
    }
    // Methode zum Hinzufügen eines Raums
    // Methode zum Hinzufügen eines Raums
    SmartHome.prototype.addRaum = function (name) {
        var fensterSensor = { name: "Fensterkontakt 1" }; // Fester Name
        var temperaturSensoren = []; // Leere Liste
        var temperatur = 23; // Standardtemperatur
        this.raumListe.push({ name: name, fensterSensor: fensterSensor, temperaturSensoren: temperaturSensoren, temperatur: temperatur });
        this.render(); // Räume rendern
    };
    SmartHome.prototype.render = function () {
        var _this = this;
        var raumListeElement = document.getElementById("raumListe");
        var overviewRoomList = document.getElementById("overviewRoomList");
        if (raumListeElement) {
            raumListeElement.innerHTML = ""; // Liste zurücksetzen
            overviewRoomList.innerHTML = ""; // Übersicht zurücksetzen
            // Container für die Eingabefelder zur Raumerstellung
            var createRoomContainer = document.createElement("div");
            createRoomContainer.className = "create-room-container"; // Für CSS-Styling
            // Eingabefeld für den neuen Raum
            var roomInput_1 = document.createElement("input");
            roomInput_1.type = "text";
            roomInput_1.placeholder = "Name des neuen Raums";
            roomInput_1.className = "room-input"; // Optional: Für CSS-Styling
            // Button zum Erstellen eines Raums
            var createRoomButton = document.createElement("button");
            createRoomButton.textContent = "Raum erstellen";
            createRoomButton.onclick = function () {
                var raumName = roomInput_1.value;
                if (raumName) {
                    smartHome.addRaum(raumName);
                    roomInput_1.value = ""; // Eingabefeld zurücksetzen
                }
                else {
                    alert("Bitte einen Namen für den Raum eingeben.");
                }
            };
            // Elemente zum Container der Raumerstellung hinzufügen
            createRoomContainer.appendChild(roomInput_1);
            createRoomContainer.appendChild(createRoomButton);
            raumListeElement.appendChild(createRoomContainer); // Container zum Raumlisten-Element hinzufügen
            // Neuer Container für alle Räume
            var roomsContainer_1 = document.createElement("div");
            roomsContainer_1.className = "rooms-container"; // Klasse für den neuen Container
            // Raumliste rendern
            this.raumListe.forEach(function (raum) {
                var raumDiv = document.createElement("div");
                raumDiv.className = "raum";
                raumDiv.id = raum.name; // ID für den Raum hinzufügen
                raumDiv.innerHTML = "<strong>".concat(raum.name, "</strong>");
                raumDiv.dataset.raumName = raum.name; // Raumname als Datenattribut speichern
                // Container für den Fenstersensor
                var fensterContainer = document.createElement("div");
                fensterContainer.className = "fenster-container";
                fensterContainer.innerHTML = "<strong>".concat(raum.fensterSensor.name, "</strong>");
                // Aktuelle Temperatur anzeigen
                var tempDisplay = document.createElement("p");
                tempDisplay.textContent = "Aktuelle Temperatur: ".concat(raum.temperatur, "\u00B0C");
                raumDiv.appendChild(tempDisplay);
                // Vorherige Temperatur speichern
                var previousTemperature = raum.temperatur;
                // Buttons für Öffnen und Schließen
                var openButton = document.createElement("button");
                openButton.textContent = "Öffnen";
                openButton.onclick = function () {
                    previousTemperature = raum.temperatur; // Vorherige Temperatur speichern
                    raum.temperatur = 15; // Temperatur auf 15 Grad setzen
                    tempDisplay.textContent = "Aktuelle Temperatur: ".concat(raum.temperatur, "\u00B0C"); // Temperatur aktualisieren
                    alert("".concat(raum.fensterSensor.name, " wurde ge\u00F6ffnet"));
                };
                var closeButton = document.createElement("button");
                closeButton.textContent = "Schließen";
                closeButton.onclick = function () {
                    raum.temperatur = previousTemperature; // Temperatur zurücksetzen
                    tempDisplay.textContent = "Aktuelle Temperatur: ".concat(raum.temperatur, "\u00B0C"); // Temperatur aktualisieren
                    alert("".concat(raum.fensterSensor.name, " wurde geschlossen"));
                };
                // Buttons zum Container hinzufügen
                fensterContainer.appendChild(openButton);
                fensterContainer.appendChild(closeButton);
                raumDiv.appendChild(fensterContainer); // Fenstercontainer zum Raum-Container hinzufügen
                // Sensoren als Liste in einem eigenen div hinzufügen
                var sensorContainer = document.createElement("div");
                sensorContainer.className = "sensor-container"; // Für CSS-Styling
                var sensorList = document.createElement("ul");
                raum.temperaturSensoren.forEach(function (sensor) {
                    var sensorItem = document.createElement("li");
                    sensorItem.textContent = sensor.name;
                    sensorList.appendChild(sensorItem);
                });
                // Wenn keine Temperatursensoren vorhanden sind
                if (raum.temperaturSensoren.length === 0) {
                    var noSensorItem = document.createElement("li");
                    noSensorItem.textContent = "Keine Temperatursensoren";
                    sensorList.appendChild(noSensorItem);
                }
                // Sensorliste zum Sensor-Container hinzufügen
                sensorContainer.appendChild(sensorList);
                raumDiv.appendChild(sensorContainer); // Sensor-Container zum Raum-Container hinzufügen
                // Container für Eingabefelder zum Hinzufügen eines Temperatursensors
                var sensorInputContainer = document.createElement("div");
                sensorInputContainer.className = "sensor-input-container"; // Für CSS-Styling
                // Eingabefeld für den neuen Temperatursensor
                var sensorInput = document.createElement("input");
                sensorInput.type = "text";
                sensorInput.placeholder = "Name des Temperatursensors";
                sensorInput.className = "sensor-input"; // Optional: Für CSS-Styling
                // Button zum Hinzufügen eines Temperatursensors
                var addTempSensorButton = document.createElement("button");
                addTempSensorButton.textContent = "Temperatursensor hinzufügen";
                addTempSensorButton.onclick = function () {
                    var sensorName = sensorInput.value;
                    var raumName = raumDiv.dataset.raumName; // Raumname vom Datenattribut abfragen
                    if (raumName && sensorName) {
                        smartHome.addTemperaturSensor(raumName, sensorName);
                        sensorInput.value = ""; // Eingabefeld zurücksetzen
                    }
                    else {
                        alert("Bitte einen Namen für den Temperatursensor eingeben.");
                    }
                };
                // Eingabefelder und Buttons zum Sensor-Input-Container hinzufügen
                sensorInputContainer.appendChild(sensorInput);
                sensorInputContainer.appendChild(addTempSensorButton);
                raumDiv.appendChild(sensorInputContainer); // Sensor-Input-Container zum Raum-Container hinzufügen
                // Hinzufügen von Temperature Input und Setze Temperatur Button
                var tempInputContainer = document.createElement("div");
                tempInputContainer.className = "temp-input-container"; // Für CSS-Styling
                var tempInput = document.createElement("input");
                tempInput.type = "number";
                tempInput.placeholder = "Temperatur setzen";
                tempInput.className = "temp-input"; // Optional: Für CSS-Styling
                var setTempButton = document.createElement("button");
                setTempButton.textContent = "Setze Temperatur";
                setTempButton.onclick = function () {
                    var newTemperature = parseFloat(tempInput.value);
                    if (!isNaN(newTemperature)) {
                        raum.temperatur = newTemperature; // Temperatur aktualisieren
                        _this.render(); // Neu rendern, um die Änderungen zu zeigen
                    }
                    else {
                        alert("Bitte eine gültige Temperatur eingeben.");
                    }
                };
                // Eingabefelder und Buttons zum Temperature Input Container hinzufügen
                tempInputContainer.appendChild(tempInput);
                tempInputContainer.appendChild(setTempButton);
                raumDiv.appendChild(tempInputContainer); // Temperatur-Input-Container zum Raum-Container hinzufügen
                // Füge den Raum-Container zum roomsContainer hinzu
                roomsContainer_1.appendChild(raumDiv);
                // Raum zur Übersichtsliste hinzufügen
                var roomItem = document.createElement("li");
                roomItem.textContent = raum.name;
                roomItem.onclick = function () {
                    // Scrollen zum entsprechenden Raum
                    raumDiv.scrollIntoView({ behavior: 'smooth' });
                };
                overviewRoomList.appendChild(roomItem); // Raum zur Übersichtsliste hinzufügen
            });
            // Füge den neuen Container für die Räume zum raumListeElement hinzu
            raumListeElement.appendChild(roomsContainer_1);
        }
    };
    // Methode zum Hinzufügen eines Temperatursensors
    SmartHome.prototype.addTemperaturSensor = function (raumName, sensorName) {
        var raumListeGefunden = this.raumListe.filter(function (r) { return r.name === raumName; });
        if (raumListeGefunden.length > 0) {
            var raum = raumListeGefunden[0]; // Nimm den ersten gefundenen Raum
            raum.temperaturSensoren.push({ name: sensorName });
            this.render();
        }
        else {
            console.log("Raum nicht gefunden"); // Optional: Fehlermeldung ausgeben
        }
    };
    return SmartHome;
}());
// Initialisierung
var smartHome = new SmartHome();
var addRaumButton = document.getElementById("addRaumButton");
var addTemperaturSensorButton = document.getElementById("addTemperaturSensorButton");
addRaumButton === null || addRaumButton === void 0 ? void 0 : addRaumButton.addEventListener("click", function () {
    var raumName = prompt("Geben Sie den Namen des neuen Raums ein:");
    if (raumName) {
        smartHome.addRaum(raumName);
    }
});
addTemperaturSensorButton === null || addTemperaturSensorButton === void 0 ? void 0 : addTemperaturSensorButton.addEventListener("click", function () {
    var raumName = prompt("In welchem Raum?");
    var sensorName = prompt("Geben Sie den Namen des Temperatursensors ein:");
    if (raumName && sensorName) {
        smartHome.addTemperaturSensor(raumName, sensorName);
    }
});
