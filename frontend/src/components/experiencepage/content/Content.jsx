import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, IconButton, Button, Avatar } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import './Content.css';
import { useSelector, useDispatch } from 'react-redux';
import { addExplore } from '../../../redux/slice/exploreSlice';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addPost } from '../../../redux/slice/postSlice';
import { savedPost } from '../../../redux/slice/userSlice';
import Post from '../../posts/Post';
import InputPost from '../../InputPost/InputPost';
import Filter from '../FilterPage/Filter';

const Content = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector(state => state.currentUser._id);
  const currentUserSavedPosts = useSelector(state => state.currentUser.savedPosts) || [];
  const [posts, setPosts] = useState(useSelector(state => state.posts));
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [likedItems, setLikedItems] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState('newest');
  
  // Group posts by category
  const groupedPosts = posts.reduce((acc, post) => {
    const category = post.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(post);
    return acc;
  }, {});

  // Fetch posts from server
  useEffect(() => {
    async function getPosts() {
      try {
        const response = await axios.get('http://localhost:3500/posts');
        dispatch(addPost(response.data));
      } catch (err) {
        console.log(err.message);
      }
    }
    getPosts();
  },[dispatch]);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const handleLike = (id) => {
    if (!userId) {
      navigate('/login'); // Redirect to login if not logged in
      return;
    }
    setLikedItems((prev) => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleSave = async (id) => {
    if (!userId) {
      navigate('/login'); // Redirect to login if not logged in
      return;
    }

    // Check if the post is already saved
    if (currentUserSavedPosts.includes(id)) {
      return; // Do nothing if the post is already saved
    }

    try {
      // Dispatch the savedPost action and update the server
      dispatch(savedPost(id));
      await axios.post(`http://localhost:3500/users/${userId}/savedPosts`, { postId: id });
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleShare = (id) => {
    alert(`Share functionality for item ${id} is not implemented.`);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
    );
  };

  const handleSortOptionChange = (value) => {
    setSelectedSortOption(value);
  };

  const sortedPosts = Object.keys(groupedPosts).reduce((acc, category) => {
    const postsInCategory = groupedPosts[category];
    
    switch (selectedSortOption) {
      case 'newest':
        postsInCategory.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        postsInCategory.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'mostLiked':
        postsInCategory.sort((a, b) => b.likes - a.likes); // assuming posts have a `likes` field
        break;
      default:
        break;
    }

    if (selectedCategories.length === 0 || selectedCategories.includes(category)) {
      acc[category] = postsInCategory;
    }

    return acc;
  }, {});

  return (
    <div className='content'>
      <Filter
        categories={Object.keys(groupedPosts)}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
        onClearFilters={() => setSelectedCategories([])}
        selectedSortOption={selectedSortOption}
        onSortOptionChange={handleSortOptionChange}
      />
      <div className='content__suggestions'>
        <InputPost />
        {posts.length > 0 ? (
          posts.map((post) => (
            <Post
              posts={posts}
              post={post}
              setPosts={setPosts}
              key={post._id}
            />
          ))
        ) : (
          <p>No posts available</p>
        )}
        {Object.keys(sortedPosts).map((category) => (
          <div key={category} className='content__category-section'>
            <Typography variant="h5" className='content__category-title'>
              {category}
            </Typography>
            <div className='content__items'>
              {sortedPosts[category].slice(0, expandedCategory === category ? undefined : 4).map((post) => (
                <Card key={post._id} className='content__item'>
                  <CardContent className='content__item-content'>
                    <div className='content__item-header'>
                      <Avatar alt={post?.author?.userName || "seran"} src="" className='content__item-avatar'>
                        {post?.author?.userName?.charAt(0) || 'A'}
                      </Avatar>
                      <div className='content__item-user-info'>
                        <Typography variant="subtitle1" className='content__item-username'>
                          {post.author?.userName || "Unknown User"}
                        </Typography>
                        <Typography variant="subtitle2" className='content__item-date'>
                          {new Date(post?.createdAt).toLocaleDateString()}
                        </Typography>
                      </div>
                      <div className='content__item-actions'>
                        <IconButton onClick={() => handleSave(post._id)} aria-label="save">
                          {currentUserSavedPosts.includes(post._id) ? <BookmarkIcon style={{ color: 'blue' }} /> : <BookmarkBorderIcon style={{ color: 'blue' }} />}
                        </IconButton>
                        <IconButton onClick={() => handleShare(post._id)} aria-label="share">
                          <ShareIcon />
                        </IconButton>
                      </div>
                    </div>
                    <Typography variant="body1" className='content__item-text'>
                      {post.description || "No description available"}
                    </Typography>
                    <div className='content__actions'>
                      <IconButton onClick={() => handleLike(post._id)} aria-label="like">
                        {likedItems.includes(post._id) ? <FavoriteIcon style={{ color: 'red' }} /> : <FavoriteBorderIcon style={{ color: 'red' }} />}
                      </IconButton>
                      <Button variant="text" className='content__explore-button' onClick={() => { dispatch(addExplore(post)) }} to="/explore" component={Link}>
                        Explore
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button className='content__show-more-button' onClick={() => toggleCategory(category)}>
              {expandedCategory === category ? 'Show Less' : 'Show More'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
