const pool = require('../models/database');

const placesController = {};

/**
* createUser - create a new User model and then save the user to the database.
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
*/
placesController.searchPlaces = (req, res, next) => {
  // Grab parsed creds.
  const query = {
    text: 'SELECT * FROM users WHERE username = $1',
    values: req.body.searchString,
  };

  // first check if both fields are filled, then try to create user
  pool.connect((err, client, done)=> {
    if (err) next(err);
    client.query(query.text, query.values, (err, results) => {
      if (err) return console.log(err.stack);
      else {
        res.locals.results = results.rows;
        console.log(res.locals.results);
        next();
      }
    });
  });
};

/**
* createUser - create a new User model and then save the user to the database.
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
*/
placesController.createPlace = (req, res, next) => {
  // Grab parsed creds.
  const query = {
    text: 'INSERT INTO restaurants(name, address) VALUES($1, $2)',
    values: [req.body.name, req.body.address],
  }

  // first check if both fields are filled, then try to create user
  pool.connect((err, client, done) => {
    if (err) next(err);
    client.query(query.text, query.values, (err, results) => {
      if (err) return console.log(err.stack);
      else {
        //res.locals.results = results.rows;
        console.log('Restaurant added.');
        next();
      }
    });
  });
};




