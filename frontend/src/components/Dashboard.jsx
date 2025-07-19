import React, { useState } from 'react';
import Navbar2 from './Navbar2';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const allBlogs = [
    {
      title: 'The Future of AI in Everyday Life',
      author: 'Alex Turner',
      image: 'blog1.jpg',
      tag: 'Technology',
    },
    {
      title: 'Exploring the Hidden Gems of Southeast Asia',
      author: 'Sarah Chen',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      tag: 'Travel',
    },
    {
      title: 'Mastering the Art of Italian Cooking',
      author: 'Marco Rossi',
      image: 'Blog 3.jpg',
      tag: 'Food',
    },
    {
      title: 'The Ultimate Guide to Sustainable Living',
      author: 'Emily Green',
      image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
      tag: 'Lifestyle',
    },
    {
      title: 'Daily Yoga Habits for Better Health',
      author: 'Aarav Mehta',
      image: 'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0',
      tag: 'Health',
    },
  ];

  const filteredBlogs = allBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (activeTag === '' || blog.tag === activeTag)
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
          {['All', 'Technology', 'Travel', 'Food', 'Lifestyle', 'Health'].map((label) => (
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
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 📚 Blog List */}
        <div style={{ width: '85%', maxWidth: '1000px', margin: 'auto' }}>
          {displayedBlogs.map((blog, idx) => (
            <div
              key={idx}
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
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.015)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0 }}>{blog.title}</h3>
                <p style={{ margin: '5px 0 15px', color: '#555' }}>By {blog.author}</p>
                <Link to="/b" style={{ textDecoration: 'none' }}>
                  <button
                    style={{
                      padding: '8px 16px',
                      border: 'none',
                      borderRadius: '6px',
                      backgroundColor: '#3f51b5',
                      color: '#fff',
                      cursor: 'pointer',
                      transition: '0.3s ease',
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#2c3f91'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#3f51b5'}
                  >
                    Read More
                  </button>
                </Link>
              </div>
              <img
                src={blog.image}
                alt={blog.title}
                style={{
                  width: '200px',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  marginLeft: '20px',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />
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

        {/* ➕ Floating Add Blog Button with Text */}
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
            border: 'none',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, background-color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.backgroundColor = '#2c3f91';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.backgroundColor = '#000000ff';
          }}
        >
          Add Blog
        </button>

        {/* Footer */}
        <div
          style={{
            textAlign: 'center',
            paddingBottom: '30px',
            fontSize: '13px',
            color: '#999'
          }}
        >
          ©2025 Inkspire. All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Dashboard;
