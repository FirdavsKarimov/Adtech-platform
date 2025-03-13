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

    const alreadyEnrolled = student.enrolledCourses.some(c => c.course && c.course.toString() === courseId);
    if (!alreadyEnrolled) {
      student.enrolledCourses.push({ course: courseId });
      course.enrolledStudents.push(studentId);
      await student.save();
      await course.save();
      console.log('Enrolled student:', { studentId, courseId });
    }
    res.json({ message: 'Student enrolled successfully' });
  } catch (error) {
    console.error('Error enrolling student:', error);
    res.status(400).json({ message: 'Error enrolling student', error: error.message });
  }
};

exports.updateProgress = async (req, res) => {
  const { studentId, courseId, status } = req.body;
  try {
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    console.log('Student enrolledCourses:', student.enrolledCourses);
    console.log('Looking for courseId:', courseId);

    const courseProgress = student.enrolledCourses.find(c => 
      c.course && c.course.toString() === courseId
    );
    if (!courseProgress) {
      console.log('Course not found in enrolledCourses');
      return res.status(404).json({ message: 'Course not enrolled' });
    }

    if (status) courseProgress.status = status;
    courseProgress.lastUpdated = Date.now();

    await student.save();
    res.json({ message: 'Progress updated', courseProgress });
  } catch (error) {
    console.error('Error in updateProgress:', error);
    res.status(400).json({ message: 'Error updating progress', error: error.message });
  }
};