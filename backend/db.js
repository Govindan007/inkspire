const mongoose = require("mongoose");
require("dotenv").config(); // make sure to load .env file

const url = process.env.mongodb_url; // match this with your .env key

mongoose.connect(url)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });
