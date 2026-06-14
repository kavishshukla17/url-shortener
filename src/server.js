require('dotenv').config();
const app = require('./app');        
const db = require('./config/db');
const PORT = process.env.PORT || 3000;  

db.initSchema()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('DB init failed:', err.message);  
  });