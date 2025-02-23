import React, { useState, useEffect } from 'react';
import './StudDashboard.css';


const StudDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setStudentData({
        name: "prapti",
        courseName: "Interactive Reading",
        lessons: [
          { id: 1, title: "Lesson 1 - Introduction", completed: true },
          { id: 2, title: "Lesson 2 - Vocabulary", completed: false },
          { id: 3, title: "Lesson 3 - Grammar", completed: false },
          { id: 4, title: "Lesson 4 - Reading Comprehension", completed: false },
          { id: 5, title: "Lesson 5 - Storytelling", completed: false },
        ],
        overallProgress: 20,  // Progress in percentage (out of 100)
      });
      setLoading(false);
    }, 2000);
  }, []);


  const handleLessonClick = (lessonId) => {
    // You can add more logic here to handle the click event, like opening the lesson details
    alert(`You clicked on Lesson ${lessonId}`);
  };


  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome to Your Learning Dashboard, {studentData.name}!</h2>
        <p>Course: {studentData.courseName}</p>
      </div>


      {/* Progress Bar for Overall Progress */}
      <div className="progress-section">
        <h3>Overall Learning Progress</h3>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${studentData.overallProgress}%` }}
          ></div>
        </div>
        <p>{studentData.overallProgress}% completed</p>
      </div>


      {/* Lessons List - Clickable Lessons */}
      <div className="lessons-completed">
        <h3>Click on a lesson to view details</h3>
        <ul>
          {studentData.lessons.map((lesson) => (
            <li
              key={lesson.id}
              className={`lesson-item ${lesson.completed ? 'completed' : ''}`}
              onClick={() => handleLessonClick(lesson.id)}  // Click handler
            >
              {lesson.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default StudDashboard;
