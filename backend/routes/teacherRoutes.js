const express = require('express');
const Teacher = require('../models/Teacher');
const Classroom = require('../models/Classroom');
const router = express.Router();

router.post('/register', async (req, res) => {
  const teacher = new Teacher(req.body);
  await teacher.save();
  res.send(teacher);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ email });

    if (!teacher || teacher.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      teacherId: teacher._id,
      name: teacher.name,
      email: teacher.email
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/create-classroom', async (req, res) => {
  const classroom = new Classroom({ ...req.body });
  await classroom.save();
  await Teacher.findByIdAndUpdate(req.body.teacher, { $push: { classrooms: classroom._id } });
  res.send(classroom);
});

router.get('/classrooms/:teacherId', async (req, res) => {
  try {
    const { teacherId } = req.params;
    const classrooms = await Classroom.find({ teacher: teacherId });
    res.send(classrooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
