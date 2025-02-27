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
  Legend,
} from "chart.js";
import "./StudentDashboard.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StudDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const studentId = localStorage.getItem("studentId"); // Ensure studentId is stored in localStorage

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/progress/student/${studentId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch progress");

        const data = await response.json();

        // Calculate scores from fetched progress
        const antonymProgress = data.filter(entry => entry.game === "Antonym Game").reduce((acc, curr) => acc + curr.score, 0);
        const grammarProgress = data.filter(entry => entry.game === "Grammar Sort").reduce((acc, curr) => acc + curr.score, 0);

        setStudentData({
          name: data.name || "Student",
          courseName: "Interactive Reading",
          progress: {
            antonym: antonymProgress || 0,
            grammar: grammarProgress || 0,
          },
        });
      } catch (error) {
        console.error("Error fetching progress:", error);
        setStudentData({ name: "Student", progress: { antonym: 0, grammar: 0 } });
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [studentId]);

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
          <h2>Welcome {studentData?.name}!</h2>
          <p className="intro-text">
            Every word you learn is a step toward mastery.<br />
            Take the challenge and watch your skills soar.
          </p>
        </div>

        {/* Cards Section (Antonym & Grammar Games) */}
        <div className="card-container">
          <div className="card">
            <div className="icon-container">
              <FaBookReader className="icon" />
            </div>
            <h2 className="card-title">Antonym Exploration</h2>
            <p className="card-description">
              Discover word opposites and expand your vocabulary.
            </p>
            <button className="continue-button" onClick={() => navigate("/antonyms")}>Continue</button>
          </div>

          <div className="card">
            <div className="icon-container">
              <FaLanguage className="icon" />
            </div>
            <h2 className="card-title">Grammar Sorting</h2>
            <p className="card-description">
              Organize and classify grammatical elements.
            </p>
            <button className="continue-button" onClick={() => navigate("/GrammarsSort")}>Continue</button>
          </div>
        </div>

        {/* Scroll Down to See Progress */}
        {/* Progress Section - Appears Below Cards */}
<div className="progress-container">
  <h2 className="progress-title">Your Progress</h2>
  <Bar
    className="progress-chart"
    data={{
      labels: ["Antonym Exploration", "Grammar Sorting"],
      datasets: [
        {
          label: "Progress",
          data: [studentData?.progress?.antonym || 0, studentData?.progress?.grammar || 0],
          backgroundColor: "#00796b",
          borderRadius: 10,
          barThickness: 20,
        },
      ],
    }}
    options={{
      responsive: true,
      plugins: { legend: { display: false }, title: { display: true, text: "User Progress" } },
      scales: {
        x: { grid: { display: false } },
        y: { ticks: { beginAtZero: true, max: 100 }, grid: { borderDash: [3, 3] } },
      },
    }}
  />
</div>

        
      </div>
    </div>
  );
};

export default StudDashboard;
