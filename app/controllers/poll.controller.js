const Poll = require('../models/pollModel');

function showAddPoll(req, res) {
  const username = req.user ? req.user.username : '';
  res.render('pages/add-poll', {
    username,
  });
}

function addNewPoll(req, res) {
  const username = req.user ? req.user.username : '';
  const poll = new Poll();
  poll.username = username;
  poll.title = req.body.title;

  // split options into array
  const arrayOptions = req.body.options.split(',');

  // loop through options and save
  arrayOptions.forEach((element) => {
    poll.options.push({ label: element });
  });
  poll.save();
  res.render('pages/poll-success', {
    username,
  });
}

function showSinglePoll(req, res) {
  const username = req.user ? req.user.username : '';
  const query = req.params.query;

  Poll.findOne({ _id: query }, (err, poll) => {
    if (err) throw err;
    if (!poll) console.log('option not found');
    res.render('pages/single-poll', {
      username,
      singlePoll: poll,
    });
  });
}

function castVote(req, res) {
  const username = req.user ? req.user.username : '';
  const votedOption = req.body.labelID;
  Poll.updateOne(
    { 'options._id': votedOption },
    { $inc: { 'options.$.votes': 1 } },
    (err, doc) => {
      if (err) throw err;
      if (!doc) console.log('option not found');
      res.render('pages/vote-success', {
        username,
      });
    }
  );
}


module.exports = {
  showAddPoll,
  addNewPoll,
  showSinglePoll,
  castVote,
};
