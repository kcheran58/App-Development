const express = require('express');
const router = express.Router();
const { upload, createPost, getAllPosts, getPostById, updatePost, deletePost, filterPosts } = require('../controllers/PostsController');

router.post('/', upload.single('postImg'), createPost);

router.get('/', getAllPosts);

router.get('/:postId', getPostById);

router.put('/:postId', upload.single('postImg'), updatePost);

router.delete('/:postId', deletePost);

router.get('/post/filter', filterPosts);

module.exports = router;
