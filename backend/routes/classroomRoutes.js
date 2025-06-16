const express = require('express');
const Classroom = require('../models/Classroom');
const router = express.Router();

router.get('/:id', async (req, res) => {
  const classroom = await Classroom.findById(req.params.id)
    .populate('polls')
    .populate('questions');
  res.send(classroom);
});

module.exports = router;
