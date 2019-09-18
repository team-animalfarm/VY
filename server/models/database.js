const { Pool } = require('pg');

var config = {
    user: 'student', 
    database: 'vy_dev', 
    password: 'ilovetesting', 
    host: 'localhost', 
    port: 5432, 
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000
};

const pool = new Pool(config);

pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack);
});

module.exports = pool;
