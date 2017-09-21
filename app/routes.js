// load dependencies
const express = require('express');

const router = express.Router();

const mainController = require('./controllers/main.controllers');

const pollController = require('./controllers/poll.controller');

const passport = require('passport');


// bring in passport local-signup and login
require('./passport.config')(passport);


// middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // if user is authenticated in the session, carry on
  }
  res.redirect('/login');
}


// diplay home page
router.get('/', mainController.showHome);


// signup user
router.get('/signup', mainController.showSignup);
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true,
}));


// login user
router.get('/login', mainController.showLogin);
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,
}));


// show profile
router.get('/profile', isLoggedIn, mainController.showProfile);


// show add poll
router.get('/add-poll', isLoggedIn, pollController.showAddPoll);
router.post('/add-poll', isLoggedIn, pollController.addNewPoll);


// show single poll
router.get('/poll/:query', pollController.showSinglePoll);

// vote for an option
router.post('/cast-vote', pollController.castVote);


// logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


module.exports = router;
