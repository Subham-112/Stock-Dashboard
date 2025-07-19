const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const readline = require('readline');

const db = new sqlite3.Database('database.db');

db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS stocks`);
  db.run(`
    CREATE TABLE stocks (
      symbol TEXT,
      date TEXT,
      open REAL,
      high REAL,
      low REAL,
      close REAL,
      volume INTEGER
    )
  `);

  const rl = readline.createInterface({
    input: fs.createReadStream('data.csv'),
    crlfDelay: Infinity
  });

  rl.on('line', (line) => {
    if (line.startsWith("symbol")) return; // skip header
    const [symbol, date, open, high, low, close, volume] = line.split(",");
    db.run(
      `INSERT INTO stocks (symbol, date, open, high, low, close, volume)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [symbol, date, open, high, low, close, volume]
    );
  });

  rl.on('close', () => {
    console.log("CSV data imported to database.db ✅");
    db.close();
  });
});
