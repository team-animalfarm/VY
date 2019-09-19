const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const placesController = require('./places/placesController.js');
const userController = require('./user/userController.js');



const app = express();

const PORT = process.env.PORT || 3000;

// bodyParser middleware
app.use(bodyParser.urlencoded( { extended: true }));
app.use(bodyParser.json());

// cookieParser middleware
app.use(cookieParser());

// to serve static files
app.use(express.static('assets'));

// Serve index.html for get request to root route.
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'))
});

// Create a user.
app.post('/createUser', userController.createUser, (res, req) => {
  res.status(200);
});

// Verify User.
app.post('/verifyUser', userController.verifyUser, (res, req) => {
  res.status(200);
});

// Search for places.
app.get('/search/:location', /*placesController.geocodeSearch, placesController.searchPlaces, */ (req, res) => {
  // Send back the results.
  const hardCodedResponse = {
    "geoLocatedCoordinates": [-118.470620, 33.987851],
    "closestPlaces": [
      {
        "name": "The Vegan Joint",
        "address": "10438 National Blvd, Los Angeles, California, USA, 90034",
        "coordinates": [-118.411554, 34.028756],
        "reviews": [
          {
            "text": "this place rocks!!"
          }
        ]
      },
      {
        "name": "AVO Cafe",
        "address": "306 Pico Blvd, Santa Monica, California, USA, 90405",
        "coordinates": [-118.487825,  34.009238],
        "reviews": [
          {
            "text": "this place sucks!!"
          }
        ]
      },
      {
        "name": "SunCafe",
        "address": "10820 Ventura Blvd, Studio City, California, USA, 91604",
        "coordinates": [-118.366538, 34.138632],
        "reviews": [
          {
            "text": "ew!!"
          }
        ]
      }
    ]
  }
  res.status(200).send(hardCodedResponse);
})

// Create places.
app.post('/createPlace', placesController.createPlace, (req, res) => {
  // Send back the results.
  res.status(200);
})

// unhandled routes/404 response
app.use('*', (req, res, next) => {
    res.status(404).send('404: Page Not Found!');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('There was an error!/Something broke!');
});

// I'm listening...
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
