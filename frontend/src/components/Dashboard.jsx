import React, { useState, useEffect } from 'react';
import Navbar2 from './Navbar2';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BACKEND = import.meta.env.VITE_BACKEND_LINK;

const Dashboard = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${BACKEND}/blogs`);
        setBlogs(res.data.blogs || []);
      } catch (err) {
        console.error('Error fetching blogs:', err.message);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (activeTag === '' || blog.category === activeTag)
  );

  const blogsPerPage = 3;
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const displayedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  return (
    <>
      <Navbar2 />
      <div style={{ paddingTop: '80px', fontFamily: 'Helvetica, Arial, sans-serif' }}>

        {/* 🔍 Search */}
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <input
            type="text"
            placeholder="Search for blogs"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              padding: '12px 20px',
              width: '80%',
              border: '1px solid #ccc',
              borderRadius: '12px',
              fontSize: '16px',
              backgroundColor: '#E8EDF5',
              color: 'black',
              transition: '0.3s ease',
            }}
            onFocus={(e) => e.target.style.boxShadow = '0 0 5px #3f51b5'}
            onBlur={(e) => e.target.style.boxShadow = 'none'}
          />
        </div>

        {/* 🏷️ Tags */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          {['All', 'Technology', 'Travel', 'Food', 'Lifestyle', 'Health', 'Education'].map((label) => (
            <button
              key={label}
              onClick={() => {
                setActiveTag(label === 'All' ? '' : label);
                setCurrentPage(1);
              }}
              style={{
                margin: '5px',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: activeTag === label || (label === 'All' && activeTag === '') ? '#3f51b5' : '#E8EDF5',
                color: activeTag === label || (label === 'All' && activeTag === '') ? '#fff' : 'black',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 📚 Blog List */}
        <div style={{ width: '85%', maxWidth: '1000px', margin: 'auto' }}>
          {displayedBlogs.map((blog, idx) => (
            <div
              key={blog._id || idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '30px',
                alignItems: 'center',
                backgroundColor: '#f8f9fb',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease',
                color: 'black',
              }}
            >
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0 }}>{blog.title}</h3>
                <p style={{ margin: '5px 0 15px', color: '#555' }}>
                  By {blog.user?.username || 'Unknown Author'}
                </p>
                <Link to={`/b/${blog._id}`} style={{ textDecoration: 'none' }}>
                  <button
                    style={{
                      padding: '8px 16px',
                      border: 'none',
                      borderRadius: '6px',
                      backgroundColor: '#3f51b5',
                      color: '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    Read More
                  </button>
                </Link>
              </div>
              {blog.coverImage && (
                <img
                  src={`${BACKEND}/uploads/${blog.coverImage}`}
                  alt={blog.title}
                  style={{
                    width: '200px',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    marginLeft: '20px',
                  }}
                />
              )}
            </div>
          ))}
          {filteredBlogs.length === 0 && (
            <p style={{ textAlign: 'center', color: '#888' }}>No blogs found.</p>
          )}
        </div>

        {/* 📄 Pagination */}
        <div style={{ textAlign: 'center', padding: '20px', color: 'black' }}>
          <span
            style={{ margin: '0 10px', cursor: currentPage > 1 ? 'pointer' : 'not-allowed' }}
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          >
            &#x276E;
          </span>
          {[...Array(totalPages).keys()].map((i) => (
            <span
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                margin: '0 5px',
                fontWeight: currentPage === i + 1 ? 'bold' : 'normal',
                cursor: 'pointer',
              }}
            >
              {i + 1}
            </span>
          ))}
          <span
            style={{ margin: '0 10px', cursor: currentPage < totalPages ? 'pointer' : 'not-allowed' }}
            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
          >
            &#x276F;
          </span>
        </div>

        {/* ➕ Floating Add Blog Button */}
        <button
          onClick={() => navigate('/a')}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            padding: '12px 24px',
            borderRadius: '30px',
            backgroundColor: '#000000ff',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 'bold',
            border: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            cursor: 'pointer',
          }}
        >
          Add Blog
        </button>

        {/* Footer */}
        <div style={{ textAlign: 'center', paddingBottom: '30px', fontSize: '13px', color: '#999' }}>
          ©2025 Inkspire. All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Dashboard;
