import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BACKEND = import.meta.env.VITE_BACKEND_LINK;

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(`${BACKEND}/admin/login`, {
        email,
        password,
      });

      const { token, user } = res.data;

      if (!user || user.role !== 'admin') {
        setError('Not authorized as admin');
        return;
      }

      localStorage.setItem('token', token);
      console.log("Saved token:", token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAdmin', 'true');

      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Admin login failed:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>🔐 Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button}>Login</button>

        <p style={styles.footerNote}>
          Only authorized admins can access this panel.
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #1e3a8a, #2563eb)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  form: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
    maxWidth: '400px',
    width: '100%',
  },
  heading: {
    marginBottom: '25px',
    textAlign: 'center',
    fontSize: '24px',
    color: '#1e3a8a',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    fontSize: '16px',
    marginBottom: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: '0.3s ease',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#2563eb',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: '0.3s ease',
  },
  error: {
    color: 'red',
    marginBottom: '12px',
    fontSize: '14px',
    textAlign: 'center',
  },
  footerNote: {
    marginTop: '15px',
    fontSize: '13px',
    textAlign: 'center',
    color: '#6b7280',
  },
};

export default AdminLogin;