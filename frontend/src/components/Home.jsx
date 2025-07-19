import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Zoom,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LockIcon from '@mui/icons-material/Lock';

const features = [
  {
    title: 'Write Freely',
    description: 'Express your thoughts and publish with ease.',
    icon: <CreateIcon sx={{ fontSize: 40, color: '#ff7043' }} />,
  },
  {
    title: 'Discover Blogs',
    description: 'Explore meaningful and inspiring blogs.',
    icon: <SearchIcon sx={{ fontSize: 40, color: '#42a5f5' }} />,
  },
  {
    title: 'Connect & Engage',
    description: 'Build a community with like-minded readers.',
    icon: <PeopleAltIcon sx={{ fontSize: 40, color: '#66bb6a' }} />,
  },
  {
    title: 'Safe Platform',
    description: 'Your data and content are protected.',
    icon: <LockIcon sx={{ fontSize: 40, color: '#ab47bc' }} />,
  },
];

const Home = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 3,
          textAlign: 'center',
          background:
            'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
        }}
      >
        <Box maxWidth="800px">
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Welcome to <span style={{ color: '#3f51b5' }}>Inkspire</span>
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Where thoughts become words, and words inspire the world.
          </Typography>

          <Box mt={4}>
            <Link to="/l">
              <Button
                variant="contained"
                sx={{
                  mr: 2,
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: 'none',
                  backgroundColor: '#3f51b5',
                  '&:hover': { backgroundColor: '#303f9f' },
                }}
              >
                Login to Explore
              </Button>
            </Link>
            <Link to="/s">
              <Button
                variant="outlined"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: 'none',
                  color: '#3f51b5',
                  borderColor: '#3f51b5',
                  '&:hover': {
                    backgroundColor: '#e8eaf6',
                  },
                }}
              >
                Join Inkspire
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>

      {/* Why Inkspire Section */}
      <Box sx={{ py: 8, backgroundColor: '#fafafa', px: 4 }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={600}
          mb={6}
        >
          Why Choose Inkspire?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Zoom in style={{ transitionDelay: `${index * 100}ms` }}>
                <Card
                  elevation={3}
                  sx={{
                    borderRadius: 4,
                    textAlign: 'center',
                    transition: '0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    {item.icon}
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      mt={2}
                      gutterBottom
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: 3,
          textAlign: 'center',
          fontSize: 14,
          backgroundColor: '#212121',
          color: '#ccc',
        }}
      >
        © {new Date().getFullYear()} Inkspire · All rights reserved.
      </Box>
    </>
  );
};

export default Home;
