// Module Dependencies

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// ---------------------------------------------------------------------------------------------------------------------
// Establishes the Express Server & Port

const app = express();
const PORT = process.env.PORT || 8080;

// ---------------------------------------------------------------------------------------------------------------------
// Set up Express to be able to handle static content for the app.
app.use(express.static('public'));

// Sets up Express to handle data parsing for urlencoded or json formatting types
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// ---------------------------------------------------------------------------------------------------------------------
// Configures the Routes for the Server to use

require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);

// ---------------------------------------------------------------------------------------------------------------------
// Starts the Server

app.listen(PORT, function () {
    console.log(`App listening on http://localhost:${PORT}`);
    //console.log(`App listening on PORT: ${PORT}`);
});

