import React, { useState, useEffect } from "react";
import { FaChartBar } from "react-icons/fa";
import "./TeacherDashboard.css";
import { TeacherService } from "../../../Services/TeacherService";

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [studentProgress, setStudentProgress] = useState({});

  // useEffect(() => {
  //   const fetchStudentData = async () => {
  //     try {
  //       const data = await TeacherService.getStudentData();
  //       console.log("Fetched students:", data);
  //       setStudents(data);
  //       await fetchStudentProgress(data);
  //     } catch (err) {
  //       setError("Failed to fetch student list. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const fetchStudentProgress = async (students) => {
  //     const progressPromises = students.map(async (student) => {
  //       try {
  //         const response = await fetch(`http://localhost:5000/api/progress/student/${student.id}`, {
  //           headers: {
  //             'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //           },
  //         });
  //         const progressData = await response.json();
  //         return {
  //           studentId: student.id,
  //           antonymProgress: progressData.filter(entry => entry.game === "Antonym Game").reduce((acc, curr) => acc + curr.score, 0),
  //           grammarProgress: progressData.filter(entry => entry.game === "Grammar Sort").reduce((acc, curr) => acc + curr.score, 0),
  //         };
  //       } catch (err) {
  //         console.error("Failed to fetch progress for student:", student.id);
  //         return { studentId: student.id, antonymProgress: 0, grammarProgress: 0 };
  //       }
  //     });

  //     const progressData = await Promise.all(progressPromises);
  //     const progressMap = progressData.reduce((acc, progress) => {
  //       acc[progress.studentId] = progress;
  //       return acc;
  //     }, {});

  //     setStudentProgress(progressMap);
  //   };

  //   fetchStudentData();
  // }, []);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const rawData = await TeacherService.getStudentsWithProgress();

        const formattedData = rawData.map(({ student, stats }) => {
          const progress = {
            antonym: { attempts: 0, averageScore: 0 },
            grammar: { attempts: 0, averageScore: 0 },
          };

          stats.forEach(({ game, attempts, averageScore }) => {
            progress[game] = {
              attempts: attempts || 0,
              averageScore: parseFloat(averageScore || 0),
            };
          });

          return {
            id: student.id,
            email: student.email,
            progress,
          };
        });

        setStudents(formattedData);
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
      {/* Navbar (Matching StudentDashboard) */}
      <div className="navbar">
        <h1 className="game-title">word.exe</h1>
        <ul className="navbar-links"></ul>
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
                  <th>Email</th>
                  <th>Antonym Score</th>
                  <th>Antonym Attempts</th>
                  <th>Grammar Score</th>
                  <th>Grammar Attempts</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.email}</td>
                    <td>{student.progress.antonym.averageScore}%</td>
                    <td>{student.progress.antonym.attempts}</td>
                    <td>{student.progress.grammar.averageScore}%</td>
                    <td>{student.progress.grammar.attempts}</td>
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
