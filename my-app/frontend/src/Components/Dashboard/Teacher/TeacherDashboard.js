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
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [studentData, setStudentData] = useState({
    antonymGame: [],
    grammarGame: [],
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const data = await TeacherService.getStudentData();
        setStudents(data);
      } catch (err) {
        setError("Failed to fetch student list. Please try again.");
      } finally {
        setLoading(false);
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

        {/* Show loading state */}
        {loading && (
          <p className="text-center text-gray-500">Loading students...</p>
        )}

        {/* Show error message if API fails */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Show student list */}
        {!loading && !error && (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2 text-left">Name</th>
                  <th className="border px-4 py-2 text-left">Email</th>
                  <th className="border px-4 py-2 text-left">Role</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map((student, index) => (
                    <tr key={index} className="hover:bg-gray-100 transition">
                      <td className="border px-4 py-2">{student.name}</td>
                      <td className="border px-4 py-2">{student.email}</td>
                      <td className="border px-4 py-2 capitalize">
                        {student.role}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  // TODO: Update APIs to save student progress, and then show results in Teacher's Dashboard
  // Commenting the code for now.

  // return (
  //   <div
  //     className={`min-h-screen p-6 ${
  //       darkMode ? "dark bg-gray-900" : "bg-background"
  //     }`}
  //   >
  //     <div className="max-w-7xl mx-auto">
  //       <div className="flex justify-between items-center mb-8">
  //         <div className="flex items-center gap-3">
  //           <FaChalkboardTeacher className="text-4xl text-primary" />
  //           <h1 className="text-2xl font-heading text-foreground">
  //             Teacher Dashboard
  //           </h1>
  //         </div>
  //         <button
  //           onClick={() => setDarkMode(!darkMode)}
  //           className="p-2 rounded-full bg-secondary hover:bg-muted transition-colors"
  //         >
  //           {darkMode ? (
  //             <BsSunFill className="text-xl" />
  //           ) : (
  //             <BsMoonFill className="text-xl" />
  //           )}
  //         </button>
  //       </div>

  //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  //         <GameProgressCard
  //           title="Antonym Exploration"
  //           data={studentData.antonymGame}
  //           icon={<FaGamepad />}
  //         />
  //         <GameProgressCard
  //           title="Grammar Sorting"
  //           data={studentData.grammarGame}
  //           icon={<FaBook />}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default TeacherDashboard;
