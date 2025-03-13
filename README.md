# EdTech Course Management System

A course management system for an EdTech platform with a Node.js/Express backend and a React frontend.

## Features
- Course Management (CRUD)
- Student List
- Course Enrollment System
- Basic Analytics (popular courses, completion percentage)

## Setup

### Backend
1. Navigate to `backend/`
2. Install dependencies: `npm install`
3. Create a `.env` file 
4. Start the server: `npm start` `npm run dev `

### Frontend
1. Navigate to `frontend/`
2. Install dependencies: `npm install`
3. Start the app: `npm start`

## API Endpoints
- `GET /api/courses` - List all courses
- `POST /api/courses` - Create a course
- `GET /api/students` - List all students
- `POST /api/students` - Create a student
- `POST /api/students/enroll` - Enroll a student in a course
- `GET /api/courses/analytics` - Get analytics data
