import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Blog from './components/Blog';
import AddBlog from './components/AddBlog';
import Profile from './components/Profile';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminLogin from './components/Admin/AdminLogin';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return token && isAdmin ? children : <Navigate to="/admin" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/l" element={<Login />} />
      <Route path="/s" element={<Signup />} />
      <Route path="/d" element={<Dashboard />} />
      <Route path="/b/:id" element={<Blog />} />
      <Route path="/a" element={<AddBlog />} />
      <Route path="/edit/:id" element={<AddBlog />} />
      <Route path="/profile" element={<Profile />} />
      
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin-login" element={<AdminLogin />} />

      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default App;
