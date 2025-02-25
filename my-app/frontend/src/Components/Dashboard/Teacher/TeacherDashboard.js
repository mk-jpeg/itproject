import React, { useState, useEffect } from "react";
import {
  FaGamepad,
  FaChalkboardTeacher,
  FaBook,
  FaChartBar,
} from "react-icons/fa";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import "./TeacherDashboard.css";
import { TeacherService } from "../../../Services/TeacherService";

const TeacherDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [studentData, setStudentData] = useState({
    antonymGame: [],
    grammarGame: [],
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const data = await TeacherService.getStudentData();
        setStudentData(data);
      } catch (error) {
        console.error("Failed to fetch student data", error);
      }
    };

    fetchStudentData();
  }, []);

  const GameProgressCard = ({ title, data, icon }) => (
    <div className="bg-card p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-heading font-heading flex items-center gap-2">
          {icon}
          {title}
        </h3>
        <FaChartBar className="text-primary text-xl" />
      </div>
      <div className="space-y-4">
        {data.map((student, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-body">
              <span>{student.name}</span>
              <span className="text-accent">{student.score}%</span>
            </div>
            <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all"
                style={{ width: `${student.score}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-accent">
              <span>{student.timeSpent}</span>
              <span>{student.level}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className={`min-h-screen p-6 ${
        darkMode ? "dark bg-gray-900" : "bg-background"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <FaChalkboardTeacher className="text-4xl text-primary" />
            <h1 className="text-2xl font-heading text-foreground">
              Teacher Dashboard
            </h1>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-secondary hover:bg-muted transition-colors"
          >
            {darkMode ? (
              <BsSunFill className="text-xl" />
            ) : (
              <BsMoonFill className="text-xl" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GameProgressCard
            title="Antonym Exploration"
            data={studentData.antonymGame}
            icon={<FaGamepad />}
          />
          <GameProgressCard
            title="Grammar Sorting"
            data={studentData.grammarGame}
            icon={<FaBook />}
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
