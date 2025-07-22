require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.mongodb_url;
console.log("Connecting to MongoDB URL:", url); // 👈 Add this

mongoose.connect(url)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });
