// load dependencies
const express = require('express');

const router = express.Router();

const mainController = require('./controllers/main.controllers');

const pollController = require('./controllers/poll.controller');

const passport = require('passport');


// bring in passport local-signup and local-login
require('./passport.config')(passport);


// middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    // if user is not authenticated in the session, redirect to login
    res.redirect('/login');
  }
  // authenticated; carry on
  return next();
}


// display home page
router.get('/', mainController.showHome);


// show explore page
router.get('/explore', mainController.showExplore);


// test ip
router.get('/test', pollController.testIP);

// signup user
router.get('/signup', mainController.showSignup);
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/my-polls',
  failureRedirect: '/signup',
  failureFlash: true,
}));


// login user
router.get('/login', mainController.showLogin);
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/my-polls',
  failureRedirect: '/login',
  failureFlash: true,
}));


// show my polls
router.get('/my-polls', isLoggedIn, pollController.showMyPolls);


// create new poll
router.get('/new-poll', isLoggedIn, pollController.showNewPoll);
router.post('/new-poll', isLoggedIn, pollController.createNewPoll);


// show single poll
router.get('/poll/:query', pollController.showSinglePoll);


// vote for an option
router.post('/cast-vote', pollController.castVote);


// delete a poll
router.post('/delete-poll', isLoggedIn, pollController.deletePoll);


// logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


module.exports = router;
