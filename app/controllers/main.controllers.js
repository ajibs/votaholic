function showHome(req, res) {
  res.render('pages/home');
}

function showSignup(req, res) {
  res.render('pages/signup');
}

function showLogin(req, res) {
  res.render('pages/login');
}

function showProfile(req, res) {
  const username = req.user ? req.user.username : '';
  res.render('pages/profile', {
    username,
  });
}


module.exports = {
  showHome,
  showSignup,
  showLogin,
  showProfile,
};
