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
app.get('/search/:searchString', placesController.geocodeSearch, placesController.searchPlaces, (req, res) => {
  // Send back the results.
  res.status(200).send({
    closestPlaces: res.locals.closestPlaces,
    geoLocatedCoordinates: res.locals.geoLocatedCoordinates
  });
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
