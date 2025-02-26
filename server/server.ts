const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, 'client'))); // Hier den Pfad zu 'client' anpassen

// Route für die Hauptseite
app.get('/', function (req, res) {
    const indexPath = path.join(__dirname, 'client', 'index.html'); // Hier den Pfad zur index.html anpassen
    res.sendFile(indexPath);
});

// Server starten
app.listen(PORT, function () {
    console.log(`Hauptserver läuft auf http://localhost:${PORT}`);
});