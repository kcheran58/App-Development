const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');

// Multer configuration for disk storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'postImages'); // Ensure 'postImages' directory exists
    },
    filename: (req, file, cb) => {
        const userName = req.userName || 'default'; // You may need to extract user's name from request
        cb(null, `${userName}_${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage });

// Create a new post with optional image
const createPost = async (req, res) => {
    try {
        const { author, category, description, content, likes } = req.body;

        // Ensure author is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(author)) {
            return res.status(400).json({ error: 'Invalid author ID format' });
        }

        const post = new Post({ author, category, description, content, likes });

        if (req.file) {
            post.postImg = {
                data: req.file.path, // Path to the image
                contentType: req.file.mimetype // MIME type of the image
            };
        }
      const u=await User.findById(author);
      if(!u)
      {
        return res.status(401).json({message:"author is not present"})
      }
        await post.save();

        // Add the post to the user's posts array
        await User.findByIdAndUpdate(author, { $push: { posts: post._id } });

        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author','fullName userName profileImg country').populate('comments','author content');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a post by ID
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).populate('author','fullName userName profileImg country').populate('comments','author content');
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a post with optional new image
const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).populate('author','fullName userName profileImg country').populate('comments','author content');
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (req.file) {
            // Delete the old post image if it exists
            if (post.postImg && post.postImg.data) {
                const imagePath = path.join(__dirname, '../', post.postImg.data);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            post.postImg = {
                data: req.file.path, // Update with the new file path
                contentType: req.file.mimetype // Update with the new MIME type
            };
        }

        Object.assign(post, req.body);
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a post and its comments
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Delete comments associated with the post
        await Comment.deleteMany({ post: post._id });

        // Remove the post from the user's posts array
        await User.findByIdAndUpdate(post.author, { $pull: { posts: post._id, savedPosts: post._id } });

        // Finally, delete the post
        await Post.deleteOne({ _id: post._id });

        res.json({ message: 'Post and related comments deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Filter posts based on query parameters
const filterPosts = async (req, res) => {
    try {
        const { category, startDate, endDate, author, search } = req.query;
        console.log('Query Parameters:', req.query);

        const filter = {};
        
        if (search) {
            filter.$or = [
                { description: new RegExp(search, 'i') },
                { content: new RegExp(search, 'i') }
            ];
        }
    
        if (category) {
            filter.category = category;
        }
        if (author) {
            if (mongoose.Types.ObjectId.isValid(author)) {
                filter.author = author;
            } else {
                return res.status(400).json({ error: 'Invalid author ID format' });
            }
        }
        
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) {
                filter.createdAt.$gte = new Date(startDate);
            }
            if (endDate) {
                filter.createdAt.$lte = new Date(endDate);
            }
        }

        const posts = await Post.find(filter);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    upload,
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    filterPosts
};
