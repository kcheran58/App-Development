import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.section}>
          <h3>About Us</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div style={styles.section}>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/" style={styles.link}>Home</a></li>
            <li><a href="/products" style={styles.link}>Products</a></li>
            <li><a href="/blog" style={styles.link}>Blog</a></li>
            <li><a href="/contact" style={styles.link}>Contact</a></li>
          </ul>
        </div>
        <div style={styles.section}>
          <h3>Connect with Us</h3>
          <div style={styles.socialMedia}>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </div>
      <div style={styles.bottomBar}>
        <p>&copy; 2024 E-Share. All rights reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    position:'absolute',
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px 0',
    textAlign: 'center',
    fontFamily: "'Josefin Sans', sans-serif",
    fontWeight: '400',
    marginTop: 'auto',
    width:'100vw'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  section: {
    flex: 1,
    margin: '0 20px',
    textAlign: 'left',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    display: 'block',
    margin: '5px 0',
  },
  socialMedia: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
  },
  icon: {
    fontSize: '30px',
    margin: '0 10px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'color 0.3s ease-in-out',
    '&:hover': {
      color: '#55acee',
    },
  },
  bottomBar: {
    marginTop: '20px',
  },
};

export default Footer;
