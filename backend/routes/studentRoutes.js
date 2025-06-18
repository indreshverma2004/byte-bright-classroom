const express = require('express');
const Student = require('../models/Student');
const Classroom = require('../models/Classroom');
const router = express.Router();

// Register a student
router.post('/register', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.send(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });

    if (!student || student.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      studentId: student._id,
      name: student.name,
      email: student.email
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Enroll in a classroom using class code
router.post('/enroll', async (req, res) => {
  try {
    const { studentId, classCode } = req.body;
    const classroom = await Classroom.findOne({ code: classCode });
    if (!classroom) return res.status(404).send("Classroom not found");

    await Student.findByIdAndUpdate(studentId, {
      $addToSet: { enrollments: { classroom: classroom._id, submissions: [] } }
    });

    // Also add student to classroom's student list
    await Classroom.findByIdAndUpdate(classroom._id, {
      $addToSet: { students: studentId }
    });

    res.send("Enrolled successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all classrooms a student is enrolled in
router.get('/classrooms/:studentId', async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate({
      path: 'enrollments.classroom',
      model: 'Classroom',
      select: 'name code teacher'
    });

    if (!student) return res.status(404).send("Student not found");

    const enrolledClassrooms = student.enrollments.map(e => e.classroom);
    res.send(enrolledClassrooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
