const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const adminRoutes = require("./routes/adminRoutes");


const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Routes
// ✅ Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Routes
app.use("/admin", require("./routes/adminRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/blogs", require("./routes/blogRoutes"));


// ✅ Error handling middleware
app.use((err, req, res, next) => {
  if (err.message === 'Only images are allowed') {
    console.error('❌ Multer error:', err.message);
    return res.status(400).json({ error: err.message });
  }

  console.error('❌ Unexpected server error:', err);
  res.status(500).json({ error: 'Server error' });
});

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ DB Connection Error:", err));

// ✅ Start server
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


