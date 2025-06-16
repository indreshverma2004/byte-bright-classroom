const express = require('express');
const CodingQuestion = require('../models/CodingQuestion');
const Classroom = require('../models/Classroom');
const router = express.Router();

router.post('/create', async (req, res) => {
  const question = new CodingQuestion(req.body);
  await question.save();
  await Classroom.findByIdAndUpdate(req.body.classroom, { $push: { questions: question._id } });
  res.send(question);
});

module.exports = router;
