import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import logo from '../assets/Icon.svg'; // Adjust the path as necessary

const Navbar2 = () => {
  const navigate = useNavigate();

  // State to handle dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  const handleLogout = () => {
    handleClose();
    navigate('/'); // Redirect to Home
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={1}
        sx={{ backgroundColor: 'white', zIndex: 1300 }}
      >
        <Toolbar>
          {/* Logo & Title */}
          <Link to="/d" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <IconButton edge="start">
              <img src={logo} alt="Inkspire" style={{ height: 32 }} />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              color="black"
              sx={{ fontWeight: 600 }}
            >
              Inkspire
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          {/* Avatar with dropdown */}
          <IconButton onClick={handleMenuClick}>
            <Avatar
              alt="Profile"
              src="ProfileIcon.png"
              sx={{ width: 36, height: 36 }}
            />
          </IconButton>

          {/* Menu dropdown */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogout} sx={{ color: 'red' }}>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar2;
