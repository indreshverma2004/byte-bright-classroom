const express = require('express');
const Student = require('../models/Student');
const Classroom = require('../models/Classroom');
const router = express.Router();

router.post('/register', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send(student);
});

router.post('/enroll', async (req, res) => {
  const { studentId, classCode } = req.body;
  const classroom = await Classroom.findOne({ code: classCode });
  if (!classroom) return res.status(404).send("Classroom not found");

  await Student.findByIdAndUpdate(studentId, {
    $push: { enrollments: { classroom: classroom._id, submissions: [] } }
  });

  res.send("Enrolled");
});

module.exports = router;
