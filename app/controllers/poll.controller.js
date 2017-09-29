const Poll = require('../models/pollModel');

const ip = require('ip');


function showNewPoll(req, res) {
  const username = req.user ? req.user.username : '';
  res.render('pages/new-poll', {
    username,
  });
}


function createNewPoll(req, res) {
  const username = req.user ? req.user.username : '';
  const poll = new Poll();
  poll.username = username;
  poll.title = req.body.title;

  // split user options into array
  const arrayOptions = req.body.options.split(',');

  // loop through user options and save
  arrayOptions.forEach((option) => {
    poll.options.push({
      label: option,
    });
  });

  // save poll to db and show my polls
  poll.save().then(res.redirect('/my-polls'));
}


function showSinglePoll(req, res) {
  const username = req.user ? req.user.username : '';
  const query = req.params.query;

  Poll.findOne({ _id: query }, (err, poll) => {
    if (err) {
      throw err;
    }

    if (!poll) {
      res.send('Poll not found');
    }

    res.render('pages/single-poll', {
      username,
      singlePoll: poll,
    });
  });
}


function showMyPolls(req, res) {
  const username = req.user ? req.user.username : '';
  // find polls, sort according to the most recent, then execute callback
  Poll.find({ username })
    .sort({ _id: -1 })
    .exec((err, polls) => {
      if (err) {
        throw err;
      }

      if (!polls) {
        res.send('Your Polls not found');
      }

      res.render('pages/my-polls', {
        username,
        polls,
      });
    });
}


function cleanLabel(labelID) {
  // extract id of chosen option from serialized form
  const label = labelID.replace('labelID=', '');
  return label.replace('&newOption=', '');
}

function testIP(req, res) {
  const userIP = ip.address();
  res.send(userIP);
}

function castVote(req, res) {
  const userIP = ip.address();
  const pollID = req.body.id;

  // retrieve poll and check for user ip
  Poll.findOne({ _id: pollID, votedIP: userIP }, (error, poll) => {
    if (error) throw error;
    if (poll) {
      console.log('poll found');

      // poll found means user ip is in poll document; thus user not allowed to vote
      res.json({
        status: 404,
        error: 'You can only vote once on a poll',
      });
    } else {
      /**
       * poll not found implies user ip has not voted on poll
       * allow user to vote
       * save user IP to database
       */

      // chosen option
      const votedOption = cleanLabel(req.body.labelID);

      // req.body.custom does not exist; means no custom option to handle
      if (!req.body.custom) {
        // vote for chosen option
        Poll.updateOne(
          { 'options._id': votedOption },
          { $inc: { 'options.$.votes': 1 }, $push: { votedIP: userIP } },
          (err) => {
            if (err) throw err;
            res.json({
              status: 200,
              success: 'Vote successful',
            });
          }
        );
      } else {
        // custom option exists
        const newOption = req.body.custom;
        Poll.updateOne(
          { _id: pollID },
          {
            $push:
              {
                options: { label: newOption, votes: 1 },
                votedIP: userIP,
              },
          },
          (err) => {
            if (err) throw err;
            res.json({
              status: 200,
              success: 'Vote successful',
            });
          }
        );
      }
    }
  });
}


function deletePoll(req, res) {
  const pollID = req.body.pollID;
  Poll.deleteOne({ _id: pollID }, (err) => {
    if (err) throw err;
    res.json({
      status: 200,
      success: 'Deleted poll successfully',
    });
  });
}


module.exports = {
  showNewPoll,
  createNewPoll,
  showSinglePoll,
  showMyPolls,
  castVote,
  deletePoll,
  testIP,
};
