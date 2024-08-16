import React, { useState } from 'react';
import './Explore.css'; 
import { useSelector } from 'react-redux';
import { FaHeart, FaRegHeart, FaRegComment, FaRegBookmark, FaLink, FaAngleDown, FaAngleUp, FaEllipsisH } from 'react-icons/fa';

export default function Explore() {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const post = useSelector((state) => state.explore);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <div className="explore-container">
      <div className="post-card">
        <div className="post-header">
          <div className="avatar">
            {post?.author?.userName?.charAt(0) || 'A'}
          </div>
          <div className="post-info">
            <div className="post-author">{post?.author?.userName || 'Title'}</div>
            <div className="post-date">
              {post?.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Date'}
            </div>
          </div>
          <button className="action-button tri-button">
            <FaEllipsisH />
          </button>
        </div>
        <img
          className="post-image"
          src="https://png.pngtree.com/background/20230823/original/pngtree-3d-illustration-of-worldwide-connectivity-and-information-sharing-in-business-picture-image_4791317.jpg"
          alt="Visual representation of the content"
        />
        <div className="post-content">
          <p className="post-description">
            {post?.description || 'No description available.'}
          </p>
          {expanded && (
            <p className="post-extra-content">
              {post?.content || 'No additional content available.'}
            </p>
          )}
        </div>
        <div className="post-actions">
          <button
            className={`action-button ${liked ? 'liked' : ''}`}
            onClick={handleLikeClick}
          >
            {liked ? <FaHeart /> : <FaRegHeart />}
          </button>
          <button className="action-button">
            <FaRegComment />
          </button>
          <button className="action-button">
            <FaLink />
          </button>
          <button className="action-button">
            <FaRegBookmark />
          </button>
          <button className="action-button" onClick={handleExpandClick}>
            {expanded ? <FaAngleUp /> : <FaAngleDown />}
          </button>
        </div>
      </div>
    </div>
  );
}
