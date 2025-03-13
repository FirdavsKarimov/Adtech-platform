import React, { useEffect, useState } from 'react';
import { getAnalytics } from '../services/api';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({ popularCourses: [], avgCompletion: 0 });

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
      <h3>Popular Courses</h3>
      <ul>
        {analytics.popularCourses.map(course => (
          <li key={course.title}>{course.title} - {course.enrollmentCount} students</li>
        ))}
      </ul>
      <h3>Average Completion Rate</h3>
      <p>{analytics.avgCompletion.toFixed(2)}%</p>
    </div>
  );
};

export default Analytics;