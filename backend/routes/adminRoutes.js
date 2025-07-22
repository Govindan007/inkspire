const express = require("express");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/auth");
const { adminLogin } = require("../controllers/adminController");
const User = require("../models/User");
const Blog = require("../models/Blog");

// ✅ Admin Login
router.post("/login", adminLogin);

// ✅ Get all users
router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// ✅ Get all blogs
router.get("/blogs", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.find().populate("user", "username");
    res.json({ blogs });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ message: "Error fetching blogs" });
  }
});

// ✅ Delete a blog
router.delete('/blogs/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error("Error deleting blog:", err.message);
    res.status(500).json({ message: 'Error deleting blog' });
  }
});

// ✅ Delete a user (admin can't delete themselves)
// ✅ Delete a user and all their blogs (admin can't delete themselves)
router.delete("/users/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const userIdToDelete = req.params.id;

    // Prevent admin from deleting their own account
    if (req.user._id.toString() === userIdToDelete) {
      return res.status(403).json({ message: "Admins cannot delete their own account." });
    }

    // Delete all blogs by this user
    await Blog.deleteMany({ user: userIdToDelete });

    // Delete the user
    const deletedUser = await User.findByIdAndDelete(userIdToDelete);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User and associated blogs deleted successfully" });
  } catch (err) {
    console.error("Error deleting user and blogs:", err.message);
    res.status(500).json({ message: "Error deleting user and blogs" });
  }
});


module.exports = router;
