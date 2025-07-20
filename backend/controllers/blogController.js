const Blog = require('../models/Blog');

// @desc    Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { title, category, tags, content, description } = req.body;
    const userId = req.user._id || req.user.id;

    console.log('📥 Incoming request body:', req.body);
    console.log('🖼️ Uploaded file:', req.file); // log image details

    // Step 1: Validate required fields
    if (!title || !category || !content || !description) {
      return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

    // Step 2: Check if image is missing
    if (!req.file) {
      return res.status(400).json({ error: 'Cover image is required.' });
    }

    // Step 3: Create blog
    const blog = new Blog({
      title,
      category,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      content,
      description,
      user: userId,
      coverImage: req.file.filename
    });

    await blog.save();
    console.log('✅ Blog saved:', blog);
    res.status(201).json({ message: 'Blog created successfully!', blog });
  } catch (error) {
    console.error('❌ Error creating blog:', error);
    res.status(500).json({ error: 'Server error. Failed to create blog.' });
  }
};


// @desc    Get all blogs (optionally filter by user)
exports.getAllBlogs = async (req, res) => {
  try {
    const filter = {};

    // Check if user filtering is requested via query param
    if (req.query.user) {
      filter.user = req.query.user;
    }

    const blogs = await Blog.find(filter)
      .populate('user', 'email username')
      .sort({ createdAt: -1 });

    res.status(200).json({ blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Server error. Failed to fetch blogs.' });
  }
};
// @desc    Get single blog by ID (with comments populated)
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('user', 'email username')
      .populate('comments.user', 'username _id');

    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    res.status(200).json({ blog });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ error: 'Server error. Failed to fetch blog.' });
  }
};

// @desc    Update a blog
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    if (blog.user.toString() !== (req.user._id || req.user.id)) {
      return res.status(403).json({ error: 'Unauthorized to edit this blog' });
    }

    const { title, category, tags, content, description } = req.body;

    blog.title = title || blog.title;
    blog.category = category || blog.category;
    blog.tags = tags ? tags.split(',').map(tag => tag.trim()) : blog.tags;
    blog.content = content || blog.content;
    blog.description = description || blog.description;
    blog.coverImage = req.file ? req.file.filename : blog.coverImage;

    const updatedBlog = await blog.save();
    res.status(200).json({ message: 'Blog updated', blog: updatedBlog });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ error: 'Server error. Failed to update blog.' });
  }
};

// @desc    Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    if (blog.user.toString() !== (req.user._id || req.user.id)) {
      return res.status(403).json({ error: 'Unauthorized to delete this blog' });
    }

    await blog.deleteOne();
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ error: 'Server error. Failed to delete blog.' });
  }
};

// @desc    Like / Unlike a blog
exports.toggleLike = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    const userId = req.user._id || req.user.id;
    const index = blog.likes.indexOf(userId);

    if (index === -1) {
      blog.likes.push(userId);
    } else {
      blog.likes.splice(index, 1);
    }

    await blog.save();
    res.status(200).json({ message: 'Like status toggled', likes: blog.likes.length });
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ error: 'Server error. Failed to toggle like.' });
  }
};

// @desc    Add a comment to a blog
exports.addComment = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { content } = req.body;
    const userId = req.user._id || req.user.id;

    if (!content) {
      return res.status(400).json({ error: 'Comment content is required.' });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ error: 'Blog not found.' });

    const comment = {
      user: userId,
      content,
      createdAt: new Date(),
    };

    blog.comments.unshift(comment);
    await blog.save();

    const updatedBlog = await Blog.findById(blogId).populate('comments.user', 'username _id');
    const newComment = updatedBlog.comments[0];

    res.status(201).json({ message: 'Comment added successfully.', comment: newComment });
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ error: 'Server error while adding comment.' });
  }
};

// @desc    Edit a comment
exports.editComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    const commentId = req.params.commentId;
    const { content } = req.body;
    const userId = req.user._id || req.user.id;

    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    const comment = blog.comments.id(commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    if (comment.user.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized to edit this comment' });
    }

    comment.content = content || comment.content;
    await blog.save();

    res.status(200).json({ message: 'Comment updated', comment });
  } catch (err) {
    console.error('Error editing comment:', err);
    res.status(500).json({ error: 'Server error while editing comment.' });
  }
};

// @desc    Delete a comment
// ✅ Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    const commentId = req.params.commentId;
    const userId = req.user._id || req.user.id;

    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    const comment = blog.comments.id(commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized to delete this comment' });
    }

    // ✅ Proper way to remove embedded subdocument
    blog.comments.pull(commentId); // 👈 replaces comment.remove()
    await blog.save();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    console.error('Error deleting comment:', err);
    res.status(500).json({ error: 'Server error while deleting comment.' });
  }
};

