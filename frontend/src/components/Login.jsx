import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BACKEND = import.meta.env.VITE_BACKEND_LINK;
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [inp, setInp] = useState({ email: "", password: "" });

  const inputHandler = (e) => {
    setInp({ ...inp, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    try {
      const res = await axios.post(`${BACKEND}/auth/login`, inp);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/d");

      } else {
        alert(res.data.message || "Login failed.");
      }
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f8fa', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 400, padding: 20 }}>
          <Typography variant='h5' style={{ fontWeight: 700, marginBottom: 30, textAlign: 'center' }}>
            Welcome back.
          </Typography>

          <TextField fullWidth label="Email" name="email" value={inp.email} onChange={inputHandler} margin="normal" variant="outlined" type="email" />
          <TextField fullWidth label="Password" name="password" value={inp.password} onChange={inputHandler} margin="normal" variant="outlined" type="password" />

          <Button variant='contained' fullWidth onClick={submitHandler} sx={{ mt: 2 }}>Log in</Button>

          <Typography align="center" sx={{ mt: 2 }}>
            No account? <Link to="/s">Signup</Link>
          </Typography>
        </div>
      </div>
    </>
  );
};

export default Login;
