import React from 'react';

const dummyBlogs = [
  { title: "Why MERN Stack is Popular", author: "Ethan Harper" },
  { title: "Understanding React Hooks", author: "Olivia Bennett" },
  { title: "Secure Node.js APIs", author: "Noah Carter" }
];

const BlogTable = () => {
  return (
    <div style={{ border: '1px solid #cbd5e1', borderRadius: '10px', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f1f5f9' }}>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Author</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyBlogs.map((blog, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={tdStyle}>{blog.title}</td>
              <td style={tdStyle}>{blog.author}</td>
              <td style={tdStyle}>
                <button style={deleteButton}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = { padding: '15px', textAlign: 'left', fontWeight: '600', color: '#334155' };
const tdStyle = { padding: '15px', color: '#334155' };
const deleteButton = {
  border: 'none',
  background: 'none',
  color: '#1d4ed8',
  fontWeight: '600',
  cursor: 'pointer'
};

export default BlogTable;
