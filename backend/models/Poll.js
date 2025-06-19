const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  answer: { type: String, required: true },
  count: { type: Number, default: 0 },
  voters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }] 
});

const pollSchema = new mongoose.Schema({
  classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true },
  question: { type: String, required: true },
  type: { type: String, enum: ['mcq', 'text'], required: true },
  options: [String], 
  responses: [responseSchema], 
  textResponses: [{ student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }, answer: String }],
});

module.exports = mongoose.model('Poll', pollSchema);
