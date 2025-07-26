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
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BACKEND = import.meta.env.VITE_BACKEND_LINK;
import { formatDistanceToNow } from 'date-fns';

const Blog = () => {
  const navigate = useNavigate();
  const { id: blogId } = useParams();

  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  const currentUser = JSON.parse(localStorage.getItem('user')) || null;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${BACKEND}/blogs/${blogId}`);
        setBlog(res.data.blog);
        setLikes(res.data.blog.likes?.length || 0);
        setLiked(res.data.blog.likes?.includes(currentUser?._id));
        setComments(res.data.blog.comments || []);
      } catch (err) {
        console.error('Error fetching blog:', err);
      }
    };

    fetchBlog();
  }, [blogId, currentUser?._id]);

  const handleLikeToggle = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${BACKEND}/blogs/${blogId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLiked(!liked);
      setLikes((prev) => (liked ? prev - 1 : prev + 1));
    } catch (err) {
      console.error('Like error:', err);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${BACKEND}/blogs/${blogId}/comments`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments([res.data.comment, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirm = window.confirm('Are you sure you want to delete this comment?');
    if (!confirm) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${BACKEND}/blogs/${blogId}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error('Delete comment error:', err);
    }
  };

  const handleEditComment = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditedContent(content);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedContent('');
  };

  const handleSaveComment = async (commentId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.patch(
        `${BACKEND}/blogs/${blogId}/comments/${commentId}`,
        { content: editedContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(
        comments.map((c) => (c._id === commentId ? { ...c, content: res.data.comment.content } : c))
      );
      setEditingCommentId(null);
      setEditedContent('');
    } catch (err) {
      console.error('Edit comment error:', err);
    }
  };

  const handleEditBlog = () => {
    navigate(`/edit/${blogId}`);
  };

  const handleDeleteBlog = async () => {
    const confirm = window.confirm('Are you sure you want to delete this blog?');
    if (!confirm) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${BACKEND}/blogs/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Blog deleted!');
      navigate('/');
    } catch (err) {
      console.error('Delete blog error:', err);
    }
  };

  if (!blog) {
    return <Typography sx={{ pt: 12, textAlign: 'center' }}>Loading blog...</Typography>;
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <Navbar2 />
      <Box sx={{ maxWidth: '900px', mx: 'auto', px: 2, pt: '100px' }}>
        {blog.coverImage && (
          <img
            src={`${BACKEND}/uploads/${blog.coverImage}`}
            alt={blog.title}
            style={{ width: '100%', borderRadius: '12px', marginBottom: 30 }}
          />
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" fontWeight={700}>{blog.title}</Typography>
          {currentUser?._id === blog.user?._id && (
            <Box>
              <IconButton onClick={handleEditBlog}><EditIcon /></IconButton>
              <IconButton onClick={handleDeleteBlog} color="error"><DeleteIcon /></IconButton>
            </Box>
          )}
        </Box>

        <Typography sx={{ color: '#555', mb: 3 }}>
          By <b>{blog.user?.username || 'Anonymous'}</b>
        </Typography>

        <Typography paragraph>{blog.content}</Typography>

        <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {blog.tags?.map((tag) => (
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

        {comments.map((c) => (
          <Box key={c._id} sx={{ display: 'flex', mb: 3 }}>
            <Avatar sx={{ mr: 2 }}>{c.user?.username?.charAt(0) || 'U'}</Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography fontWeight={500}>{c.user?.username || 'User'}</Typography>
              <Typography fontSize={12} color="gray">
                {formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}
              </Typography>

              {editingCommentId === c._id ? (
                <>
                  <TextField
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    fullWidth
                    size="small"
                    sx={{ mt: 1 }}
                  />
                  <Box sx={{ mt: 1 }}>
                    <IconButton onClick={() => handleSaveComment(c._id)}><SaveIcon /></IconButton>
                    <IconButton onClick={handleCancelEdit}><CancelIcon /></IconButton>
                  </Box>
                </>
              ) : (
                <Typography mt={1}>{c.content}</Typography>
              )}
            </Box>

            {c.user?._id === currentUser?._id && (
              <Box>
                <IconButton onClick={() => handleEditComment(c._id, c.content)}><EditIcon fontSize="small" /></IconButton>
                <IconButton onClick={() => handleDeleteComment(c._id)} color="error">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Box>
        ))}
      </Box>

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
