import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 2000;


app.use(express.static(path.join(new URL('.', import.meta.url).pathname, '../client')));

app.get('/status', (req, res) => {
    res.sendFile(path.join(new URL('.', import.meta.url).pathname, '../client/index.html'));
});

app.listen(port, () => {
  console.log(`Thermostat-Dienst läuft auf http://localhost:${port}`);
});
