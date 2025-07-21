const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

// Admin login route
router.post('/login', adminController.adminLogin);

// Admin dashboard (protected)
router.get('/dashboard', authMiddleware, adminMiddleware, adminController.getDashboard);

module.exports = router;
