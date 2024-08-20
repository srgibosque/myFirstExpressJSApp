const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node_firstproject',
  password: 'root',
  port: 3307
});

module.exports = pool.promise();