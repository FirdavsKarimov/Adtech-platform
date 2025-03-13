const express = require('express');
const router = express.Router();
const {
  getCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
  getAnalytics,
} = require('../controllers/courseController');

router.get('/', getCourses);
router.post('/', createCourse);
router.get('/:id', getCourseById);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);
router.get('/analytics', getAnalytics);

module.exports = router;