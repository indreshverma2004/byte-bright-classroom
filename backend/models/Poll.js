const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },
  question: String,
  type: { type: String, enum: ['mcq', 'text'], required: true },
  options: [String],
  responses: [{
    answer: String,
    count: { type: Number, default: 1 }
  }]
});

module.exports = mongoose.model('Poll', pollSchema);
