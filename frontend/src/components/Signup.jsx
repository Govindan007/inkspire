import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const Signup = () => {
  const navigate = useNavigate();
  const [inp, setInp] = useState({ email: "", password: "" });
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
      const check = await axios.post("http://localhost:3004/l", {
        email: inp.email,
        password: inp.password
      });

      if (check.data.success) {
        alert("User already exists. Please log in.");
        setInp({ email: "", password: "" });
        setPass("");
        return;
      }
    } catch (err) {
      if (err.response?.data?.message !== "User not found") {
        alert("Something went wrong while checking user.");
        return;
      }
    }

    axios.post('http://localhost:3004/s', inp)
      .then((res) => {
        alert(res.data);
        navigate("/d");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    <Navbar/>
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

          <TextField fullWidth label="Email" name="email" value={inp.email} onChange={inputHandler} margin="normal" variant="outlined" type="email" />
          <TextField fullWidth label="Password" name="password" value={inp.password} onChange={inputHandler} margin="normal" variant="outlined" type="password" />
          <TextField fullWidth label="Confirm Password" value={pass} onChange={(e) => setPass(e.target.value)} margin="normal" variant="outlined" type="password" />

          <Button variant="contained" fullWidth sx={{ mt: 2, py: 1, fontWeight: 600 }} onClick={submitHandler}>Sign Up</Button>

          <Typography align="center" sx={{ mt: 2 }}>
            Already have an account? <Link to="/l">Log in</Link>
          </Typography>
        </div>
      </div>
    </>
  );
};

export default Signup;