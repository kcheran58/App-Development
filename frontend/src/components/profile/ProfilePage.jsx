import React, { useEffect, useState } from 'react';
import { Avatar, Typography, Paper, Grid, Card, CardContent, Box, Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import './ProfilePage.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { removePost } from '../../redux/slice/userSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const cu = useSelector(state => state.currentUser);
  const [posts, setPosts] = useState([]);
  const [expandedPostIndex, setExpandedPostIndex] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentEditPost, setCurrentEditPost] = useState(null);
  const [updatedContent, setUpdatedContent] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedCategory, setUpdatedCategory] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      if (cu.posts && cu.posts.length > 0) {
        try {
          const postRequests = cu.posts.map(id =>
            axios.get(`http://localhost:3500/posts/${id}`)
              .catch(error => {
                console.error(`Error fetching post with ID ${id}:`, error);
                return null;
              })
          );
          const responses = await Promise.all(postRequests);
          setPosts(responses.filter(response => response !== null).map(response => response.data));
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      }
    };

    fetchPosts();
  }, [cu.posts]);

  const handleToggleExpand = (index) => {
    setExpandedPostIndex(expandedPostIndex === index ? null : index);
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3500/posts/${postId}`);
      dispatch(removePost(postId));
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleOpenEditDialog = (post) => {
    setCurrentEditPost(post);
    setUpdatedContent(post.content);
    setUpdatedDescription(post.description);
    setUpdatedCategory(post.category);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setCurrentEditPost(null);
    setUpdatedContent('');
    setUpdatedDescription('');
    setUpdatedCategory('');
  };

  const handleSaveEdit = async () => {
    if (currentEditPost) {
      try {
        const updatedPost = {
          ...currentEditPost,
          content: updatedContent,
          description: updatedDescription,
          category: updatedCategory,
        };
        await axios.put(`http://localhost:3500/posts/${currentEditPost._id}`, updatedPost);
        setPosts(posts.map(post => (post._id === currentEditPost._id ? updatedPost : post)));
        handleCloseEditDialog();
      } catch (error) {
        console.error('Error updating post:', error);
      }
    }
  };

  const user = {
    name: cu.fullName || 'Anonymous',
    email: cu.email || 'No Email',
    username: cu.userName || 'Unknown User',
    location: cu.country,
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    experience: [], // Add experience data here if available
    knowledge: [],  // Add knowledge sharing data here if available
    posts: posts,
    stats: {
      posts: (cu.posts && cu.posts.length) || 0,
      followers: 1200,
      following: 300,
    }
  };

  return (
    <Box className="profile-dashboard">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} className="profile-card" sx={{ height: '100vh' }}>
            <Box className="profile-image-container">
              <Avatar src={cu.profilePic || "default-profile-pic.jpg"} alt="Profile" className="profile-image" />
            </Box>
            <Typography variant="h4" className="profile-name">{user.name}</Typography>
            <Typography variant="body1" className="profile-detail"><strong>Email:</strong> {user.email}</Typography>
            <Typography variant="body1" className="profile-detail"><strong>Username:</strong> {user.username}</Typography>
            <Typography variant="body1" className="profile-detail"><strong>Location:</strong> {user.location}</Typography>
            <Typography variant="body1" className="profile-detail"><strong>Bio:</strong> {user.bio}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card className="info-card">
                <CardContent>
                  <Typography variant="h6" className="section-title">Experience</Typography>
                  {user.experience.map((exp, index) => (
                    <Typography key={index} variant="body1" className="experience-detail">
                      <strong>{exp.company}</strong> - {exp.role} ({exp.duration})
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card className="info-card">
                <CardContent>
                  <Typography variant="h6" className="section-title">Knowledge Sharing</Typography>
                  {user.knowledge.map((item, index) => (
                    <div key={index} className="knowledge-item">
                      <Typography variant="body1" className="knowledge-topic"><strong>{item.topic}:</strong></Typography>
                      <Typography variant="body2">{item.description}</Typography>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card className="info-card">
                <CardContent>
                  <Typography variant="h6" className="section-title">Posts</Typography>
                  {user.posts.map((post, index) => (
                    <Card key={index} className="post-card" sx={{ backgroundImage:'url("https://wallpapers.com/images/high/business-card-background-1350-x-900-8h93ttt0twe40jer.webp")',backgroundSize:'cover',backgroundRepeat:'no-repeat', marginBottom: 2 }}>
                      <CardContent>
                        <Typography variant="h6">{post.description}</Typography>
                        <Typography variant="body2">
                          {expandedPostIndex === index ? post.content : `${post.content.slice(0, 100)}...`}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: 1 }}>
                          <Button onClick={() => handleToggleExpand(index)} variant="outlined">
                            {expandedPostIndex === index ? 'Show Less' : 'Show More'}
                          </Button>
                          <IconButton onClick={() => handleOpenEditDialog(post)} color="primary">
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDeletePost(post._id)} color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                        <Typography variant="body2" color="textSecondary">
                          By: {post.author?.userName || "Unknown"} | {new Date(post.createdAt).toLocaleDateString()}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card className="info-card">
                <CardContent>
                  <Typography variant="h6" className="section-title">Statistics</Typography>
                  <BarChart width={500} height={300} data={[
                    { name: 'Posts', value: user.stats.posts },
                    { name: 'Followers', value: user.stats.followers },
                    { name: 'Following', value: user.stats.following }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            multiline
            rows={2}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Content"
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Category"
            value={updatedCategory}
            onChange={(e) => setUpdatedCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="secondary" aria-label='cancel-edit-post'>Cancel</Button>
          <Button onClick={handleSaveEdit} color="primary" aria-label='edit-post'>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ProfilePage;
