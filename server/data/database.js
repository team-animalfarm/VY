const { Pool } = require('pg');


const uri = 'postgres://wqzhtkbp:XhWKc2CEUNwTJ1uuSOrRe9rPLzqmkwFm@salt.db.elephantsql.com:5432/wqzhtkbp';
​
const pool = new Pool({ connectionString: uri });
​
pool
  .connect()
  .then(client => client
    .query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY NOT NULL,
      first_name VARCHAR (20) NOT NULL,
      last_name VARCHAR (20) NOT NULL,
      email VARCHAR (40) NOT NULL,
      password VARCHAR (20) NOT NULL
    )`)
    .then(() => client.query(`CREATE TABLE IF NOT EXISTS restaurants (
      id SERIAL PRIMARY KEY NOT NULL,
      name VARCHAR (50) NOT NULL,
      address VARCHAR (100) NOT NULL,
      lat DECIMAL NOT NULL,
      long DECIMAL NOT NULL
    )`))
    .then(() => client.query(`CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY NOT NULL,
      user_id INTEGER REFERENCES users(id),
      restaurant_id INTEGER REFERENCES restaurants(id) 
    )`))
    .then(() => client.release())
    .catch((e) => {
      client.release();
      console.log(e.stack);
    }))
  .catch(e => console.log(e.stack));

  module.exports = pool;