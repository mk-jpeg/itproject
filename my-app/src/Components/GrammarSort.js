import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import { FaBookReader, FaLanguage } from "react-icons/fa";
import "./StudDashboard.css";

const StudDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    setTimeout(() => {
      setStudentData({
        name: "Prapti",
        courseName: "Interactive Reading",
        overallProgress: 20,
      });
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {studentData.name}!</h2>
        <p>Course: {studentData.courseName}</p>
      </div>

      {/* Progress Section */}
      <div className="progress-section">
        <h3>Overall Learning Progress</h3>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${studentData.overallProgress}%` }}></div>
        </div>
        <p>{studentData.overallProgress}% completed</p>
      </div>

      {/* Navigation Buttons */}
      <div className="card-container">
        {/* Antonym Exploration Card */}
        <div className="card antonym-card">
          <div className="icon-container">
            <FaBookReader className="icon" />
          </div>
          <h2 className="card-title">Antonym Exploration</h2>
          <p className="card-description">
            Discover word opposites and expand your vocabulary.
          </p>
          <button className="continue-button" onClick={() => navigate("/antonyms")}>
            Continue
          </button>
        </div>

        {/* Grammar Sorting Card */}
        <div className="card grammar-card">
          <div className="icon-container">
            <FaLanguage className="icon" />
          </div>
          <h2 className="card-title">Grammar Sorting</h2>
          <p className="card-description">
            Organize and classify grammatical elements with ease.
          </p>
          <button className="continue-button" onClick={() => navigate("/grammar")}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudDashboard;
