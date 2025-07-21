const jwt = require('jsonwebtoken');
require('dotenv').config();

// ✅ Auth middleware for all users
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      _id: decoded._id || decoded.id,
      email: decoded.email,
      role: decoded.role || 'user'
    };

    next();
  } catch (err) {
    console.error('❌ JWT Verification failed:', err.message);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

// ✅ Admin-only middleware
const adminMiddleware = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
