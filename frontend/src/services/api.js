import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5012/api',
});

export const getCourses = () => api.get('/courses');
export const createCourse = (data) => api.post('/courses', data);
export const getStudents = () => api.get('/students');
export const createStudent = (data) => api.post('/students', data);
export const enrollStudent = (data) => api.post('/students/enroll', data);
export const updateProgress = (data) => api.put('/students/progress', data); // New method
export const getAnalytics = () => api.get('/courses/analytics');