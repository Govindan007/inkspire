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

          <div style={{ marginBottom: 20 }}>
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

          <div style={{ marginBottom: 30 }}>
            <Typography align="left" style={{ fontWeight: 500, marginBottom: 5 }}>Confirm Password</Typography>
            <TextField
              fullWidth
              variant='outlined'
              placeholder='Confirm your password'
              type='password'
              name="pass"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              InputProps={{
                style: {
                  borderRadius: 10,
                  backgroundColor: '#fff'
                }
              }}
            />
          </div>

          <Button
            id='signupbutton'
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
            Sign up
          </Button>

          <Typography style={{ marginTop: 20, textAlign: 'center', fontSize: '14px', color: '#555' }}>
            Already have an account?{' '}
            <Link to="/l" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 500 }}>
              Log in.
            </Link>
          </Typography>
        </div>
      </div>
    </>
  );
};

export default Signup;
