// load dependencies
const express = require('express');

const router = express.Router();

const mainController = require('./controllers/main.controllers');

const passport = require('passport');

require('./passport.config')(passport);

// diplay home page
router.get('/', mainController.showHome);


// signup user
router.get('/signup', mainController.showSignup);
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,
}));


// login user
router.get('/login', mainController.showLogin);

// show profile
router.get('/profile', mainController.showProfile);


module.exports = router;
