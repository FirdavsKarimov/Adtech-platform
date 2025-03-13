import React, { useEffect, useState } from 'react';
import { getAnalytics } from '../services/api';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    popularCourses: [],
    courseStats: [],
    totalStudents: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await getAnalytics();
        setAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="container">
      <h2>Analytics</h2>

      <h3>Total Students</h3>
      <p>{analytics.totalStudents}</p>

      <h3>Popular Courses</h3>
      <ul>
        {analytics.popularCourses.map(course => (
          <li key={course.title}>
            {course.title} - {course.enrollmentCount} students
          </li>
        ))}
      </ul>

      <h3>Course Statistics</h3>
      {analytics.courseStats.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Total Students</th>
              <th>Completed</th>
              <th>In Progress</th>
              <th>Avg Completion</th>
            </tr>
          </thead>
          <tbody>
            {analytics.courseStats.map(stat => (
              <tr key={stat.title}>
                <td>{stat.title}</td>
                <td>{stat.totalStudents}</td>
                <td>{stat.completed}</td>
                <td>{stat.inProgress}</td>
                <td>{stat.avgCompletion}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No course statistics available</p>
      )}
    </div>
  );
};

export default Analytics;