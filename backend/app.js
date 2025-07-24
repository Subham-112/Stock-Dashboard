const express = require('express');
const cors = require('cors');
const sqlite = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 1000;

app.use(cors());
app.use(express.json());

const db = new sqlite.Database('./database.db');

app.use(express.static(path.join(__dirname, 'frontend', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});


app.get("/stocks", (req, res) => {
  db.all("SELECT DISTINCT symbol FROM stocks", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get("/stocks/:symbol", (req, res) => {
  const symbol = req.params.symbol;
  db.all("SELECT * FROM stocks WHERE symbol = ?", [symbol], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Started on port ${PORT}`)
})