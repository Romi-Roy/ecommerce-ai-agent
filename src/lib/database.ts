import DatabaseConstructor, { Database } from 'better-sqlite3';
import path from 'path';

// Initialize SQLite database
const dbPath = path.join(process.cwd(), 'database.db');
const db: Database = new DatabaseConstructor(dbPath);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Ensure tables exist
function initDatabase(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS product_eligibility (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      eligibility_datetime_utc TEXT NOT NULL,
      item_id INTEGER NOT NULL,
      eligibility BOOLEAN NOT NULL,
      message TEXT
    );
  `);
  db.exec(`
    CREATE TABLE IF NOT EXISTS ad_sales_metrics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      item_id INTEGER NOT NULL,
      ad_sales REAL,
      impressions INTEGER,
      ad_spend REAL,
      clicks INTEGER,
      units_sold INTEGER
    );
  `);
  db.exec(`
    CREATE TABLE IF NOT EXISTS total_sales_metrics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      item_id INTEGER NOT NULL,
      total_sales REAL,
      total_units_ordered INTEGER
    );
  `);
  console.log('Database tables created or verified');
}

initDatabase();

// Generic type for rows returned by SQL queries
export function executeQuery<T = any>(sql: string, params?: unknown): T[] {
  try {
    const stmt = db.prepare(sql);
    return stmt.all(params ?? {}) as T[];
  } catch (err) {
    console.error('❌ DB query error:', err);
    throw err;
  }
}

export default db;
