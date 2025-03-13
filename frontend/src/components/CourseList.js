import React, { useEffect, useState } from 'react';

const CourseList = ({ courses, students, onEnroll }) => {
  const [selectedStudent, setSelectedStudent] = useState('');

  const handleEnroll = (courseId) => {
    if (selectedStudent) {
      onEnroll({ studentId: selectedStudent, courseId });
      setSelectedStudent('');
    }
  };

  return (
    <div className="container">
      <h2>Courses</h2>
      {courses.map(course => (
        <div key={course._id} className="card">
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <p>Duration: {course.duration} hours</p>
          <p>Instructor: {course.instructor}</p>
          <p>Enrolled Students: {course.enrolledStudents.map(s => s.name).join(', ')}</p>
          <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
            <option value="">Select a student</option>
            {students.map(student => (
              <option key={student._id} value={student._id}>{student.name}</option>
            ))}
          </select>
          <button onClick={() => handleEnroll(course._id)}>Enroll</button>
        </div>
      ))}
    </div>
  );
};

export default CourseList;