import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name using fileURLToPath
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 2000;

// Serve static files from client directory
app.use(express.static(path.join(__dirname, '../client')));


app.get('/status', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));

});

app.listen(port, () => {
  console.log(`Fenstersensor-Dienst läuft auf http://localhost:${port}`);
});