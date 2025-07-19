const express = require("express");
const router = express.Router();
const { addComment, deleteComment } = require("../controllers/commentController");

router.post("/", addComment);
router.delete("/:id/:userId", deleteComment);

module.exports = router;
