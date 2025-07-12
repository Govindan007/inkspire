import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Avatar,
  Divider,
  TextField,
  IconButton,
} from '@mui/material';
import Navbar2 from './Navbar2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const navigate = useNavigate();
  const blogId = 'blog-123'; // Replace with real ID

  // Simulated logged-in user
  const currentUser = { id: 'user123', name: 'Ethan Carter' };

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      name: 'Ethan Carter',
      userId: 'user123',
      content: 'Great blog!',
      date: '2 days ago',
    },
  ]);
  const [newComment, setNewComment] = useState('');

  // 🧠 Load like state from localStorage
  useEffect(() => {
    const likeData = JSON.parse(localStorage.getItem(`like-${blogId}`));
    if (likeData) {
      setLikes(likeData.count || 0);
      setLiked(likeData.likedBy?.includes(currentUser.id) || false);
    } else {
      setLikes(25); // default
    }
  }, []);

  // ❤️ Like Toggle and persist to localStorage
  const handleLikeToggle = () => {
    let updatedLikes = liked ? likes - 1 : likes + 1;
    let likedBy = JSON.parse(localStorage.getItem(`like-${blogId}`))?.likedBy || [];

    if (liked) {
      likedBy = likedBy.filter((id) => id !== currentUser.id);
    } else {
      likedBy.push(currentUser.id);
    }

    setLiked(!liked);
    setLikes(updatedLikes);
    localStorage.setItem(`like-${blogId}`, JSON.stringify({ count: updatedLikes, likedBy }));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      name: currentUser.name,
      userId: currentUser.id,
      content: newComment,
      date: 'Just now',
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleDeleteComment = (id) => {
    if (window.confirm('Delete this comment?')) {
      setComments(comments.filter((c) => c.id !== id));
    }
  };

  const handleEditBlog = () => {
    navigate('/a');
  };

  const handleDeleteBlog = () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      alert('Blog deleted!');
      navigate('/');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
      <Navbar2 />
      <Box sx={{ maxWidth: '900px', mx: 'auto', px: 2, pt: '100px', flex: 1 }}>
        {/* Blog Content */}
        <img
          src="Blogcover.jpg"
          alt="cover"
          style={{ width: '100%', borderRadius: '12px', marginBottom: 30 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" fontWeight={700}>The Future of Work</Typography>
          <Box>
            <IconButton onClick={handleEditBlog}><EditIcon /></IconButton>
            <IconButton onClick={handleDeleteBlog} color="error"><DeleteIcon /></IconButton>
          </Box>
        </Box>
        <Typography sx={{ color: '#555', mb: 3 }}>
          By <b>Sophia Bennett</b> · January 15, 2024
        </Typography>

        <Typography paragraph>Remote collaboration is the future...</Typography>

        {/* Tags */}
        <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {['Remote Work', 'Collaboration'].map((tag) => (
            <Button
              key={tag}
              sx={{
                backgroundColor: '#F2F4F8',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#e0e5ec' },
              }}
            >
              {tag}
            </Button>
          ))}
        </Box>

        {/* Like and Comment Count */}
        <Box sx={{ mt: 3, display: 'flex', gap: 3, alignItems: 'center' }}>
          <Button
            onClick={handleLikeToggle}
            startIcon={liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          >
            {likes}
          </Button>
          <Typography fontSize={14}>💬 {comments.length}</Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Comment Box */}
        <Typography variant="h6" fontWeight={600}>Leave a Comment</Typography>
        <Box sx={{ display: 'flex', mb: 3 }}>
          <TextField
            fullWidth
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
            sx={{ mr: 2 }}
          />
          <Button variant="contained" onClick={handleAddComment}>Add</Button>
        </Box>

        {/* Comments */}
        {comments.map((c) => (
          <Box key={c.id} sx={{ display: 'flex', mb: 3 }}>
            <Avatar sx={{ mr: 2 }}>{c.name.charAt(0)}</Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography fontWeight={500}>{c.name}</Typography>
              <Typography fontSize={12} color="gray">{c.date}</Typography>
              <Typography mt={1}>{c.content}</Typography>
            </Box>
            {c.userId === currentUser.id && (
              <IconButton onClick={() => handleDeleteComment(c.id)} color="error">
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        ))}
      </Box>

      {/* ✅ Fixed Footer */}
      <Box
        component="footer"
        sx={{
          mt: 'auto',
          textAlign: 'center',
          py: 2,
          fontSize: 13,
          backgroundColor: '#f5f5f5',
          color: '#666',
        }}
      >
        © 2025 Inkspire. All rights reserved.
      </Box>
    </Box>
  );
};

export default Blog;
