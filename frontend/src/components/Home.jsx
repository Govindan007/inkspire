import React from 'react';
import { Button, Typography, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LockIcon from '@mui/icons-material/Lock';


const Home = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div style={{
        padding: '60px 20px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: 1000,
          textAlign: 'center',
          backgroundColor: '#fff',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)'
        }}>
          <Typography variant="h4" style={{ fontWeight: 700, fontFamily: 'Work Sans' }}>
            Welcome to <span style={{ color: '#000' }}>Inkspire</span>
          </Typography>
          <Typography style={{ marginTop: 10, color: '#666', fontSize: '18px' }}>
            Where thoughts turn into words and words inspire the world.
          </Typography>

          <div style={{ marginTop: 30 }}>
            <Link to="/l">
              <Button variant="contained" sx={{ marginRight: 2, paddingX: 3, textTransform: 'none' }}>
                Login to Explore
              </Button>
            </Link>
            <Link to="/s">
              <Button variant="outlined" sx={{ paddingX: 3, textTransform: 'none' }}>
                Join Inkspire
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Why Inkspire Section */}
      <div style={{ padding: '30px 20px', textAlign: 'center' }}>
        <Typography variant="h5" style={{ fontWeight: 600, fontFamily: 'Work Sans', marginBottom: 30 }}>
          Why Inkspire?
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={1} style={{ borderRadius: 12 }}>
              <CardContent>
                <CreateIcon style={{ fontSize: 32, marginBottom: 10 }} />
                <Typography variant="subtitle1" fontWeight={600}>Write and publish your thoughts easily</Typography>
                <Typography variant="body2" color="textSecondary">
                  Share your ideas with the world effortlessly.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={1} style={{ borderRadius: 12 }}>
              <CardContent>
                <SearchIcon style={{ fontSize: 32, marginBottom: 10 }} />
                <Typography variant="subtitle1" fontWeight={600}>Discover meaningful blogs</Typography>
                <Typography variant="body2" color="textSecondary">
                  Explore a diverse range of insightful content.
                </Typography>
              </CardContent>
            </Card>
          </Grid> 

          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={1} style={{ borderRadius: 12 }}>
              <CardContent>
                <PeopleAltIcon style={{ fontSize: 32, marginBottom: 10 }} />
                <Typography variant="subtitle1" fontWeight={600}>Engage with like-minded readers</Typography>
                <Typography variant="body2" color="textSecondary">
                  Build relationships and interact with other readers.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={1} style={{ borderRadius: 12 }}>
              <CardContent>
                <LockIcon style={{ fontSize: 32, marginBottom: 10 }} />
                <Typography variant="subtitle1" fontWeight={600}>Safe and distraction-free</Typography>
                <Typography variant="body2" color="textSecondary">
                  Focus on your writing without interruptions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: '#f9f9f9', padding: '20px 0', textAlign: 'center', color: '#888', fontSize: 14 }}>
        <div>© 2025 Inkspire. All rights reserved.</div>
      </div>
    </>
  );
};

export default Home;
