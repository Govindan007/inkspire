const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const upload = require('../middleware/upload');
const { authMiddleware } = require('../middleware/auth');

// 📌 Create blog (protected)
router.post('/', authMiddleware, upload.single('coverImage'), blogController.createBlog);

// 📌 Get all blogs (public)
router.get('/', blogController.getAllBlogs);

// 📌 Get single blog by ID (public)
router.get('/:id', blogController.getBlogById);

// 📌 Update blog by ID (protected + optional cover image)
router.put('/:id', authMiddleware, upload.single('coverImage'), blogController.updateBlog);

// 📌 Delete blog by ID (only author)
router.delete('/:id', authMiddleware, blogController.deleteBlog);

// 📌 Like / Unlike a blog (toggle)
router.patch('/:id/like', authMiddleware, blogController.toggleLike);

// 📌 Add comment to blog (protected)
router.post('/:id/comments', authMiddleware, blogController.addComment);

// ✏️ Edit comment (protected)
router.patch('/:id/comments/:commentId', authMiddleware, blogController.editComment);

// ❌ Delete comment (protected)
router.delete('/:id/comments/:commentId', authMiddleware, blogController.deleteComment);

module.exports = router;
