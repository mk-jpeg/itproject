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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const defaultStudentData = {
  name: "",
  courseName: "",
  progress: {
    antonym: {
      averageScore: 0,
      attempts: 0,
    },
    grammar: {
      averageScore: 0,
      attempts: 0,
    },
  },
};

const StudDashboard = () => {
  const [studentData, setStudentData] = useState(defaultStudentData);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const studentId = localStorage.getItem("studentId"); // Ensure studentId is stored in localStorage

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/student/stats",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch stats");

        const data = await response.json();

        // Extract average scores
        const antonymStats = data.stats.find((s) => s.game === "antonym");
        const grammarStats = data.stats.find((s) => s.game === "grammar");

        setStudentData({
          name: "Student",
          courseName: "Interactive Reading",
          progress: {
            antonym: {
              averageScore: parseFloat(antonymStats?.averageScore || 0),
              attempts: antonymStats?.attempts || 0,
            },
            grammar: {
              averageScore: parseFloat(grammarStats?.averageScore || 0),
              attempts: grammarStats?.attempts || 0,
            },
          },
        });
      } catch (error) {
        console.error("Error fetching student stats:", error);
        setStudentData({
          name: "Student",
          courseName: "Interactive Reading",
          progress: {
            antonym: {
              averageScore: 0,
              attempts: 0,
            },
            grammar: {
              averageScore: 0,
              attempts: 0,
            },
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    if (studentData) {
      console.log("studentData has been updated:", studentData);
    }
  }, [studentData]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <ul className="navbar-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/logout">Logout</a>
          </li>
        </ul>
      </nav>
      <div className="content-container">
        <div className="dashboard-header">
          <h1 className="word-exe-title" style={{ fontSize: "3rem" }}>
            Word.exe
          </h1>
          <h2>Welcome {studentData?.name}!</h2>
          <p className="intro-text">
            Every word you learn is a step toward mastery.
            <br />
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
            <button
              className="continue-button"
              onClick={() => navigate("/antonyms")}
            >
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
            <button
              className="continue-button"
              onClick={() => navigate("/GrammarsSort")}
            >
              Continue
            </button>
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
                  data: [
                    studentData?.progress?.antonym || 0,
                    studentData?.progress?.grammar || 0,
                  ],
                  backgroundColor: "#00796b",
                  borderRadius: 10,
                  barThickness: 20,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                title: { display: true, text: "User Progress" },
              },
              scales: {
                x: { grid: { display: false } },
                y: {
                  ticks: { beginAtZero: true, max: 100 },
                  grid: { borderDash: [3, 3] },
                },
              },
            }}
          />
        </div>

        <div
          className="score-attempts-container"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            marginTop: "2rem",
          }}
        >
          {/* TODO: Change as required. */}
          {/* Antonym Card */}
          <div
            className="score-card"
            style={{
              padding: "1rem",
              borderRadius: "10px",
              background: "#00796b",
              minWidth: "200px",
              textAlign: "center",
            }}
          >
            <h3>Antonym Game</h3>
            <p>
              <strong>Average Score:</strong>{" "}
              {studentData?.progress?.antonym?.averageScore ?? 0}
            </p>
            <p>
              <strong>Attempts:</strong>{" "}
              {studentData?.progress?.antonym?.attempts ?? 0}
            </p>
          </div>

          {/* Grammar Card */}
          <div
            className="score-card"
            style={{
              padding: "1rem",
              borderRadius: "10px",
              background: "#00796b",
              minWidth: "200px",
              textAlign: "center",
            }}
          >
            <h3>Grammar Game</h3>
            <p>
              <strong>Average Score:</strong>{" "}
              {studentData?.progress?.grammar?.averageScore ?? 0}
            </p>
            <p>
              <strong>Attempts:</strong>{" "}
              {studentData?.progress?.grammar?.attempts ?? 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudDashboard;
