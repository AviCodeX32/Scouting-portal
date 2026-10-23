import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;

const isPlaceholder = !process.env.DATABASE_URL || 
  process.env.DATABASE_URL.includes('[neon_user]') || 
  process.env.DATABASE_URL.includes('your_neon_') ||
  process.env.DATABASE_URL.includes('example');

let pool = null;

if (!isPlaceholder) {
  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 5000
    });

    pool.on('error', (err) => {
      console.warn('PostgreSQL Pool warning:', err.message);
    });
  } catch (err) {
    console.warn('Could not initialize PostgreSQL pool:', err.message);
    pool = null;
  }
} else {
  console.log('⚡ Running in In-Memory Resilient Demo Mode with 12 seeded tables (Neon DATABASE_URL is placeholder).');
}

export { pool };

export const isDbConnected = async () => {
  if (!pool) return false;
  try {
    const res = await pool.query('SELECT 1');
    return !!res;
  } catch (err) {
    return false;
  }
};
