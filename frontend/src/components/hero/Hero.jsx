import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Share Your Experiences with the World</h1>
        <p className="hero-description">Connect with people and share your stories, insights, and experiences.</p>
        <button className="hero-button" to='/content' component={Link}><Link to="/content" style={{ textDecoration: 'none', color: 'inherit' }}>Explore now</Link></button>
      </div>
    </section>
  );
}

export default Hero;
