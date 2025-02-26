import React from 'react';
import { Link } from "react-router-dom";
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      {/* Navbar */}
      <nav className="navbar">
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/LoginPage">Login</Link></li>
          <li><Link to="/teachers">Teachers</Link></li>
          <li><Link to="/StudDashboard">Students</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="content">
        <div className="text-content">
          <h1>Word.exe</h1>
          <p>The place that makes English an adventure, not an assignment.</p>
        </div>

        {/* Vision Section */}
        <div className="vision-section">
          <div className="vision-content">
            <h2>Our Vision</h2>
            <p>
              We believe that learning English should be engaging, fun, and interactive. 
              Our mission is to create an environment where students develop a love for language, 
              literature, and learning through innovative tools and resources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;