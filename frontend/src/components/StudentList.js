import React, { useState } from 'react';

const StudentList = ({ students, onStudentAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onStudentAdded(formData);
    setFormData({ name: '', email: '' });
  };

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
            <p>Enrolled Courses: {student.enrolledCourses.map(c => c.title).join(', ') || 'None'}</p>
            <p>Completion: {student.completion}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;