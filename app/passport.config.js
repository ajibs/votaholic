/**
 * config file for passport.js
 */

// load dependencies
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/userModel');


module.exports = (passport) => {
  /**
   * for persistent login sessions
   * passport needs ability to serialize and unserialize users out of session
   */

  // serialize user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // deserialize user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  // strategy for local signup
  passport.use('local-signup', new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, done) => {
    // User.findOne wont fire unless data is sent back
    process.nextTick(() => {
      // check if user email already exists in DB
      User.findOne({ username }, (err, user) => {
        if (err) {
          return done(err);
        }

        // email exists in DB
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That username already exists'));
        }

        // email does not exist in DB; create new user
        const newUser = new User();
        newUser.username = username;
        newUser.password = newUser.generateHash(password);
        newUser.save();
        return done(null, newUser);
      });
    });
  }));


  // local strategy for login
  passport.use('local-login', new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, done) => {
    process.nextTick(() => {
      // check if username exists
      User.findOne({ username }, (err, user) => {
        if (err) {
          return done(err);
        }

        // wrong username
        if (!user) {
          return done(null, false, req.flash('loginMessage', 'Username is incorrect'));
        }

        // wrong password
        if (!user.validPassword(password)) {
          return done(null, false, req.flash('loginMessage', 'Password is incorrect'));
        }

        // login successful
        return done(null, user);
      });
    });
  }));
};
