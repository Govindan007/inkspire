const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
  const { content, userId, blogId } = req.body;
  const comment = await Comment.create({ content, user: userId, blog: blogId });
  res.json(comment);
};

exports.deleteComment = async (req, res) => {
  const { id, userId } = req.params;
  const comment = await Comment.findById(id);
  if (comment.user.toString() !== userId) return res.status(403).json({ message: "Not allowed" });

  await Comment.findByIdAndDelete(id);
  res.json({ message: "Comment deleted" });
};
