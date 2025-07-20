import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar2 from './Navbar2';

const AddBlog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location.state !== null;

  const [blogData, setBlogData] = useState({
    title: '',
    category: '',
    tags: '',
    content: '',
    description: '',
    coverImage: null
  });

  useEffect(() => {
    if (isEdit) {
      const { title, category, tags, content, description } = location.state;
      setBlogData({
        title: title || '',
        category: category || '',
        tags: tags || '',
        content: content || '',
        description: description || '',
        coverImage: null
      });
    }
  }, [location.state, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setBlogData((prev) => ({ ...prev, coverImage: e.target.files[0] }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', blogData.title);
    formData.append('category', blogData.category);
    formData.append('tags', blogData.tags);
    formData.append('content', blogData.content);
    formData.append('description', blogData.description);
    if (blogData.coverImage) {
      formData.append('coverImage', blogData.coverImage);
    }

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    };

    const baseURL = 'http://localhost:3004/blogs/';
    const endpoint = isEdit ? `${baseURL}${location.state._id}` : baseURL;

    try {
      const response = isEdit
        ? await axios.put(endpoint, formData, config)
        : await axios.post(baseURL, formData, config);

      alert(response.data.message || 'Blog saved successfully!');
      navigate('/'); // or navigate('/dashboard') or your blog list
    } catch (error) {
      console.error('Error submitting blog:', error);
      alert(error.response?.data?.error || 'Error saving blog post.');
    }
  };

  return (
    <>
      <Navbar2 />
      <Box sx={{ maxWidth: 800, mx: 'auto', pt: '100px', px: 2 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {isEdit ? 'Edit Blog Post' : 'Add Blog Post'}
        </Typography>

        <TextField
          fullWidth
          label="Blog Title"
          name="title"
          value={blogData.title}
          onChange={handleChange}
          margin="normal"
          required
        />

        {/* Cover Image Upload */}
        <Box
          sx={{
            border: '2px dashed #ccc',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            my: 2,
          }}
        >
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Upload Cover Image
          </Typography>
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2, backgroundColor: '#E0E0E0', color: '#000' }}
          >
            Upload
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
          {blogData.coverImage && (
            <Typography sx={{ mt: 1 }}>
              {blogData.coverImage.name}
            </Typography>
          )}
        </Box>

        {/* Category Selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Select a category</InputLabel>
          <Select
            name="category"
            value={blogData.category}
            onChange={handleChange}
            input={<OutlinedInput label="Select a category" />}
          >
            <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Education">Education</MenuItem>
            <MenuItem value="Health">Health</MenuItem>
            <MenuItem value="Travel">Travel</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Tags"
          name="tags"
          value={blogData.tags}
          onChange={handleChange}
          placeholder="Enter tags (comma-separated)"
          margin="normal"
        />

        <TextField
          fullWidth
          label="Blog Content"
          name="content"
          value={blogData.content}
          onChange={handleChange}
          multiline
          rows={6}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Short Description"
          name="description"
          value={blogData.description}
          onChange={handleChange}
          placeholder="Enter a short description"
          margin="normal"
        />

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handleSubmit}
        >
          {isEdit ? 'Update Blog' : 'Add Blog'}
        </Button>
      </Box>
    </>
  );
};

export default AddBlog;