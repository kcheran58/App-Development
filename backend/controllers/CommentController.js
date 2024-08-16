const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const User = require('../models/User');

// Create a new comment
const createComment = async (req, res) => {
    try {
        const { post: postId, author, content } = req.body;

        // Validate postId and authorId
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ error: 'Invalid post ID format' });
        }
        if (!mongoose.Types.ObjectId.isValid(author)) {
            return res.status(400).json({ error: 'Invalid author ID format' });
        }

        // Create and save the comment
        const comment = new Comment({ post: postId, author, content });
        await comment.save();

        // Add the comment to the post's comments array
        await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

        // Optionally, add the comment to the user's comments array

        return res.status(201).json(comment);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};



// Get a comment by ID
const getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        return res.json(comment);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};



// Get all comments
const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};



// Update a comment
const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.commentId, req.body, { new: true, runValidators: true });
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        return res.json(comment);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};



// Delete a comment
const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Remove the comment ID from the post's comments array
        await Post.findByIdAndUpdate(comment.post, { $pull: { comments: comment._id } });

        // Optionally, remove the comment ID from the user's comments array

        await Comment.findByIdAndDelete(req.params.commentId);
        return res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createComment,
    getCommentById,
    getAllComments,
    updateComment,
    deleteComment
};
