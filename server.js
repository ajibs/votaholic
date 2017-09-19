// load environment variables
require('dotenv').config();

/**
 * load dependencies
 */

const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

const expressLayouts = require('express-ejs-layouts');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');


/**
 * configure app
 */

// tell express where to look for static assets
app.use(express.static(`${__dirname}/public`));


// set ejs as templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);


// retrieve information from POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// connect to database
mongoose.connect(process.env.DB_URI);


// direct requests to routes.js
app.use(require('./app/routes'));


app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
