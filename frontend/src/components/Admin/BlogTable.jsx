import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogTable = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('No token found in localStorage');
        return;
      }

      try {
        const res = await axios.get('http://localhost:3004/admin/blogs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Blogs:', res.data.blogs);
        setBlogs(res.data.blogs);
      } catch (err) {
        console.error('Failed to fetch blogs:', err.response?.data || err.message);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    if (!window.confirm('Delete this blog?')) return;

    try {
      await axios.delete(`http://localhost:3004/blogs/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(blogs.filter(blog => blog._id !== blogId));
    } catch (err) {
      console.error('Delete blog error:', err.response?.data || err.message);
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