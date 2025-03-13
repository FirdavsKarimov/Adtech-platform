const Course = require('../models/Course');
const Student = require('../models/Student');

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('enrolledStudents', 'name');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createCourse = async (req, res) => {
  const { title, description, duration, instructor } = req.body;
  try {
    const course = new Course({ title, description, duration, instructor });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: 'Error creating course', error: error.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('enrolledStudents', 'name');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: 'Error updating course', error: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    await Student.updateMany({ enrolledCourses: req.params.id }, { $pull: { enrolledCourses: req.params.id } });
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const courses = await Course.find().populate('enrolledStudents');
    const popularCourses = courses.map(course => ({
      title: course.title,
      enrollmentCount: course.enrolledStudents.length,
    })).sort((a, b) => b.enrollmentCount - a.enrollmentCount).slice(0, 5);

    const students = await Student.find();
    const avgCompletion = students.reduce((acc, student) => acc + student.completion, 0) / students.length || 0;

    res.json({ popularCourses, avgCompletion });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};