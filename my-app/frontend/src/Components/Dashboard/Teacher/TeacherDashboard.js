import React, { useState, useEffect } from "react";
import { FaChartBar } from "react-icons/fa";
import "./TeacherDashboard.css";
import { TeacherService } from "../../../Services/TeacherService";

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const data = await TeacherService.getStudentData();
        console.log("Fetched students:", data);
        setStudents(data);
      } catch (err) {
        setError("Failed to fetch student list. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <h1 className="game-title">Game Progress</h1>
        <button className="logout-button">Logout</button>
      </div>

      {/* Teacher Dashboard Title (Outside Navbar) */}
      <h1 className="dashboard-title">Teacher Dashboard</h1>

      {/* Dashboard Container */}
      <div className="dashboard-container">
        <h2 className="section-title">Student List</h2>

        {/* Show loading state */}
        {loading && <p className="text-center">Loading students...</p>}

        {/* Show error message */}
        {error && <p className="error-message">{error}</p>}

        {/* Student Table */}
        {!loading && !error && students.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td className="capitalize">{student.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && <p className="text-center">No students found.</p>
        )}

        {/* Game Progress Section */}
        <div className="game-progress-container">
          <div className="game-card">
            <h2>Antonym Game Progress</h2>
            <FaChartBar size={30} />
          </div>
          <div className="game-card">
            <h2>Grammar Game Progress</h2>
            <FaChartBar size={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
