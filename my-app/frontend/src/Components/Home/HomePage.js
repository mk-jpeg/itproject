import React from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      {/* Animated Navbar */}
      <motion.nav 
        className="navbar"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/LoginPage">Login</Link></li>
          <li><Link to="/teachers">Teachers</Link></li>
          <li><Link to="/StudDashboard">Students</Link></li>
        </ul>
      </motion.nav>

      {/* Main Content */}
      <div className="content">
        <motion.div 
          className="text-content left-aligned"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <h1 className="big-title">Word.exe</h1>
          <p>The place that makes English an adventure, not an assignment.</p>
        </motion.div>

        {/* Vision Section */}
        <motion.div 
          className="vision-section"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <div className="vision-content">
            <h2>Our Vision</h2>
            <p>
              We believe that learning English should be engaging, fun, and interactive. 
              Our mission is to create an environment where students develop a love for language, 
              literature, and learning through innovative tools and resources.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default HomePage;
