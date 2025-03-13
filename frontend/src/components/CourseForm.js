import React, { useState } from 'react';

const CourseForm = ({ onCourseAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    instructor: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCourseAdded(formData);
    setFormData({ title: '', description: '', duration: '', instructor: '' });
  };

  return (
    <div className="container">
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Course Title" value={formData.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <input type="number" name="duration" placeholder="Duration (hours)" value={formData.duration} onChange={handleChange} required />
        <input type="text" name="instructor" placeholder="Instructor" value={formData.instructor} onChange={handleChange} required />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default CourseForm;