const express = require('express');
const path = require('path');
const app = express();
const apiRoutes = require('./routes/api');
const redirectRoutes = require('./routes/redirect');
const cors = require('cors');
const dotenv = require('dotenv');

const publicDir = path.join(__dirname, '../public');

dotenv.config();
app.set('trust proxy', 1);
app.use(cors());
app.use(express.json());
app.use(express.static(publicDir));
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});
app.use('/api', apiRoutes);
app.use('/', redirectRoutes);

module.exports = app;
