const Student = require('../models/Student');
const Course = require('../models/Course');

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('enrolledCourses.course', 'title');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createStudent = async (req, res) => {
  const { name, email } = req.body;
  try {
    const student = new Student({ name, email });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: 'Error creating student', error: error.message });
  }
};

exports.enrollStudent = async (req, res) => {
  const { studentId, courseId } = req.body;
  try {
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);
    if (!student || !course) return res.status(404).json({ message: 'Student or course not found' });

    const alreadyEnrolled = student.enrolledCourses.some(c => c.course.toString() === courseId);
    if (!alreadyEnrolled) {
      student.enrolledCourses.push({ course: courseId });
      course.enrolledStudents.push(studentId);
      await student.save();
      await course.save();
    }
    res.json({ message: 'Student enrolled successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error enrolling student', error: error.message });
  }
};

exports.updateProgress = async (req, res) => {
  const { studentId, courseId, status, completion } = req.body;
  try {
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const courseProgress = student.enrolledCourses.find(c => c.course.toString() === courseId);
    if (!courseProgress) return res.status(404).json({ message: 'Course not enrolled' });

    if (status) courseProgress.status = status;
    if (completion !== undefined) courseProgress.completion = completion;
    courseProgress.lastUpdated = Date.now();

    await student.save();
    res.json({ message: 'Progress updated', courseProgress });
  } catch (error) {
    res.status(400).json({ message: 'Error updating progress', error: error.message });
  }
};