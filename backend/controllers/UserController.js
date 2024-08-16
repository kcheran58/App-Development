const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage });

// Create a new user with optional profile image
const createUser = async (req, res) => {
    try {
        if (req.file) {
            req.body.profileImg = {
                data: req.file.path, 
                contentType: req.file.mimetype 
            };
        }

        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// User login
const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ userName ,password});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password
       

        res.status(200).json( user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get a user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a user with optional new profile image
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (req.file) {
            // Delete the old profile image if it exists
            if (user.profileImg && user.profileImg.data) {
                const imagePath = path.join(__dirname, '../', user.profileImg.data);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            user.profileImg = {
                data: req.file.path, // Update with the new file path
                contentType: req.file.mimetype // Update with the new MIME type
            };
        }

        Object.assign(user, req.body);
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a user and their posts, comments, and profile image
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const posts = await Post.find({ author: user._id });
        const postIds = posts.map(post => post._id);

        for (const post of posts) {
            await Comment.deleteMany({ post: post._id });
            await Post.deleteOne({ _id: post._id });
        }

        await Comment.deleteMany({ author: user._id });

        await User.updateMany(
            { savedPosts: { $in: postIds } },
            { $pull: { savedPosts: { $in: postIds } } }
        );

        await User.updateMany(
            { friendsList: user._id },
            { $pull: { friendsList: user._id } }
        );

        // Delete the profile image file if it exists
        if (user.profileImg && user.profileImg.data) {
            const imagePath = path.join(__dirname, '../', user.profileImg.data);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await User.findByIdAndDelete(req.params.userId);

        res.status(200).json({ message: 'User, related posts, comments, and profile image deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Save a post to the user's savedPosts
const addUserSavedPost = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const post = await Post.findById(req.body.postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        user.savedPosts.push(post._id);
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Remove a post from the user's savedPosts
const removeUserSavedPost = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const post = await Post.findById(req.body.postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        user.savedPosts.pull(post._id);
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    upload,
    createUser,
    loginUser,
    getUserById,
    updateUser,
    deleteUser,
    getUsers,
    addUserSavedPost,
    removeUserSavedPost
};
