const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');
const redirectRoutes = require('./routes/redirect');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
app.set('trust proxy', 1);
app.use(cors());app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', redirectRoutes);


module.exports = app;