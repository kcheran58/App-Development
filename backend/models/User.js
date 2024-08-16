const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
    },
    profileImg: {
        data: String, 
        contentType: String
    },
    userName: {
        type: String,
        unique: true,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    savedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    friendsList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    notification: [{
        type: String
    }],
    country: {
        type: String,
        default: "INDIA"
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
