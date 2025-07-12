const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  const { title, content, authorId } = req.body;
  const blog = await Blog.create({ title, content, author: authorId });
  res.json(blog);
};

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find().populate("author", "email").sort({ createdAt: -1 });
  res.json(blogs);
};

exports.likeBlog = async (req, res) => {
  const { blogId, userId } = req.body;
  const blog = await Blog.findById(blogId);
  if (!blog.likes.includes(userId)) blog.likes.push(userId);
  else blog.likes.pull(userId);
  await blog.save();
  res.json(blog);
};

exports.reportBlog = async (req, res) => {
  const { blogId, userId } = req.body;
  const blog = await Blog.findById(blogId);
  if (!blog.reports.includes(userId)) blog.reports.push(userId);
  await blog.save();
  res.json(blog);
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndDelete(id);
  res.json({ message: "Deleted" });
};
