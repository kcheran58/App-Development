import React from 'react';
import './Features.css';

function Features() {
  return (
    <section className="features">
      <h2>Features</h2>
      <div className="feature-list">
        <div className="feature-item">
          <div className="feature-icon">📖</div>
          <h3>Create Stories</h3>
          <p>Share your experiences with the community.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🌐</div>
          <h3>Connect with Others</h3>
          <p>Engage with people who have similar interests.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🔍</div>
          <h3>Explore Content</h3>
          <p>Discover new stories and experiences.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">💼</div>
          <h3>Expert Guidance</h3>
          <p>Get advice from industry experts.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">📚</div>
          <h3>Knowledge Sharing</h3>
          <p>Share and gain knowledge with the community.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🎓</div>
          <h3>Interactive Workshops</h3>
          <p>Participate in workshops and webinars.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;
