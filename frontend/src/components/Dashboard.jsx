import React from 'react';
import Navbar2 from './Navbar2';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <>
      <Navbar2 />
      <div style={{ paddingTop: '80px' }}> {/* Push content below fixed navbar */}

        {/* Search Bar */}
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <input
            type="text"
            placeholder="Search for blogs"
            style={{
              padding: '12px 20px',
              width: '80%',
              border: '1px solid #ccc',
              borderRadius: '12px',
              fontSize: '16px',
              backgroundColor: '#E8EDF5'
            }}
          />
        </div>

        {/* Filter Buttons */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          {['Technology', 'Travel', 'Food', 'Lifestyle', 'Health'].map((label) => (
            <button
              key={label}
              style={{
                margin: '5px',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: '#E8EDF5',
                cursor: 'pointer',
                color: 'Black'
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Blog List */}
        <div style={{ width: '85%', maxWidth: '1000px', margin: 'auto' }}>
          {[
            {
              title: 'The Future of AI in Everyday Life',
              author: 'Alex Turner',
              image: 'blog1.jpg',
            },
            {
              title: 'Exploring the Hidden Gems of Southeast Asia',
              author: 'Sarah Chen',
              image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
            },
            {
              title: 'Mastering the Art of Italian Cooking',
              author: 'Marco Rossi',
              image: 'Blog 3.jpg',
            },
            {
              title: 'The Ultimate Guide to Sustainable Living',
              author: 'Emily Green',
              image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
            },
          ].map((blog, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '30px',
                alignItems: 'center'
              }}
            >
              <div>
                <h3 style={{ margin: 0 }}>{blog.title}</h3>
                <p style={{ margin: '5px 0 15px', color: '#555' }}>By {blog.author}</p>
                {idx === 0 ? (
                  <Link to="/b" style={{ textDecoration: 'none' }}>
                    <button
                      style={{
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '6px',
                        backgroundColor: '#E8EDF5',
                        cursor: 'pointer',
                        color: 'black'
                      }}
                    >
                      Read More
                    </button>
                  </Link>
                ) : (
                  <button
                    style={{
                      padding: '8px 16px',
                      border: 'none',
                      borderRadius: '6px',
                      backgroundColor: '#E8EDF5',
                      cursor: 'pointer',
                      color: 'black'
                    }}
                  >
                    Read More
                  </button>
                )}
              </div>
              <img
                src={blog.image}
                alt={blog.title}
                style={{
                  width: '200px',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '10px'
                }}
              />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <span style={{ margin: '0 10px', cursor: 'pointer' }}>&#x276E;</span>
          {[1, 2, 3, '...', 10].map((pg, i) => (
            <span
              key={i}
              style={{
                margin: '0 5px',
                fontWeight: pg === 1 ? 'bold' : 'normal',
                cursor: pg !== '...' ? 'pointer' : 'default',
              }}
            >
              {pg}
            </span>
          ))}
          <span style={{ margin: '0 10px', cursor: 'pointer' }}>&#x276F;</span>
        </div>

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
