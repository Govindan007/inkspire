require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Blog = require("../models/Blog");

// Admin login
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", email, password);

    const user = await User.findOne({ email });
    console.log("Fetched user:", user);

    if (!user) {
      return res.status(403).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // You can optionally add: if (user.username !== 'admin') return res.status(403).json(...)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    const { password: pwd, ...userData } = user._doc;
    res.json({ message: 'Admin login successful', token, user: userData });

  } catch (err) {
    console.error('Admin login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get all blogs (admin only)
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("user", "username");
    res.json({ blogs });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
};