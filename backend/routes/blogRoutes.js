const express = require("express");
const router = express.Router();
const {
  createBlog, getAllBlogs, likeBlog, reportBlog, deleteBlog
} = require("../controllers/blogController");

router.get("/", getAllBlogs);
router.post("/", createBlog);
router.post("/like", likeBlog);
router.post("/report", reportBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
