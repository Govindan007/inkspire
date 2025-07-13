const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db");

const app = express(); // ✅ moved this line to the top before any route usage

app.use(cors());
app.use(express.json());

// ✅ Default route to check if backend is running
app.get('/', (req, res) => {
  res.send('✅ Inkspire Backend Running');
});

// ✅ Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/blogs", require("./routes/blogRoutes"));
app.use("/comments", require("./routes/commentRoutes"));

const PORT = 3004;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
