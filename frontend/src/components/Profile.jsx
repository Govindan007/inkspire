import React, { useEffect, useState } from 'react';
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
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]); // Replace with fetched posts if needed

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/l");
    }
  }, [navigate]);

  const handleEdit = (post) => {
    navigate('/a', { state: post });
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) return;
    setPosts(posts.filter((p) => p._id !== id));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/l');
  };

  return (
    <>
      <Navbar2 />
      <Box sx={{ maxWidth: 1000, mx: 'auto', pt: '100px', px: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Avatar
            src="/mathew.jpg"
            alt="User Avatar"
            sx={{ width: 100, height: 100, mx: 'auto', mb: 1 }}
          />
          <Typography variant="h5" fontWeight="bold">
            Welcome!
          </Typography>
          <Typography color="text.secondary">{user?.email}</Typography>
        </Box>

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Your Posts
        </Typography>

        {posts.map((post) => (
          <Card key={post._id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, borderRadius: 3, p: 2, boxShadow: 2 }}>
            <Box>
              <Typography fontWeight="bold">{post.title}</Typography>
              <Typography variant="body2" color="text.secondary">{post.description}</Typography>
              <Stack direction="row" spacing={1} mt={2}>
                <Button variant="outlined" startIcon={<EditIcon />} onClick={() => handleEdit(post)}>
                  Edit
                </Button>
                <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(post._id)}>
                  Delete
                </Button>
              </Stack>
            </Box>
            <CardMedia component="img" height="120" image={post.image} alt={post.title} sx={{ width: 180, ml: 2, borderRadius: 2 }} />
          </Card>
        ))}

        <Box textAlign="center" mt={4}>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
