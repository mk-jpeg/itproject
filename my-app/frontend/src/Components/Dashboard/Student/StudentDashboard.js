import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookReader, FaLanguage } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import "./StudentDashboard.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StudDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setStudentData({
        name: " ",
        courseName: "Interactive Reading",
        progress: { antonym: 70, grammar: 45 },
      });
      setLoading(false);
    }, 1500);
  }, []);

  const data = {
    labels: ["Antonym Exploration", "Grammar Sorting"],
    datasets: [
      {
        label: "Progress",
        data: [studentData?.progress?.antonym || 0, studentData?.progress?.grammar || 0], 
        backgroundColor: "#00796b",
        borderRadius: 10,
        barThickness: 20
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "User Progress" }
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        ticks: { beginAtZero: true, max: 100 },
        grid: { borderDash: [3, 3] }
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </nav>
      <div className="content-container">
        <div className="dashboard-header">
          <h1 className="word-exe-title" style={{ fontSize: "3rem" }}>Word.exe</h1>
          <h2>Welcome {studentData.name}!</h2>
          <p className="intro-text">Every word you learn is a step toward mastery.<br />
            Take the challenge and watch your skills soar.</p>
        </div>

        {/* Cards Section */}
        <div className="card-container">
          <div className="card">
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

          <div className="card">
            <div className="icon-container">
              <FaLanguage className="icon" />
            </div>
            <h2 className="card-title">Grammar Sorting</h2>
            <p className="card-description">
              Organize and classify grammatical elements.
            </p>
            <button className="continue-button" onClick={() => navigate("/GrammarsSort")}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudDashboard;
