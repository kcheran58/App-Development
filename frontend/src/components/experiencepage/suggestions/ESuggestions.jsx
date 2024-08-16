import React from 'react';
import './ESuggestions.css';
import { Card, CardContent, Typography, Avatar, Button } from '@mui/material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {addExplore} from '../../../redux/slice/exploreSlice'
import { useEffect } from 'react';
import axios from 'axios';
import { addPost } from '../../../redux/slice/postSlice';

const ESuggestions = () => {
    const dispatch = useDispatch();
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
      }, [dispatch]);
    
    const posts = useSelector(state=>state.posts);

  const sliderSettings = {
        dots: false,
        arrows: false,
        infinite: true,
          autoplay: true,
          autoplaySpeed: 3000, 
          speed: 1000,
          slidesToShow: 3,
          slidesToScroll: 1,
          adaptiveHeight: true,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            }
          ]
        };
        
      return (
          <div className='experience-suggestions'>
              <h1 className='s-h'>
                  <TipsAndUpdatesOutlinedIcon sx={{ borderColor: '2px yellow' }} /> Suggestions
              </h1>
              <Slider {...sliderSettings}>
                  {posts.map((post, index) => (
                      <Card key={index} className='s-item' sx={{backgroundImage:'url("https://e1.pxfuel.com/desktop-wallpaper/834/677/desktop-wallpaper-business-card-backgrounds-awesome-business-card-backgrounds-design-unique-background.jpg")',backgroundSize:'cover',backgroundRepeat:'no-repeat'}}>
                          <CardContent>
                              <div className='s-item-content'>
                                  <Avatar alt="User Avatar" className='s-item-avatar' />
                                  <div className='s-item-text-container'>
                                      <Typography variant="subtitle1" component="div" className='s-item-username'>
                                          {post?.author?.userName||null}
                                      </Typography>
                                      <Typography variant="body2" color="textSecondary" className='s-item-date'>
                                          {post.createdAt}
                                      </Typography>
                                      <Typography variant="overline" component="div" className='s-item-category'>
                                          {post.category}
                                      </Typography>
                                      <Typography variant="body1" component="div" className='s-item-text'>
                                          {post.description}
                                      </Typography>
                                      <Button variant="contained" sx={{marginTop:'50px'}}color="primary" className='explore-button' onClick={()=>{dispatch(addExplore(post))}} to='/explore' component={Link}>
                                          Explore
                                      </Button>
                                  </div>
                              </div>
                          </CardContent>
                      </Card>
                  ))}
              </Slider>
          </div>
      );
  };
  
  export default ESuggestions;
  