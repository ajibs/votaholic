// load dependencies
const User = require('../models/user');

function showHome(req, res) {
  res.render('pages/home');
}

function showSignup(req, res) {
  res.render('pages/signup');
}

function registerUser(req, res) {
  const sampleUser = {
    username: 'test',
    password: 'password',
  };

  const user = new User(sampleUser);
  user.save().then(res.send('user saved'));
  // res.json({ value: req.body });
}

module.exports = {
  showHome,
  showSignup,
  registerUser,
};
