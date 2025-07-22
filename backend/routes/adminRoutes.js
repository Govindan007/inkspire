const express = require("express");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/auth");
const {
  adminLogin,
  getAllUsers,
  getAllBlogs
} = require("../controllers/adminController");

// Admin Login (public)
router.post("/login", adminLogin);

// Admin protected routes
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.get("/blogs", authMiddleware, adminMiddleware, getAllBlogs);

module.exports = router;