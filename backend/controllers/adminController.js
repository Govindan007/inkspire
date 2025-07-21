const jwt = require("jsonwebtoken");
const Blog = require("../models/Blog"); // ✅ correct file name

exports.adminLogin = (req, res) => {
  const { email, password } = req.body;
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
};

exports.getDashboard = (req, res) => {
  res.json({ message: "Welcome to the admin dashboard!" });
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("user", "username email").sort({ createdAt: -1 });
    res.json({ blogs });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ message: "Error fetching blogs" });
  }
};