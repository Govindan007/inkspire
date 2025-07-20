import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import logo from '../assets/Icon.svg'; 

const Navbar = () => {
  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100, // ensure it stays above all content
        backgroundColor: 'white',
      }}
    >
      <AppBar
        position="static"
        elevation={1}
        sx={{
          backgroundColor: 'white',
          color: 'black',
        }}
      >
        <Toolbar>
          {/* Logo and Title */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <IconButton edge="start">
             <img src={logo} alt="Inkspire" style={{ height: 32 }} />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: 600, color: 'black' }}
            >
              Inkspire
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          {/* Login & Sign-up */}
          <Link to="/l" style={{ textDecoration: 'none' }}>
            <Button sx={{ color: 'black' }}>Login</Button>
          </Link>
          <Link to="/s" style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={{ backgroundColor: 'black', color: 'white' }}>
              Sign-up
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
