const jwt = require('jsonwebtoken');
require('dotenv').config();

const adminMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.email === process.env.ADMIN_EMAIL) {
      req.user = decoded;
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: Not admin' });
    }
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = adminMiddleware;
