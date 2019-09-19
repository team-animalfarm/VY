const { Pool } = require('pg');

// Config for ESQL instance.
var config = {
  user: 'wqzhtkbp', 
  database: 'wqzhtkbp', 
  password: 'XhWKc2CEUNwTJ1uuSOrRe9rPLzqmkwFm', 
  host: 'salt.db.elephantsql.com', 
  port: 5432, 
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000
};

// New Pool.
const pool = new Pool(config);

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack);
});

module.exports = pool;
