const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Blog = require("../models/Blog"); // if you have blog schema

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
});

// Delete user
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("User deleted");
  } catch (err) {
    res.status(500).send("Error deleting user");
  }
});

// Get all blogs
router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).send("Error fetching blogs");
  }
});

module.exports = router;
