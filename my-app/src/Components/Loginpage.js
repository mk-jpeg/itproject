ort React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Correctly import useNavigate
import './Loginpage.css';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate


  const handleLogin = (e) => {
    e.preventDefault();


    if (email === 'user@example.com' && password === 'password123') {
      alert('Login successful! Redirecting...');
      navigate('/dashboard'); // Redirect to dashboard
    } else {
      setError('Invalid email or password.');
    }
  };


  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Read-orama!</h2>
        <form onSubmit={handleLogin}>
          <div className="textbox">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn">Login</button>
        </form>
        <div className="links">
          <a href="#">Forgot Password?</a>
          <a href="#">Create an Account</a>
        </div>
      </div>
    </div>
  );
};


export default LoginPage;
