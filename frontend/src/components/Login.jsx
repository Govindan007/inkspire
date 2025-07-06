import { Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Login = () => {
  var navigate = useNavigate();

  var [inp, setInp] = useState({ email: "", password: "" });
  const inputHandler = (e) => {
    setInp({ ...inp, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    try {
      const res = await axios.post("http://localhost:3004/l", {
        email: inp.email,
        password: inp.password
      });
      if (res.data.success) {
        alert("Login successful");
        navigate("/d");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
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
            Welcome back.
          </Typography>

          <div style={{ marginBottom: 20 }}>
            <Typography align="left" style={{ fontWeight: 500, marginBottom: 5 }}>Email</Typography>
            <TextField
              fullWidth
              variant='outlined'
              placeholder='Your email'
              type='email'
              name="email"
              value={inp.email}
              onChange={inputHandler}
              InputProps={{
                style: {
                  borderRadius: 10,
                  backgroundColor: '#fff'
                }
              }}
            />
          </div>

          <div style={{ marginBottom: 30 }}>
            <Typography align="left" style={{ fontWeight: 500, marginBottom: 5 }}>Password</Typography>
            <TextField
              fullWidth
              variant='outlined'
              placeholder='Your password'
              type='password'
              name="password"
              value={inp.password}
              onChange={inputHandler}
              InputProps={{
                style: {
                  borderRadius: 10,
                  backgroundColor: '#fff'
                }
              }}
            />
          </div>

          <Button
            id='loginbutton'
            variant='contained'
            fullWidth
            onClick={submitHandler}
            sx={{
              borderRadius: '8px',
              paddingY: '10px',
              fontWeight: 600,
              fontSize: '15px',
              background: '#007bff',
              boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
              textTransform: 'none',
              fontFamily: 'Work Sans'
            }}
          >
            Log in
          </Button>

          <Typography style={{ marginTop: 20, textAlign: 'center', fontSize: '14px', color: '#555' }}>
            No account?{' '}
            <Link to="/s" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 500 }}>
              signup.
            </Link>
          </Typography>
        </div>
      </div>
    </>
  );
};

export default Login;
