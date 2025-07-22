import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import UsersTable from './UsersTable';
import BlogTable from './BlogTable';

const AdminDashboard = () => {
  const [tab, setTab] = useState('users');
  const navigate = useNavigate();

  // ✅ Protect route: Only allow admin
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      alert('Access denied. Admins only.');
      navigate('/');
    }
  }, [navigate]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <AdminSidebar setTab={setTab} activeTab={tab} />
      <div style={{ flex: 1, padding: '40px' }}>
        <h2 style={{ fontSize: '30px', fontWeight: '700', marginBottom: '20px' }}>Admin Dashboard</h2>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <button
            onClick={() => setTab('users')}
            style={{
              border: 'none',
              background: 'none',
              fontWeight: tab === 'users' ? '700' : '500',
              color: tab === 'users' ? '#1d4ed8' : '#555',
              borderBottom: tab === 'users' ? '2px solid #1d4ed8' : 'none',
              paddingBottom: '5px',
              cursor: 'pointer'
            }}
          >
            Users
          </button>
          <button
            onClick={() => setTab('blogs')}
            style={{
              border: 'none',
              background: 'none',
              fontWeight: tab === 'blogs' ? '700' : '500',
              color: tab === 'blogs' ? '#1d4ed8' : '#555',
              borderBottom: tab === 'blogs' ? '2px solid #1d4ed8' : 'none',
              paddingBottom: '5px',
              cursor: 'pointer'
            }}
          >
            Blogs
          </button>
        </div>

        {tab === 'users' ? <UsersTable /> : <BlogTable />}
      </div>
    </div>
  );
};

export default AdminDashboard;
