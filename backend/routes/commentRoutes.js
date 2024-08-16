const express = require('express');
const router = express.Router();
const {
    createComment,
    getCommentById,
    getAllComments,
    updateComment,
    deleteComment
} = require('../controllers/CommentController');

router.post('/', createComment);
router.get('/', getAllComments);
router.get('/:commentId', getCommentById);
router.put('/:commentId', updateComment);
router.delete('/:commentId', deleteComment);

module.exports = router;
