// TODO: GET /:code — catch-all redirect route
// Query DB by code → 302 redirect if found, 404 if not
// Register this AFTER /api routes in app.js (route order matters!)
const express = require('express');
const router = express.Router();
const db = require('../config/db'); 

router.get('/:code', async (req, res) => {
  const { code } = req.params;
  try {
    const result = await db.query('SELECT long_url FROM urls WHERE short_code = $1', [code]);
    if (result.rows.length === 0) {
      return res.status(404).send('URL not found');
    }
    const longUrl = result.rows[0].long_url;
    await db.query('UPDATE urls SET hits = hits + 1 WHERE short_code = $1', [code]);
    res.redirect(longUrl);
  } catch (error) {
    console.error('Error in redirect route:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;