const sqlite3 = require('sqlite3').verbose();
const yahooFinance = require('yahoo-finance2').default;

const db = new sqlite3.Database('database.db');

// ✅ List of 10 Indian stock symbols (on NSE)
const symbols = [
  "TCS.NS", "INFY.NS", "RELIANCE.NS", "HDFCBANK.NS", "ICICIBANK.NS",
  "SBIN.NS", "HINDUNILVR.NS", "LT.NS", "AXISBANK.NS", "BAJFINANCE.NS"
];

async function fetchAndSaveStockData() {
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
  });

  const insert = db.prepare(`
    INSERT INTO stocks (symbol, date, open, high, low, close, volume)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  for (let symbol of symbols) {
    try {
      const result = await yahooFinance.historical(symbol, {
        period1: '2025-07-01',
        period2: '2025-07-10',
        interval: '1d',
      });

      result.forEach(row => {
        insert.run(
          symbol,
          row.date.toISOString().split("T")[0], // format YYYY-MM-DD
          row.open,
          row.high,
          row.low,
          row.close,
          row.volume
        );
      });

      console.log(`✅ Inserted data for ${symbol}`);
    } catch (error) {
      console.error(`❌ Failed to fetch ${symbol}:`, error.message);
    }
  }

  insert.finalize(() => {
    console.log("✅ All stock data imported successfully");
    db.close();
  });
}

fetchAndSaveStockData();