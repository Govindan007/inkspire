// routes/comments.js or blog routes (if nested)
const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.post("/comments", commentController.addComment);
router.delete("/comments/:id/:userId", commentController.deleteComment);

module.exports = router;
