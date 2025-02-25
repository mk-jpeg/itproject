import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/Loginpages/Loginpage";
import StudDashboard from "./Components/StudDashboard";
import Antonym from "./Components/Antonyms/Antonym";
import GrammarSort from "./Components/GrammarsSorts/GrammarSort";
import TeacherDashboard from "./Components/TeacherDashboard";
import HomePage from "./Components/HomePage/HomePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/StudDashboard" element={<StudDashboard />} />
        <Route path="/Antonyms" element={<Antonym/>} />
        <Route path="/GrammarsSort" element={<GrammarSort />} />
        <Route path="/TeacherDashboard" element={<TeacherDashboard />} />

      </Routes>
    </Router>
  );
};

export default App;
