const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');


const userModel = new Schema({
  username: { 
    type: String,
    unique: true,
    lowercase: true,
  },
  password: String,
});


/**
 * methods
 */

// generate a hash
userModel.methods.generateHash = function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(12), null);
};

// check for valid password
userModel.methods.validPassword = function validPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userModel);
