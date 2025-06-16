const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  input: String,
  expectedOutput: String
});

const questionSchema = new mongoose.Schema({
  classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
  title: String,
  description: String,
  language: [String],
  testCases: [testCaseSchema]
});

module.exports = mongoose.model('CodingQuestion', questionSchema);
