require("dotenv").config();
const mongoose = require("mongoose");
<<<<<<< HEAD

const url = process.env.mongodb_url;
console.log("Connecting to MongoDB URL:", url); // 👈 Add this

mongoose.connect(url)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });
=======
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ DB Connection Error:", err));
>>>>>>> 1d59e6172d2f0b7a080d4d82aba4226bd1c2626a
