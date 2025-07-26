import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BACKEND = import.meta.env.VITE_BACKEND_LINK;

const BlogTable = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await axios.get(`${BACKEND}/admin/blogs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(res.data.blogs);
    } catch (err) {
      console.error('❌ Failed to fetch blogs:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const confirm = window.confirm('Are you sure you want to delete this blog?');
    if (!confirm) return;

    try {
      await axios.delete(`${BACKEND}/admin/blogs/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogId));
    } catch (err) {
      alert('❌ Failed to delete blog: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <table>
      <thead>
        <tr><th>Title</th><th>Author</th><th>Action</th></tr>
      </thead>
      <tbody>
        {blogs.map(blog => (
          <tr key={blog._id}>
            <td>{blog.title}</td>
            <td>{blog.user?.username || 'Unknown'}</td>
            <td>
              <button onClick={() => handleDelete(blog._id)} style={{ color: 'red' }}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlogTable;
