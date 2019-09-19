const { Pool } = require('pg');


const uri = 'postgres://wqzhtkbp:XhWKc2CEUNwTJ1uuSOrRe9rPLzqmkwFm@salt.db.elephantsql.com:5432/wqzhtkbp';

const pool = new Pool({ connectionString: uri });

pool
  .connect()
  .then((client) => client
    .query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY NOT NULL,
      username VARCHAR (20) NOT NULL,
      password VARCHAR (20) NOT NULL
    )`)
    .then(() => client.query(`CREATE TABLE IF NOT EXISTS places (
      id SERIAL PRIMARY KEY NOT NULL,
      rating INTEGER NOT NULL,
      phone VARCHAR (20) NOT NULL,
      location VARCHAR (100) NOT NULL,
      name VARCHAR (50) NOT NULL,
      lat DOUBLE PRECISION NOT NULL,
      long DOUBLE PRECISION NOT NULL,
      img_src VARCHAR (150) NOT NULL
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