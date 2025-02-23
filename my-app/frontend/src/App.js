import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/Loginpage";
import StudDashboard from "./Components/StudDashboard";
import AntonymGame from "./Components/Antonyms/Antonym";
import GrammarSort from "./Components/GrammarSort";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/StudDashboard" element={<StudDashboard />} />
        <Route path="/antonym-game" element={<AntonymGame />} />
        <Route path="/grammar-game" element={<GrammarSort />} />
      </Routes>
    </Router>
  );
};

export default App;
