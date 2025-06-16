const express = require('express');
const Teacher = require('../models/Teacher');
const Classroom = require('../models/Classroom');
const router = express.Router();

router.post('/register', async (req, res) => {
  const teacher = new Teacher(req.body);
  await teacher.save();
  res.send(teacher);
});

router.post('/create-classroom', async (req, res) => {
  const classroom = new Classroom({ ...req.body });
  await classroom.save();
  await Teacher.findByIdAndUpdate(req.body.teacher, { $push: { classrooms: classroom._id } });
  res.send(classroom);
});

module.exports = router;
