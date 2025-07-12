import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Card,
  CardMedia,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar2 from './Navbar2';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  // Sample blog post data
  const [posts, setPosts] = useState([
    {
      _id: '1',
      title: 'The Future of Sustainable Living',
      description:
        'Exploring eco-friendly practices and technologies that are shaping a greener tomorrow.',
      image: 'blog1.jpg', // Replace with your actual image path
    },
    {
      _id: '2',
      title: 'Mastering the Art of Digital Photography',
      description:
        'Tips and techniques for capturing stunning images with your digital camera, from composition to post-processing.',
      image: 'Blog 3.jpg', // Replace with your actual image path
    },
    {
      _id: '3',
      title: 'The Ultimate Guide to Home Brewing',
      description:
        'Learn the basics of brewing your own beer at home, from selecting ingredients to bottling your final product.',
      image: 'Blog1.jpg', // Replace with your actual image path
    },
  ]);

  const handleEdit = (post) => {
    navigate('/a', { state: post });
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this post?');
    if (!confirm) return;

    try {
      // Replace with your actual backend endpoint
      // await axios.delete(`http://localhost:3004/blogs/${id}`);
      setPosts(posts.filter((post) => post._id !== id)); // Remove from UI
      alert('Post deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete post');
    }
  };

  return (
    <>
      <Navbar2 />

      <Box sx={{ maxWidth: 1000, mx: 'auto', pt: '100px', px: 3 }}>
        {/* Profile Header */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Avatar
            src="mathew.jpg" // ✅ Your local or online image path
            alt="Mathew Joseph"
            sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
          />
          <Typography variant="h5" fontWeight="bold">
            Mathew Joseph
          </Typography>
          <Typography color="text.secondary">mathewjoseph3831v@gmail.com</Typography>
        </Box>

        {/* Post List */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Your Posts
        </Typography>

        {posts.map((post) => (
          <Card
            key={post._id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 3,
              boxShadow: 2,
              borderRadius: 3,
              p: 2,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                {post.description}
              </Typography>

              <Stack direction="row" spacing={1} mt={2}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => handleEdit(post)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </Button>
              </Stack>
            </Box>

            <CardMedia
              component="img"
              height="120"
              image={post.image}
              alt={post.title}
              sx={{
                width: 180,
                borderRadius: 2,
                ml: 2,
                objectFit: 'cover',
              }}
            />
          </Card>
        ))}

        {/* Logout Button */}
        <Box textAlign="center" mt={4}>
          <Button variant="contained" color="secondary">
            Logout
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
