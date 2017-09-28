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

  // split options into array
  const arrayOptions = req.body.options.split(',');

  // loop through options and save
  arrayOptions.forEach((element) => {
    poll.options.push({ label: element });
  });
  poll.save().then(res.redirect('/my-polls'));
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


function showMyPolls(req, res) {
  const username = req.user ? req.user.username : '';
  // find polls, sort according to the most recent, then execute callback
  Poll.find({ username })
    .sort({ _id: -1 })
    .exec((err, polls) => {
      if (err) throw err;
      if (!polls) console.log('user not found');
      res.render('pages/my-polls', {
        username,
        polls,
      });
    });
}


function castVote(req, res) {
  // const userIP = '601.43.84';
  const userIP = ip.address();
  console.log(userIP);
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
      console.log('not found');
      // allow user to vote and save user IP to database
      let votedOption = req.body.labelID;

      // extract id of chosen option from serialized form
      votedOption = votedOption.replace('labelID=', '');
      votedOption = votedOption.replace('&newOption=', '');

      // req.body.custom exists means user entered their own option
      if (req.body.custom) {
        const newOption = req.body.custom;
        console.log(`new: ${newOption}`);
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
      } else {
        // no custom option, update chosen option
        console.log(2);
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
      }
    }
  });

  
 /* let votedOption = req.body.labelID;

  // extract id of option from serialized form
  votedOption = votedOption.replace('labelID=', '');
  votedOption = votedOption.replace('&newOption=', '');

  // custom exists means user entered their own option
  if (req.body.custom) {
    const newOption = req.body.custom;
    console.log(`new: ${newOption}`);
    Poll.updateOne(
      { _id: req.body.id },
      {
        $push:
          {
            options: { label: newOption, votes: 1 },
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
  } else {
    // no custom option, update chosen option
    console.log(2);
    Poll.updateOne(
      { 'options._id': votedOption },
      { $inc: { 'options.$.votes': 1 } },
      (err) => {
        if (err) throw err;
        res.json({
          status: 200,
          success: 'Vote successful',
        });
      }
    );
  }
  */
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
};
