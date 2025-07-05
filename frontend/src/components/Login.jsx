import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

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
    <div className='login'style={{textAlign: 'center'}}>
      <Typography variant='h3'style={{fontFamily:'serif'}}>Login</Typography><br /><br />
      <TextField variant='outlined' placeholder='Username' type='email' name="email" value={inp.email} onChange={inputHandler}></TextField><br /><br />
      <TextField variant='outlined' placeholder='Password' type='password' name="password" value={inp.password} onChange={inputHandler}></TextField><br /><br />
      <Button id='loginbutton' variant='contained' sx={{ mt: 2}}style={{textAlign:'center'}} onClick={submitHandler}>Login</Button>
    </div>
  )
}

export default Login
