import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, '../client')));

// Route für die Hauptseite
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Start des Servers
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});