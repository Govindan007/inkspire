const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ DB Connection Error:", err));

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));