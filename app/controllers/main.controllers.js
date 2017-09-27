const Poll = require('../models/pollModel.js');

function showHome(req, res) {
  const username = req.user ? req.user.username : '';
  res.render('pages/home', {
    username,
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

function showProfile(req, res) {
  const username = req.user ? req.user.username : '';
  // find polls, sort according to the most recent, then execute callback
  Poll.find({ username })
    .sort({ _id: -1 })
    .exec((err, polls) => {
      if (err) throw err;
      if (!polls) console.log('user not found');
      res.render('pages/profile', {
        username,
        polls,
      });
    });
}


module.exports = {
  showHome,
  showSignup,
  showLogin,
  showProfile,
};
