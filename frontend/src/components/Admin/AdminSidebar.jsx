import React from 'react';
import { Home, Users, FileText } from 'lucide-react';

const AdminSidebar = ({ setTab, activeTab }) => {
  return (
    <div style={{
      width: '220px',
      backgroundColor: '#fff',
      padding: '30px 20px',
      borderRight: '1px solid #e2e8f0'
    }}>
      <h3 style={{ fontWeight: '700', fontSize: '20px', marginBottom: '30px' }}>Admin Panel</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <SidebarItem icon={<Home size={18} />} text="Dashboard" active={true} />
        <SidebarItem icon={<Users size={18} />} text="Users" onClick={() => setTab('users')} active={activeTab === 'users'} />
        <SidebarItem icon={<FileText size={18} />} text="Blogs" onClick={() => setTab('blogs')} active={activeTab === 'blogs'} />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, onClick, active }) => (
  <div
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      padding: '10px',
      borderRadius: '8px',
      backgroundColor: active ? '#e0e7ff' : 'transparent',
      fontWeight: active ? '600' : '500',
      color: active ? '#1d4ed8' : '#334155'
    }}
  >
    {icon}
    {text}
  </div>
);

export default AdminSidebar;
