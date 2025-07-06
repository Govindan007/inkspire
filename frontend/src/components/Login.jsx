import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Navbar from './Navbar';

const Login = () => {
  var navigate = useNavigate()


  var [inp, setInp]=useState({email:"", password:""})
  const inputHandler=(e)=>{
    setInp({...inp, [e.target.name]:e.target.value})
  }

  const submitHandler=async()=>{
    try {
      const res=await axios.post("http://localhost:3004/l",{
        email: inp.email,
        password: inp.password
      })
      if(res.data.success){
        alert("Login successfull")
        navigate("/d")
      }
      else{
        alert(res.data.message)
      }
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || err.message))
    }
  }

  
  return (
    <>
      <Navbar />
      <div className='login' style={{ textAlign: 'center' }}>
        <Typography variant='h4' style={{ fontFamily: 'Work Sans', fontWeight: 600 }}>
          Welcome back.
        </Typography>
        <br /><br />
        <TextField
          variant='outlined'
          placeholder='Username'
          type='email'
          name="email"
          value={inp.email}
          onChange={inputHandler}
        />
        <br /><br />
        <TextField
          variant='outlined'
          placeholder='Password'
          type='password'
          name="password"
          value={inp.password}
          onChange={inputHandler}
        />
        <br /><br />
        <Button
          id='loginbutton'
          variant='contained'
          sx={{ mt: 2, fontFamily: 'Work Sans' }}
          onClick={submitHandler}
        >
          Login
        </Button>
      </div>
    </>
  )
}

export default Login
