import React from 'react';

const dummyUsers = [
  { name: "Ethan Harper", email: "ethan.harper@email.com" },
  { name: "Olivia Bennett", email: "olivia.bennett@email.com" },
  { name: "Noah Carter", email: "noah.carter@email.com" },
  { name: "Ava Morgan", email: "ava.morgan@email.com" },
  { name: "Liam Foster", email: "liam.foster@email.com" }
];

const UsersTable = () => {
  return (
    <div style={{ border: '1px solid #cbd5e1', borderRadius: '10px', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f1f5f9' }}>
            <th style={thStyle}>User</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyUsers.map((user, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={tdStyle}>{user.name}</td>
              <td style={tdStyle}>
                <a href={`mailto:${user.email}`} style={{ color: '#3b82f6' }}>{user.email}</a>
              </td>
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

export default UsersTable;
