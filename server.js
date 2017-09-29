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

const morgan = require('morgan');

const passport = require('passport');

const cookieParser = require('cookie-parser');

const flash = require('connect-flash');

const session = require('express-session');


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


// log all requests to the console
app.use(morgan('dev'));


/**
 * required for passport
 */

// read cookies (needed for auth)
app.use(cookieParser());

// session secret
app.use(session({ secret: process.env.secret }));

// initialize passport
app.use(passport.initialize());

// persistent login sessions
app.use(passport.session());

// use connect-flash for flash messages stored in session
app.use(flash());


// connect to database
mongoose.connect(process.env.DB_URI);


// direct requests to routes.js
app.use(require('./app/routes'));


// start server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
