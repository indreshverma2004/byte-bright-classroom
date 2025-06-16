const express = require('express');
const Poll = require('../models/Poll');
const Classroom = require('../models/Classroom');
const router = express.Router();

router.post('/create', async (req, res) => {
  const poll = new Poll(req.body);
  await poll.save();
  await Classroom.findByIdAndUpdate(req.body.classroom, { $push: { polls: poll._id } });
  res.send(poll);
});

router.post('/vote/:pollId', async (req, res) => {
  const { answer } = req.body;
  const poll = await Poll.findById(req.params.pollId);
  let found = false;

  for (let r of poll.responses) {
    if (r.answer === answer) {
      r.count++;
      found = true;
      break;
    }
  }

  if (!found) poll.responses.push({ answer, count: 1 });
  await poll.save();

  res.send("Vote submitted");
});

module.exports = router;
