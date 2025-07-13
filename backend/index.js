const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/authRoutes")); // signup & login routes

app.get("/", (req, res) => {
  res.send("✅ Inkspire Backend Running");
});

app.listen(3004, () => {
  console.log("🚀 Server running at http://localhost:3004");
});
