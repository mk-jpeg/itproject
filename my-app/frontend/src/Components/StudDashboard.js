import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookReader, FaLanguage } from "react-icons/fa";
import { SiAnimalplanet } from "react-icons/si";
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
import "./StudDashboard.css";

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
      
      <nav className="navbar bg-blue-500 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="logo flex items-center">
            <SiAnimalplanet className="text-3xl" />
            <h1 className="ml-2 text-2xl font-bold text-white hover:scale-105 transition-transform duration-300">
              Read-O-Rama
            </h1>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="content-container">
        <div className="dashboard-header">
          <h2>Welcome {studentData.name}!</h2>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontSize: '1.5rem', color: '#f4efca' }}>Time to unleash your inner word wizard.</p>
        </div>

        <div className="card-container">
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

          <div className="card grammar-card">
            <div className="icon-container">
              <FaLanguage className="icon" />
            </div>
            <h2 className="card-title">Grammar Sorting</h2>
            <p className="card-description">
              Organize and classify grammatical elements with ease.
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