// backend/middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id); // fetch full user
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // attach user object to req
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

exports.adminMiddleware = (req, res, next) => {
  console.log("🛡 Admin check:", req.user?.role);

  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Not authorized as admin" });
  }

  next();
};