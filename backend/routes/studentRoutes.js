const express = require('express');
const router = express.Router();
const { getStudents, createStudent, enrollStudent, updateProgress } = require('../controllers/studentController');

router.get('/', getStudents);
router.post('/', createStudent);
router.post('/enroll', enrollStudent);
router.put('/progress', updateProgress); // New route for progress updates

module.exports = router;