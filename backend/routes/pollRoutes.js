const express = require('express');
const Poll = require('../models/Poll');
const Classroom = require('../models/Classroom');
const router = express.Router();

// Create a poll
router.post('/create', async (req, res) => {
  const poll = new Poll(req.body);
  await poll.save();
  await Classroom.findByIdAndUpdate(req.body.classroom, { $push: { polls: poll._id } });
  res.send(poll);
});
// Get all polls with full classroom and teacher info
router.get('/all', async (req, res) => {
  try {
    const polls = await Poll.find()
      .populate({
        path: 'classroom',
        populate: {
          path: 'teacher',
          select: 'name', 
        }
      })
      .populate('responses.voters')
      .populate('textResponses.student');

    res.send(polls);
  } catch (error) {
    console.error('Error fetching polls:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Vote or submit answer
router.post('/vote/:pollId', async (req, res) => {
  const { studentId, answer } = req.body;
  const poll = await Poll.findById(req.params.pollId);

  if (!poll) return res.status(404).send("Poll not found");

  if (poll.type === 'mcq') {
    let found = false;

    for (let r of poll.responses) {
      if (r.answer === answer) {
        // Check if student already voted
        if (r.voters.includes(studentId)) return res.status(400).send("Already voted");
        r.count++;
        r.voters.push(studentId);
        found = true;
        break;
      }
    }

    if (!found) {
      poll.responses.push({ answer, count: 1, voters: [studentId] });
    }
  } else if (poll.type === 'text') {
    // Check if already submitted
    if (poll.textResponses.some(resp => resp.student.toString() === studentId)) {
      return res.status(400).send("Already submitted response");
    }

    poll.textResponses.push({ student: studentId, answer });
  }

  await poll.save();
  res.send("Response submitted");
});

module.exports = router;
