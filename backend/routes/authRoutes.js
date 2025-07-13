const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController"); // ✅ This should import two functions

router.post("/signup", signup); // ✅ Make sure signup is a function
router.post("/login", login);   // ✅ Make sure login is a function

module.exports = router;
