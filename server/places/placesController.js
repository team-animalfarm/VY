const pool = require('../models/database');
const esClient = require('../models/elasticsearch');
const dataprocessing = require('../data/dataprocessing');

const placesController = {};


const sampleUsers = [
  'Simon M.',
  'Taylor B.',
  'Justin F.',
  'Jay D.'
]

const sampleReviews = [
  'The food is great here. A+!',
  'servers are nice, nice ambiance...',
  'try the vegan nachos!!!!!',
  'legit best veg burger IN LAAAA!!!!',
  'This PLACE was CLOSED on my BIRTHDAY :(',
  'what more can i say VEGAN COWS',
  'garbage.  go back to new york.',
  'came here on a codesmith trip and all we did was code.',
  'my friend made this website haha he works for google now',
  'vegans FTWWWW.'
]

/**
 * geocodeSearch - Get coordinates from a provided search string.
 * @param req - http.IncomingRequest
 * @param res - http.ServerResponse
 * @param next - express method
 */
placesController.geocodeSearch = (req, res, next) => {

  console.log('here', req.params.searchString );
  // Here's our search query for Elasticsearch.
  const query = {
    'query': {
      'bool': {
        'must': [
          { 'match': { 'STR_NM': req.params.searchString } }
        ],
        'should': [
          { 'match': { 'HSE_ID': '' } } 
        ]
      }
    }
  }

  // Perform the search.
  esClient.search({ index: 'la', body: query }, (err, result) => {
    if (err) {
      console.log(err);
      next(err);
    }
    else {
      // Extract coordiates from top result.
      const topResultLat = Number(result['body']['hits']['hits'][0]['_source']['LAT']);
      const topResultLon = Number(result['body']['hits']['hits'][0]['_source']['LON']);
      console.log("Result Found: ", [topResultLon, topResultLat]);
      
      // Stick it on res.locals.
      res.locals.geoLocatedCoordinates = [topResultLon, topResultLat];
      next();
    }
  });

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
    text: 'SELECT * FROM places',
    values: ''
  };

  // first check if both fields are filled, then try to create user
  pool.connect((err, client, done)=> {
    if (err) next(err);
    client.query(query.text, query.values, (err, results) => {
      if (err) return next(err);
      else {
        // Sort results by distance.
        const [inputLon, inputLat] = res.locals.geoLocatedCoordinates;

        // Augment the results with haversine distance.
        const augResults = results.rows.map(result => {
          let numComments = Math.floor(Math.random()*3) + 1;
          result['reviews'] = new Array(numComments).fill(0).map(el => [
            sampleUsers[Math.floor(Math.random()*sampleUsers.length)],
            sampleReviews[Math.floor(Math.random()*sampleReviews.length)]
          ]);
          // result['reviews'] = ['this is a test review'];
          result['coordinates'] = [result.long, result.lat];
          result['distance'] = dataprocessing.haversineDistance(
            [inputLat, inputLon], [result.lat, result.long], isMiles = true
          );
          delete result.long;
          delete result.lat;
          return result;
        })

        // Sort the results by distance.
        const sortedResults = augResults.sort((a,b) => a.distance - b.distance);

        // Stick the results on closestPlaces.
        res.locals.closestPlaces = sortedResults;

        // Invoke next.
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
