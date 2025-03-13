const mongoose = require('mongoose');

const courseProgressSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true 
  },
  status: {
    type: String,
    enum: ['not_started', 'in_progress', 'completed'],
    default: 'not_started'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  enrolledCourses: [courseProgressSchema]
});

module.exports = mongoose.model('Student', studentSchema);