// load dependencies
const express = require('express');

const router = express.Router();

const mainController = require('./controllers/main.controllers');

const User = require('./models/user');

router.get('/', mainController.showHome);

router.get('/signup', mainController.showSignup);
router.post('/signup', (req, res) => {
  const user = new User(req.body);
  user.save().then(res.send('user saved'));
});

module.exports = router;
