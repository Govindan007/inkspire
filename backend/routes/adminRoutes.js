const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const {
  adminLogin,
  getDashboard,
  getAllBlogs
} = require('../controllers/adminController'); // ✅ DESTRUCTURE ALL THREE

// Admin login route
router.post('/login', adminLogin);

// Admin dashboard test route
router.get('/dashboard', authMiddleware, adminMiddleware, getDashboard);

// ✅ Fix: Route.get() crash caused by missing getAllBlogs
router.get('/blogs', authMiddleware, adminMiddleware, getAllBlogs);

module.exports = router;