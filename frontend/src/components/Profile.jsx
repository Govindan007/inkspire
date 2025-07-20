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
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/l"); // Redirect to login
    }
  }, [navigate]);

  // ✅ Fetch user's own blogs from backend
  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:3004/blogs');
        const allBlogs = res.data.blogs;

        const userBlogs = allBlogs.filter(
          (blog) => blog.user._id === user?._id || blog.user === user?._id
        );

        setPosts(userBlogs);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    if (user) fetchUserBlogs();
  }, [user]);

  const handleEdit = (post) => {
    navigate(`/edit/${post._id}`);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3004/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPosts(posts.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
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
          <Typography variant="h5" fontWeight="bold">Welcome!</Typography>
          <Typography color="text.secondary">{user?.email}</Typography>
        </Box>

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Your Posts
        </Typography>

        {posts.length === 0 ? (
          <Typography>No posts found.</Typography>
        ) : (
          posts.map((post) => (
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
              {post.coverImage && (
                <CardMedia
                  component="img"
                  height="120"
                  image={`http://localhost:3004/uploads/${post.coverImage}`}
                  alt={post.title}
                  sx={{ width: 180, ml: 2, borderRadius: 2 }}
                />
              )}
            </Card>
          ))
        )}

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
