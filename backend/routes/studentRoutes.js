const express = require('express');
const router = express.Router();
const { getStudents, createStudent, enrollStudent } = require('../controllers/studentController');

router.get('/', getStudents);
router.post('/', createStudent);
router.post('/enroll', enrollStudent);

module.exports = router;