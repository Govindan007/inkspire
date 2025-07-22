import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const Signup = () => {
  const navigate = useNavigate();

  // ✅ Include username in state
  const [inp, setInp] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [pass, setPass] = useState("");

  const inputHandler = (e) => {
    setInp({ ...inp, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    if (inp.password !== pass) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3004/api/auth/register", inp); // ✅ Use actual route
      // Save user and token to localStorage for correct profile
      if (res.data.token && res.data.user) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
      alert(res.data.message || "Signup successful!");
      navigate("/d"); // ✅ Redirect after signup
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Signup failed. Please try again.";
      alert(errorMsg);
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#f5f8fa',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'Work Sans'
        }}
      >
        <div style={{ width: '100%', maxWidth: 400, padding: 20 }}>
          <Typography variant='h5' style={{ fontWeight: 700, marginBottom: 30, textAlign: 'center' }}>
            Join Inkspire.
          </Typography>

          <TextField
            fullWidth
            label="Username"
            name="username"
            value={inp.username}
            onChange={inputHandler}
            margin="normal"
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={inp.email}
            onChange={inputHandler}
            margin="normal"
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={inp.password}
            onChange={inputHandler}
            margin="normal"
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            margin="normal"
            variant="outlined"
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, py: 1, fontWeight: 600 }}
            onClick={submitHandler}
          >
            Sign Up
          </Button>

          <Typography align="center" sx={{ mt: 2 }}>
            Already have an account? <Link to="/login">Log in</Link>
          </Typography>
        </div>
      </div>
    </>
  );
};

export default Signup;