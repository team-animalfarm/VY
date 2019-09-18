const pool = require('../models/database');
const esClient = require('../models/elasticsearch');



const placesController = {};




/**
 * geocodeSearch - Get coordinates from a provided search string.
 * @param req - http.IncomingRequest
 * @param res - http.ServerResponse
 * @param next - express method
 */
placesController.geocodeSearch = (req, res, next) => {

  console.log(req.body.searchString);

  const query = {
    'query': {
      'bool': {
        'must': [
          { 'match': { 'STR_NM': 'castle heights' } }
        ],
        'should': [
          { 'match': { 'HSE_ID': '2822' } } 
        ]
      }
    }
  }

  // ElasticSearch get coordinates.
  esClient.search(
    { index: 'la', body: query },
    (err, result) => {
      if (err) {
        console.log('error');
        next(err);
      }
      else {
        console.log('result!');
        console.log(result['body']['hits']);
        next();
      }
    }
  )

}


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
      if (err) return next(err);
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



module.exports = placesController;