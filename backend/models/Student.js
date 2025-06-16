const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'CodingQuestion' },
  code: String,
  language: String,
  result: String,
});

const enrollmentSchema = new mongoose.Schema({
  classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
  submissions: [submissionSchema],
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enrollments: [enrollmentSchema],
});

module.exports = mongoose.model('Student', studentSchema);
