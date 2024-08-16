const express = require('express');
const router = express.Router();
const {
    upload,
    createUser,
    loginUser,
    getUserById,
    updateUser,
    deleteUser,
    getUsers,
    addUserSavedPost,
    removeUserSavedPost
} = require('../controllers/UserController');

router.post('/', upload.single('profileImg'), createUser);
router.post('/login', loginUser);
router.get('/:userId', getUserById);
router.put('/:userId', upload.single('profileImg'), updateUser);
router.delete('/:userId', deleteUser);
router.get('/', getUsers);
router.post('/:userId/savedPosts', addUserSavedPost);
router.delete('/:userId/savedPosts', removeUserSavedPost);

module.exports = router;
