const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.DATABASE_URL?.includes('supabase.co') ||
    process.env.DATABASE_URL?.includes('pooler.supabase.com')
      ? { rejectUnauthorized: false }
      : undefined,
});

async function query(text, params) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

async function initSchema() {
  await query(`
    CREATE TABLE IF NOT EXISTS urls (
      id          SERIAL        PRIMARY KEY,
      short_code  VARCHAR(20)   UNIQUE NOT NULL,
      long_url    TEXT          NOT NULL,
      created_at  TIMESTAMPTZ   DEFAULT NOW(),
      hits        INTEGER       DEFAULT 0
    );
  `);
  console.log('DB ready');
}

module.exports = { query, initSchema };