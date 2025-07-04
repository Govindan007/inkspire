import { Button, TextField, Typography } from '@mui/material'
import React from 'react'

const Login = () => {
  return (
    <div className='login'style={{textAlign: 'center'}}>
      <Typography variant='h3'style={{fontFamily:'serif'}}>Login</Typography><br /><br />
      <TextField variant='outlined' placeholder='Username' type='email'></TextField><br /><br />
      <TextField variant='outlined' placeholder='Password' type='password'></TextField><br /><br />
      <Button id='loginbutton' variant='contained' sx={{ mt: 2}}style={{textAlign:'center'}}>Login</Button>
    </div>
  )
}

export default Login
