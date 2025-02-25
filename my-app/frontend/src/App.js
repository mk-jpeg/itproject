import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/Login/Loginpage";
import StudDashboard from "./Components/Dashboard/Student/StudentDashboard";
import Antonym from "./Components/Antonyms/Antonym";
import GrammarSort from "./Components/GrammarsSorts/GrammarSort";
import TeacherDashboard from "./Components/Dashboard/Teacher/TeacherDashboard";
import HomePage from "./Components/Home/HomePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/student-dashboard" element={<StudDashboard />} />
        <Route path="/Antonyms" element={<Antonym />} />
        <Route path="/GrammarsSort" element={<GrammarSort />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
