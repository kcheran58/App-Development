// PostPage.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Input, CircularProgress, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './PostPage.css';
import { userPost } from '../../redux/slice/userSlice';

const PostPage = () => {
  const dispatch = useDispatch();
  const [post, setPost] = useState({
    title: '',
    description: '',
    category: '',
    content: '',
    image: null,
  });

  const [author, setAuthor] = useState(null);

  const [categories] = useState([
    'Traveling',
    'Education',
    'Technology',
    'Lifestyle',
    'Food',
    'Health',
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (currentUser) {
      setAuthor(currentUser._id); // Ensure this matches the expected format for your backend
    }
  }, [currentUser]);

  const handleChange = async(e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPost((prev) => ({ ...prev, image: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Create FormData object to handle file upload
    const formData = new FormData();
    formData.append('author', author);
    formData.append('category', post.category);
    formData.append('description', post.description);
    formData.append('content', post.content);
    if (post.image) {
        formData.append('postImg', post.image);
    }

    try {
        const response = await axios.post('http://localhost:3500/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        dispatch(userPost(response.data._id));
        setSuccess('Post created successfully!');
        setPost({
            title: '',
            description: '',
            category: '',
            content: '',
            image: null,
        });
        setImagePreview('');
        setLoading(false);
        setTimeout(() => navigate('/'), 1500);
    } catch (error) {
        console.error(error);
        setError('Error creating post. Please try again.');
        setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" className="post-page-container">
      <Typography variant="h4" gutterBottom>Create a New Post</Typography>
      <form onSubmit={handleSubmit} className="post-page-form-container">
        <TextField
          label="Title"
          name="title"
          value={post.title}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={post.description}
          onChange={handleChange}
          multiline
          rows={4}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Category"
          name="category"
          value={post.category}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
          SelectProps={{
            native: true,
          }}
        >
          <option value="">Select a category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </TextField>
        <TextField
          label="Content"
          name="content"
          value={post.content}
          onChange={handleChange}
          multiline
          rows={6}
          required
          fullWidth
          margin="normal"
        />
        <Input
          accept="image/*"
          type="file"
          onChange={handleImageChange}
          style={{ margin: '20px 0' }}
        />
        {imagePreview && (
          <div>
            <img src={imagePreview} alt="Image preview" className="post-page-img-preview" />
          </div>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="post-page-button"
        >
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </form>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} className="post-page-snackbar">
        <Alert onClose={() => setError('')} severity="error" className="post-page-alert">{error}</Alert>
      </Snackbar>
      <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess('')} className="post-page-snackbar">
        <Alert onClose={() => setSuccess('')} severity="success" className="post-page-alert">{success}</Alert>
      </Snackbar>
    </Container>
  );
};

export default PostPage;
