const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mahtab@123',
  database: 'airnub',
});

module.exports = pool.promise();