import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Blog from './components/Blog';
import AddBlog from './components/AddBlog';
import Profile from './components/Profile';
import AdminDashboard from './components/Admin/AdminDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/l" element={<Login />} />
      <Route path="/s" element={<Signup />} />
      <Route path="/d" element={<Dashboard />} />
      <Route path="/b/:id" element={<Blog />} />
      <Route path="/a" element={<AddBlog />} />
      <Route path="/profile" element={<Profile />} />
      {/* Optional: Enable if using @username routing */}
      {/* <Route path="/@:username" element={<Profile />} /> */}
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
