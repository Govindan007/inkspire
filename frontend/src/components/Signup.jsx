import React from 'react'
import { Button, TextField, Typography } from '@mui/material'


const Signup = () => {
  return (
      <div className='signup'style={{textAlign: 'center'}}>
      <Typography variant='h3'style={{fontFamily:'serif'}}>Sign-Up</Typography><br /><br />
      <TextField variant='outlined' placeholder='Username' type='email'></TextField><br /><br />
      <TextField variant='outlined' placeholder='Password' type='password'></TextField><br /><br />
      <TextField variant='outlined' placeholder='Confirm Password' type='password'></TextField><br /><br />
      <Button id='signupbutton' variant='contained' sx={{ mt: 2}}style={{textAlign:'center'}}>Sign-up</Button>
    </div>
  )
}

export default Signup
