const express = require('express');
const Classroom = require('../models/Classroom');
const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id)
      .populate({
        path: 'polls',
        populate: [
          {
            path: 'responses.voters',
            select: 'name email'  
          },
          {
            path: 'textResponses.student',
            select: 'name email'
          }
        ]
      })
      .populate('questions');

    if (!classroom) return res.status(404).send("Classroom not found");

    res.send(classroom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
