import React from 'react';
import { Box, Typography, Button, Avatar, Divider } from '@mui/material';
import Navbar2 from './Navbar2';

const Blog = () => {
  return (
    <>
      <Navbar2 />

      {/* Container with padding top instead of marginTop */}
      <Box
        sx={{
          maxWidth: '900px',
          mx: 'auto',
          px: 2,
          pt: '100px', // Push content below fixed navbar (safe space)
          backgroundColor: '#fff', // Fix black gap if it's due to background
        }}
      >
        {/* Blog Image */}
        <img
          src="Blogcover.jpg"
          alt="Blog Cover"
          style={{
            width: '100%',
            borderRadius: '12px',
            marginBottom: '30px'
          }}
        />

        {/* Title & Author */}
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          The Future of Work: Embracing Remote Collaboration
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: '#555' }}>
          By <span style={{ color: '#3f51b5', fontWeight: 500 }}>Sophia Bennett</span> · Published on <span>January 15, 2024</span>
        </Typography>

        {/* Blog Content */}
        <Typography paragraph>
          The modern workplace is undergoing a significant transformation, driven by advancements in technology and a shift in societal expectations. Remote collaboration...
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, fontWeight: 600 }}>
          Benefits of Remote Collaboration
        </Typography>
        <Typography paragraph>
          - Enhanced Flexibility: Remote work offers employees the flexibility to manage their schedules...
        </Typography>
        <Typography paragraph>
          - Increased Productivity: Studies show remote workers often experience higher productivity...
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, fontWeight: 600 }}>
          Challenges of Remote Collaboration
        </Typography>
        <Typography paragraph>
          - Communication Barriers, Isolation, Technical Issues, and more...
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, fontWeight: 600 }}>
          Best Practices for Effective Remote Collaboration
        </Typography>
        <Typography paragraph>
          - Establish Clear Communication Channels: Use tools like Zoom, Teams...
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, fontWeight: 600 }}>
          Conclusion
        </Typography>
        <Typography paragraph>
          Remote collaboration is not just a trend; it's the future of work...
        </Typography>

        {/* Tags */}
        <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {['Remote Work', 'Collaboration', 'Future of Work'].map((tag) => (
            <Button
              key={tag}
              size="small"
              sx={{
                backgroundColor: '#F2F4F8',
                textTransform: 'none',
                fontWeight: 500
              }}
            >
              {tag}
            </Button>
          ))}
        </Box>

        {/* Like & Comment Count */}
        <Box sx={{ mt: 3, display: 'flex', gap: 4, alignItems: 'center' }}>
          <Typography sx={{ fontSize: 14, color: '#777' }}>💖 25</Typography>
          <Typography sx={{ fontSize: 14, color: '#777' }}>💬 12</Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Comments */}
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Comments
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ width: 32, height: 32, mr: 2 }}>E</Avatar>
          <Box>
            <Typography sx={{ fontWeight: 500 }}>Ethan Carter</Typography>
            <Typography variant="body2" color="text.secondary">
              2 days ago
            </Typography>
            <Typography sx={{ mt: 1 }}>
              Great insights on remote work! Really helpful.
            </Typography>
          </Box>
        </Box>

      </Box>
    </>
  );
};

export default Blog;
