const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const PORT = process.env.PORT || 3000;

// bodyParser middleware
app.use(bodyParser.urlencoded( { extended: true }));
app.use(bodyParser.json());

// cookieParser middleware
app.use(cookieParser());

// to serve static files
app.use(express.static('assets'));

// serve index.html for get request to root route
app.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../client/index.html')));

// unhandled routes/404 response
app.use('*', (req, res, next) => {
    res.status(404).send('404: Page Not Found!');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('There was an error!/Something broke!');
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
