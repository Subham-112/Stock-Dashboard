const express = require('express');
const cors = require('cors');
const sqlite = require('sqlite3').verbose();

const app = express();
const PORT = 1000;

app.use(cors());
app.use(express.json());

const db = new sqlite.Database('./database.db');

app.get("/stock", (req, res) => {
  db.all("SELECT DISTINCT symbol FROM stocks", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get("/stock/:symbol", (req, res) => {
  const symbol = req.params.symbol;
  db.all("SELECT * FROM stocks WHERE symbol = ?", [symbol], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, () => {
    console.log(`Started on port ${PORT}`)
})