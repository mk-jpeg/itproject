import React from 'react';
import { Link } from "react-router-dom"
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
          <h1>Read-o-Rama</h1>
          <p>The place that makes English an adventure, 
            not an assignment.
          </p>
        </div>
        {/* Tentacles Image */}
        <div className="tentacles-container">
          <img src={`${process.env.PUBLIC_URL}/images/Octooo.png`} alt="Octopus Tentacles" className="tentacles" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
