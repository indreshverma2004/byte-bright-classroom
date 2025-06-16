const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');
const classroomRoutes = require('./routes/classroomRoutes');
const pollRoutes = require('./routes/pollRoutes');
const questionRoutes = require('./routes/questionRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/teacher', teacherRoutes);
app.use('/student', studentRoutes);
app.use('/classroom', classroomRoutes);
app.use('/poll', pollRoutes);
app.use('/question', questionRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(5000, () => console.log('🚀 Server running on port 5000'));
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
