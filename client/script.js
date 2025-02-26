var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Klasse für das Smart Home
var SmartHome = /** @class */ (function () {
    function SmartHome() {
        this.raumListe = [];
        this.addRaum("Wohnzimmer");
    }
    // Methode zum Hinzufügen eines Raums
    SmartHome.prototype.addRaum = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var temperaturSensoren, sensor, temperatur, fensterSensorName, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("F\u00FCge Raum hinzu: ".concat(name));
                        temperaturSensoren = [];
                        sensor = [];
                        temperatur = 23;
                        fensterSensorName = "fensterkontakt-".concat(name);
                        return [4 /*yield*/, fetch('http://localhost:8000/window_sensors/', {
                                method: 'POST',
                                mode: 'cors',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ name: fensterSensorName, room_name: name })
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            alert("Fehler beim Erstellen des Fensterkontakts.");
                        }
                        console.log("Vor dem Hinzufügen:", this.raumListe);
                        this.raumListe.push({ name: name, temperaturSensoren: temperaturSensoren, temperatur: temperatur, sensor: sensor });
                        console.log("Nach dem Hinzufügen:", this.raumListe);
                        this.render();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Methode zum Hinzufügen eines Temperatursensors
    SmartHome.prototype.addTemperaturSensor = function (raumName, sensorName, currentTemperature) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, raum;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('http://localhost:8000/thermostats/', {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ name: sensorName, current_temperature: currentTemperature })
                        })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        raum = this.raumListe.find(function (r) { return r.name === raumName; });
                        if (raum) {
                            raum.temperaturSensoren.push(data.sensor_name); // Den neuen Sensor in die Liste hinzufügen
                            raum.sensor.push(data.sensor_name); // Optional: Sensor auch in der allgemeinen Sensorliste speichern
                            this.render(); // Die Ansicht aktualisieren
                            console.log("sensor gepusht");
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        alert("Fehler beim Hinzufügen des Sensors.");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SmartHome.prototype.render = function () {
        var _this = this;
        console.log("Rendern");
        console.log("Render-Methode wird aufgerufen:", this.raumListe);
        var raumListeElement = document.getElementById("raumListe");
        var overviewRoomList = document.getElementById("overviewRoomList");
        console.log("Rendern");
        console.log("Render-Methode wird aufgerufen:", this.raumListe);
        if (raumListeElement) {
            raumListeElement.innerHTML = ""; // Liste zurücksetzen
            if (overviewRoomList) {
                overviewRoomList.innerHTML = ""; // Übersicht zurücksetzen
            }
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
                    _this.addRaum(raumName);
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
                    raum.temperatur = previousTemperature - 10; // Temperatur auf 15 Grad setzen
                    tempDisplay.textContent = "Aktuelle Temperatur: ".concat(raum.temperatur, "\u00B0C"); // Temperatur aktualisieren
                    alert("Fensterkontakt ".concat(raum.name, " wurde ge\u00F6ffnet"));
                };
                var closeButton = document.createElement("button");
                closeButton.textContent = "Schließen";
                closeButton.onclick = function () {
                    raum.temperatur = previousTemperature; // Temperatur zurücksetzen
                    tempDisplay.textContent = "Aktuelle Temperatur: ".concat(raum.temperatur, "\u00B0C"); // Temperatur aktualisieren
                    alert("Fensterkontakt ".concat(raum.name, " wurde geschlossen"));
                };
                // Buttons zum Container hinzufügen
                raumDiv.appendChild(openButton);
                raumDiv.appendChild(closeButton);
                // Sensoren als Liste in einem eigenen div hinzufügen
                var sensorContainer = document.createElement("div");
                sensorContainer.className = "sensor-container"; // Für CSS-Styling
                var sensorList = document.createElement("ul");
                raum.temperaturSensoren.forEach(function (sensorName) {
                    var sensorItem = document.createElement("li");
                    sensorItem.textContent = sensorName;
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
                        _this.addTemperaturSensor(raumName, sensorName, raum.temperatur);
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
                // Container für Eingabefelder zur Temperatureingabe
                var temperatureInputContainer = document.createElement("div");
                temperatureInputContainer.className = "temperature-input-container"; // Für CSS-Styling
                // Eingabefeld für die Temperatur
                var temperatureInput = document.createElement("input");
                temperatureInput.type = "number";
                temperatureInput.placeholder = "Temperatur (°C)";
                temperatureInput.className = "temperature-input"; // Optional: Für CSS-Styling
                // Button zum Setzen der Temperatur
                var setTemperatureButton = document.createElement("button");
                setTemperatureButton.textContent = "Temperatur setzen";
                setTemperatureButton.onclick = function () {
                    var newTemperature = parseFloat(temperatureInput.value);
                    if (!isNaN(newTemperature)) {
                        raum.temperatur = newTemperature; // Temperatur setzen
                        tempDisplay.textContent = "Aktuelle Temperatur: ".concat(raum.temperatur, "\u00B0C"); // Temperatur aktualisieren
                        alert("Temperatur f\u00FCr ".concat(raum.name, " auf ").concat(raum.temperatur, "\u00B0C gesetzt"));
                        temperatureInput.value = ""; // Eingabefeld zurücksetzen
                    }
                    else {
                        alert("Bitte eine gültige Temperatur eingeben.");
                    }
                };
                // Eingabefeld und Button zum Temperatur-Input-Container hinzufügen
                temperatureInputContainer.appendChild(temperatureInput);
                temperatureInputContainer.appendChild(setTemperatureButton);
                raumDiv.appendChild(temperatureInputContainer); // Temperatur-Input-Container zum Raum-Container hinzufügen
                // Füge den Raum-Container zum roomsContainer hinzu
                roomsContainer_1.appendChild(raumDiv);
                // Raum zur Übersichtsliste hinzufügen (optional, wenn overviewRoomList null ist)
                if (overviewRoomList) {
                    var roomItem = document.createElement("li");
                    roomItem.textContent = raum.name;
                    roomItem.onclick = function () {
                        // Scrollen zum entsprechenden Raum
                        raumDiv.scrollIntoView({ behavior: 'smooth' });
                    };
                    overviewRoomList.appendChild(roomItem); // Raum zur Übersichtsliste hinzufügen
                }
            });
            // Füge den neuen Container für die Räume zum raumListeElement hinzu
            raumListeElement.appendChild(roomsContainer_1);
        }
    };
    return SmartHome;
}());
// Initialisierung
var smartHome = new SmartHome();
var addRaumButton = document.getElementById("addRaumButton");
var addTemperaturSensorButton = document.getElementById("addTemperaturSensorButton");
