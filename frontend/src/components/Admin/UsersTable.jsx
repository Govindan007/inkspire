import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BACKEND = import.meta.env.VITE_BACKEND_LINK;

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [adminId, setAdminId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        // Decode the token to get the admin's ID
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedPayload = JSON.parse(atob(base64));
        setAdminId(decodedPayload.id);

        const res = await axios.get(`${BACKEND}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users);
      } catch (err) {
        console.error('Failed to fetch users:', err.response?.data || err.message);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`${BACKEND}/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      console.error('Failed to delete user:', err.response?.data || err.message);
    }
  };

  return (
    <table>
      <thead>
        <tr><th>Username</th><th>Email</th><th>Action</th></tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.username}</td>
            <td>{user.email} {user.role === 'admin' && 'Admin'}</td>
            <td>
              {user._id === adminId ? (
                <button disabled style={{ background: 'transparent', color: 'gray' }}>
                  Cannot delete self
                </button>
              ) : (
                <button onClick={() => handleDelete(user._id)} style={{ color: 'red', background: 'black' }}>
                  Delete
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
