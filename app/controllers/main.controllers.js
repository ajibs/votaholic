const Poll = require('../models/pollModel.js');

function showHome(req, res) {
  const username = req.user ? req.user.username : '';

  // find polls, sort according to the most recent, limit to 3, then execute call back
  Poll.find({}) // find all polls
    .sort({ _id: -1 }) // sort according to the most recent
    .limit(3) // limit to 3 results
    .exec((err, recentPolls) => {
      res.render('pages/home', {
        username,
        recentPolls,
      });
    });
}

function showSignup(req, res) {
  const username = '';
  res.render('pages/signup', {
    username,
    message: req.flash('signupMessage'),
  });
}

function showLogin(req, res) {
  const username = '';
  res.render('pages/login', {
    username,
    message: req.flash('loginMessage'),
  });
}

function showExplore(req, res) {
  const username = req.user ? req.user.username : '';
  Poll.find({})
    .sort({ _id: -1 })
    .limit(20)
    .exec((err, polls) => {
      res.render('pages/explore', {
        username,
        polls,
      });
    });
}

module.exports = {
  showHome,
  showSignup,
  showLogin,
  showExplore,
};
