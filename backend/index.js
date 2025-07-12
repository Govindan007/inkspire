const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));
app.use("/blogs", require("./routes/blogRoutes"));
app.use("/comments", require("./routes/commentRoutes"));

app.listen(3004, () => console.log("🚀 Server running on http://localhost:3004"));
