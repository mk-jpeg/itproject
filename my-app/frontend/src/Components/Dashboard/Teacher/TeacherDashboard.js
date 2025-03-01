import React, { useState, useEffect } from "react";
import { FaChartBar } from "react-icons/fa";
import "./TeacherDashboard.css";
import { TeacherService } from "../../../Services/TeacherService";

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [studentProgress, setStudentProgress] = useState({});

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const data = await TeacherService.getStudentData();
        console.log("Fetched students:", data);
        setStudents(data);
        await fetchStudentProgress(data);
      } catch (err) {
        setError("Failed to fetch student list. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const fetchStudentProgress = async (students) => {
      const progressPromises = students.map(async (student) => {
        try {
          const response = await fetch(`http://localhost:5000/api/progress/student/${student.id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
          const progressData = await response.json();
          return {
            studentId: student.id,
            antonymProgress: progressData.filter(entry => entry.game === "Antonym Game").reduce((acc, curr) => acc + curr.score, 0),
            grammarProgress: progressData.filter(entry => entry.game === "Grammar Sort").reduce((acc, curr) => acc + curr.score, 0),
          };
        } catch (err) {
          console.error("Failed to fetch progress for student:", student.id);
          return { studentId: student.id, antonymProgress: 0, grammarProgress: 0 };
        }
      });

      const progressData = await Promise.all(progressPromises);
      const progressMap = progressData.reduce((acc, progress) => {
        acc[progress.studentId] = progress;
        return acc;
      }, {});

      setStudentProgress(progressMap);
    };

    fetchStudentData();
  }, []);

  return (
    <div>
      {/* Navbar (Matching StudentDashboard) */}
      <div className="navbar">
  <h1 className="game-title">word.exe</h1>
  <ul className="navbar-links">
    
  </ul>
  <button className="logout">Logout</button>
</div>

      {/* Teacher Dashboard Title */}
      <h1 className="dashboard-title">Teacher Dashboard</h1>

      {/* Dashboard Container */}
      <div className="dashboard-container">
        <h2 className="section-title">Student List</h2>

        {loading && <p className="text-center">Loading students...</p>}
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
                  <th>Antonym Game Progress</th>
                  <th>Grammar Game Progress</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td className="capitalize">{student.role}</td>
                    <td>{studentProgress[student.id]?.antonymProgress || 0}%</td>
                    <td>{studentProgress[student.id]?.grammarProgress || 0}%</td>
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
