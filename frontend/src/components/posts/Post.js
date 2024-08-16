import React, { useState } from 'react';
import "./Post.css";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import Comments from '../Comments/Comments'
import { PiSmileySad } from "react-icons/pi";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { MdReportGmailerrorred } from "react-icons/md";

import { LiaFacebookF } from "react-icons/lia";
import { FiInstagram } from "react-icons/fi";
import { BiLogoLinkedin } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import { RxTwitterLogo } from "react-icons/rx";
import { FiGithub } from "react-icons/fi";

import moment from 'moment';

const Post = ({ post, posts, setPosts }) => {
  const [like, setLike] = useState(post.likes || 0);
  const [unlike, setUnlike] = useState(false);
  const [filledLike, setFilledLike] = useState(<FavoriteBorderOutlinedIcon />);
  const [unFilledLike, setUnFilledLike] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([{
    id:1,
    profilePic:"https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=600",
    likes:23,
    username:"Violet",
    time:"3 Hours Ago",
    comment:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse asperiores debitis saepe itaque, eligendi quasi laboriosam vitae voluptatem animi maiores voluptatibus."
},
{
    id:2,
    profilePic:"https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=600",
    likes:5,
    username:"Brandon",
    time:"1 Hour Ago",
    comment:"Lorem ipsum dolor sit amet consectetur adipisicing elit."
},
{
    id:3,
    profilePic:"https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=600",
    likes:50,
    username:"Lilly",
    time:"30 Mins Ago",
    comment:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse asperiores debitis saepe itaque, eligendi quasi"
}
]);
  
  const [socialIcons, setSocialIcons] = useState(false);

  const handleLikes = () => {
    setLike(unlike ? like - 1 : like + 1);
    setUnlike(!unlike);
    setFilledLike(unFilledLike ? <FavoriteBorderOutlinedIcon /> : <FavoriteRoundedIcon />);
    setUnFilledLike(!unFilledLike);
  };

  const handleDelete = (id) => {
    const deleteFilter = posts.filter(val => val._id !== id);
    setPosts(deleteFilter);
    setShowDelete(false);
  };

  const handleCommentInput = (e) => {
    e.preventDefault();

    const newComment = {
      id: comments.length ? comments[comments.length - 1]._id + 1 : 1,
      profilePic:"https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=600",
      likes: 0,
      username: post.author.fullName,
      comment: commentInput,
      time: moment.utc(new Date(), 'yyyy/MM/dd kk:mm:ss').local().startOf('seconds').fromNow()
    };

    setComments([...comments, newComment]);
    setCommentInput("");
  };

  const handleFriendsId = (id) => {
    // Logic to handle friend's ID click event
  };

  return (
    <div className='post'>
      <div className='post-header'>
          <div className='post-user' onClick={() => handleFriendsId(post.author._id)} style={{ cursor: "pointer" }}>
            <img src="https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=600" className='p-img' alt="" />
            <h2>{post?.author?.fullName||"seran"}</h2>
            <p className='datePara'>{moment(post.createdAt).fromNow()}</p>
          </div>

        <div className='delete'>
          {showDelete && (
            <div className="options">
              <button><PiSmileySad />Not Interested in this post</button>
              <button><IoVolumeMuteOutline />Mute this user</button>
              <button><MdBlockFlipped />Block this user</button>
              <button onClick={() => handleDelete(post._id)}><AiOutlineDelete />Delete</button>
              <button><MdReportGmailerrorred />Report post</button>
            </div>
          )}
          <MoreVertRoundedIcon className='post-vertical-icon' onClick={() => setShowDelete(!showDelete)} />
        </div>
      </div>

      <p className='body'>{post?.description||"ertyuio"}</p>

      <img src={post?.postImg ? `http://localhost:3500/${post.postImg.data}`:"https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=600"} alt="" className="post-img" />
      <p className='body'>{post?.content||"ertyuio"}</p>

      <div className="post-foot">
        <div className="post-footer">
          <div className="like-icons">
            <p className='heart'
              onClick={handleLikes}
              style={{ marginTop: "20px" }}
            >
              {filledLike}
            </p>

            <MessageRoundedIcon
              onClick={() => setShowComment(!showComment)}
              className='msg'
            />

            <ShareOutlinedIcon
              onClick={() => setSocialIcons(!socialIcons)}
              className='share'
            />
            {socialIcons && (
              <div className="social-buttons">
                <a href="http://www.facebook.com" target="blank" className="social-margin">
                  <div className="social-icon facebook">
                    <LiaFacebookF className='social-links' />
                  </div>
                </a>

                <a href="https://www.instagram.com/" target="blank" className="social-margin">
                  <div className="social-icon instagram">
                    <FiInstagram className='social-links' />
                  </div>
                </a>

                <a href="http://linkedin.com/" className="social-margin" target="blank">
                  <div className="social-icon linkedin">
                    <BiLogoLinkedin className='social-links' />
                  </div>
                </a>

                <a href="https://github.com/" target="blank" className="social-margin">
                  <div className="social-icon github">
                    <FiGithub className='social-links' />
                  </div>
                </a>

                <a href="http://youtube.com/" target="blank" className="social-margin">
                  <div className="social-icon youtube">
                    <AiFillYoutube className='social-links' />
                  </div>
                </a>

                <a href="http://twitter.com/" target="blank" className="social-margin">
                  <div className="social-icon twitter">
                    <RxTwitterLogo className='social-links' />
                  </div>
                </a>
              </div>
            )}
          </div>

          <div className="like-comment-details">
            <span className='post-like'>{like} people like it,</span>
            <span className='post-comment'>{comments.length} comments</span>
          </div>

          {showComment && (
            <div className="commentSection">
              <form onSubmit={handleCommentInput}>
                <div className="cmtGroup">
                  <SentimentSatisfiedRoundedIcon className='emoji' />

                  <input
                    type="text"
                    id="commentInput"
                    required
                    placeholder='Add a comment...'
                    onChange={(e) => setCommentInput(e.target.value)}
                    value={commentInput}
                  />

                  <button type='submit'><SendRoundedIcon className='send' /></button>
                    </div>
                  </form>
                  <div className="sticky">
          {comments.map((cmt)=>(
            <Comments 
            className="classComment"
            cmt={cmt}
            key={cmt.id}
            />
          ))}
          </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
