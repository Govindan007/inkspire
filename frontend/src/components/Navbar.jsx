import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <div>
      <Box className='nav' sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor:'white'}} >
        <Toolbar>
          <IconButton edge="start">
            <img src="Icon.svg" alt='Blog App Logo' style={{height:32}}/>
          </IconButton>
          <Typography id='typ'variant="h6" component="div" sx={{ flexGrow: 1 }} color='black'>
            Inkspire
          </Typography>
          <Link to={'/l'}>
          <Button id='login' color="inherit" style={{color:'black'}}>
            Login</Button></Link>
            <Link to={'/s'}>
          <Button id = 'sign' color="inherit" style={{color:'black'}} >Sign-up</Button></Link>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default Navbar
