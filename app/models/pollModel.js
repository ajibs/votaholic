const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pollModel = new Schema({
  username: String,
  title: String,
  options: [{
    label: String,
    votes: {
      type: Number,
      default: 0,
    },
  }],
  votedIP: [{
    type: String,
  }],
});

module.exports = mongoose.model('Poll', pollModel);
