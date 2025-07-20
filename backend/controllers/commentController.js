const Comment = require("../models/Comment");

// ✅ Add Comment
exports.addComment = async (req, res) => {
  try {
    const { content, userId, blogId } = req.body;

    if (!content || !userId || !blogId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const comment = await Comment.create({
      content,
      user: userId,
      blog: blogId,
    });

    res.status(201).json({ comment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Delete Comment
exports.deleteComment = async (req, res) => {
  try {
    const { id, userId } = req.params;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user.toString() !== userId) {
      return res.status(403).json({ message: "Not allowed to delete this comment" });
    }

    await Comment.findByIdAndDelete(id);
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Failed to delete comment" });
  }
};
