import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./Loginpage.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { AuthService } from '../../Services/AuthService';
import { jwtDecode } from "jwt-decode";

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await AuthService.login(email, password);

      setOpenSnackbar(true);
      localStorage.setItem("token", data.token); // Store token for authentication

      const decodedToken = jwtDecode(data.token);
      const userRole = decodedToken.role;

      setTimeout(() => {
        if (userRole === "teacher") {
          navigate("/teacher-dashboard", {
            state: { message: "Welcome Teacher!" },
          });
        } else if (userRole === "student") {
          navigate("/student-dashboard", {
            state: { message: "Welcome Student!" },
          });
        } else {
          setError("Invalid role. Please contact admin.");
          setOpenDialog(true);
        }
      }, 1500);
    } catch (error) {
      setError("Invalid email or password.");
      setOpenDialog(true);
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
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
      {/* Snackbar for Success Message */}
      <Snackbar open={openSnackbar} autoHideDuration={1500}>
        <Alert severity="success">Login successful! Redirecting...</Alert>
      </Snackbar>

      {/* Dialog for Login Failure */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>{error}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            color="primary"
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoginPage;
