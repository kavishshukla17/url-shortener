const express = require('express');
const { nanoid } = require('nanoid');
const db = require('../config/db');
const router = express.Router();

function getBaseUrl(req) {
  if (process.env.BASE_URL) {
    return process.env.BASE_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return `${req.protocol}://${req.get('host')}`;
}

router.post('/shorten', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  const shortCode = nanoid(7);

  try {
    const result = await db.query(
      `INSERT INTO urls (short_code, long_url)
       VALUES ($1, $2)
       RETURNING *`,
      [shortCode, url]
    );
    const row = result.rows[0];
    const baseUrl = getBaseUrl(req);

    return res.status(201).json({
      short_url: `${baseUrl}/${row.short_code}`,
      short_code: row.short_code,
      long_url: row.long_url,
    });
  } catch (error) {
    console.error('Shorten error:', error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
