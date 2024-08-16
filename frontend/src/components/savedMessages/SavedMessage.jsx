import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Avatar, IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './SavedMessage.css';

const SavedPosts = () => {
  const savedPostIds = useSelector((state) => state.currentUser?.savedPosts || []);
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      if (savedPostIds.length === 0) return;

      try {
        const postDetails = await Promise.all(
          savedPostIds.map(async (postId) => {
            const response = await axios.get(`http://localhost:3500/posts/${postId}`);
            return response.data;
          })
        );
        setSavedPosts(postDetails);
      } catch (error) {
        console.error('Error fetching saved posts:', error);
      }
    };

    fetchSavedPosts();
  }, [savedPostIds]);

  const handleShare = (id) => {
    alert(`Share functionality for item ${id} is not implemented.`);
  };

  return (
    <div className="saved-posts">
      <Typography variant="h4" className="saved-posts__title">Saved Posts</Typography>
      <div className="saved-posts__list">
        {savedPosts.map((post) => (
          <Card key={post._id} className="saved-posts__item">
            <CardContent className="saved-posts__item-content">
              <div className="saved-posts__item-header">
                <Avatar alt={post.author.userName} src={post.author.avatar || ''} className="saved-posts__item-avatar">
                  {post.author.userName.charAt(0)}
                </Avatar>
                <div className="saved-posts__item-user-info">
                  <Typography variant="subtitle1" className="saved-posts__item-username">
                    {post.author.userName}
                  </Typography>
                  <Typography variant="subtitle2" className="saved-posts__item-date">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </Typography>
                </div>
                <div className="saved-posts__item-actions">
                  <IconButton onClick={() => handleShare(post._id)} aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </div>
              </div>
              <Typography variant="h6" className="saved-posts__item-title">
                {post.category}
              </Typography>
              <Typography variant="body1" className="saved-posts__item-description">
                {post.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SavedPosts;
