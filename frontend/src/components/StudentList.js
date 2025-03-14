import React, { useState } from 'react';
import { updateProgress } from '../services/api';

const StudentList = ({ students, onStudentAdded }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [progressData, setProgressData] = useState({ studentId: '', courseId: '', status: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProgressChange = (e) => {
    setProgressData({ ...progressData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onStudentAdded(formData);
    setFormData({ name: '', email: '' });
  };

  const handleProgressSubmit = async (studentId, courseId) => {
    console.log('Submitting progress:', { 
      studentId, 
      courseId, 
      status: progressData.status 
    });
    try {
      await updateProgress({ 
        studentId, 
        courseId, 
        status: progressData.status 
      });
      alert('Progress updated successfully');
      onStudentAdded();
      setProgressData({ studentId: '', courseId: '', status: '' });
    } catch (error) {
      console.error('Error updating progress:', error.response?.data || error.message);
      alert('Failed to update progress: ' + (error.response?.data?.message || error.message));
    }
  };

  console.log('Students data:', students);

  return (
    <div className="container">
      <h2>Students</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Student</button>
      </form>
      <div>
        {students.map(student => (
          <div key={student._id} className="card">
            <h3>{student.name}</h3>
            <p>Email: {student.email}</p>
            <h4>Enrolled Courses:</h4>
            {student.enrolledCourses.length > 0 ? (
              student.enrolledCourses.map((courseProgress, index) => {
                const courseId = courseProgress.course?._id || 
                                courseProgress.course || 
                                courseProgress._id || 
                                `unknown-${index}`;
                const courseTitle = courseProgress.course?.title || 'Unknown Course';

                return (
                  <div key={courseId}>
                    <p>Course: {courseTitle}</p>
                    <p>Status: {courseProgress.status}</p>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleProgressSubmit(student._id, courseId);
                      }}
                    >
                      <select
                        name="status"
                        value={progressData.status}
                        onChange={handleProgressChange}
                      >
                        <option value="">Update Status</option>
                        <option value="not_started">Not Started</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      <button type="submit">Update Progress</button>
                    </form>
                  </div>
                );
              })
            ) : (
              <p>No courses enrolled</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;