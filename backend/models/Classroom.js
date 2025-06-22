const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  polls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Poll' }],
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CodingQuestion' }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }] 
});
module.exports = mongoose.model('Classroom', classroomSchema);
