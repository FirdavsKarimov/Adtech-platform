import React, { useEffect, useState } from 'react';
import CourseList from '../components/CourseList';
import CourseForm from '../components/CourseForm';
import StudentList from '../components/StudentList';
import { getCourses, createCourse, getStudents, createStudent, enrollStudent } from '../services/api';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchStudents();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getCourses();
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleCourseAdded = async (data) => {
    try {
      await createCourse(data);
      fetchCourses();
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const handleStudentAdded = async (data) => {
    try {
      await createStudent(data);
      fetchStudents();
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleEnroll = async (data) => {
    try {
      await enrollStudent(data);
      fetchCourses();
      fetchStudents();
    } catch (error) {
      console.error('Error enrolling student:', error);
    }
  };

  return (
    <>
      <CourseForm onCourseAdded={handleCourseAdded} />
      <CourseList courses={courses} students={students} onEnroll={handleEnroll} />
      <StudentList students={students} onStudentAdded={handleStudentAdded} />
    </>
  );
};

export default Home;