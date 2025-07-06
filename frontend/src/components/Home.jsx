import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { FormatUnderlined } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';


const Home = () => {
  const location = useLocation();

  return (
    <div >
      
     {location.pathname === '/' && (
    <div className='heading'>
      <div className='sub'>
      <h1>Ink The Internet<br/> With Your Ideas.....!</h1>
      <p>
       Where ideas begin, and revolutions follow.
      </p>
     </div>
    </div>
    )}
    {location.pathname === '/' && (
    
    <div style={{padding: '2rem', background: '#f9f9f9', borderRadius: '12px', marginTop: '2rem'}}>
        <hr/>
      <Typography variant='h2' style={{fontSize: '40px', backgroundColor: 'white', color: 'black',
         textAlign: 'center', fontFamily: "serif"}}>About</Typography>
         <hr/>
       <p style={{fontSize: '1.1rem', lineHeight: '1.6', fontWeight: 'normal', textAlign: 'center'}}>
        Blog App — your space to discover stories, share ideas, and connect with a community of writers and readers. <br/>
       Whether you're here to blog about your passion, follow your favorite topics, or simply explore something new, <br/>
       our platform makes it easy and enjoyable.
       </p>
    </div> 
    
    )}
    </div>
  )
}

export default Home
