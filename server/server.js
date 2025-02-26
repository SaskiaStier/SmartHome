var express = require('express');
var path = require('path');
var app = express();
var PORT = process.env.PORT || 3000;

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, 'client')));

// Route für die Hauptseite
app.get('/', function (req, res) {
    // Pfad zur index.html erstellen
    var indexPath = path.join(__dirname, 'client', 'index.html');
    res.sendFile(indexPath); // index.html zurückgeben
});

// Start des Servers
app.listen(PORT, function () {
    console.log("Server läuft auf http://localhost:".concat(PORT));
});
