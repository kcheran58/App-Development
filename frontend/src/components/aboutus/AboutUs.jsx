import React from 'react';
import { Container, Typography, Paper, Button } from '@mui/material';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <Container sx={{ mt: 4, mb: 8, marginTop: '100px' }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h4" sx={{ mb: 3 }}>
            About Us
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Our Vision
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            We envision a world where knowledge is freely accessible to everyone, where learning is a lifelong journey, and where communities are built on shared wisdom and mutual respect. <strong>KnowShare</strong> aims to be at the forefront of this vision, providing a platform that encourages curiosity, fosters collaboration, and celebrates diversity.
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            What We Offer
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>KnowShare</strong> is more than just a platform; it's a dynamic ecosystem designed to facilitate the exchange of knowledge in various forms:
          </Typography>
          <ul>
            <li><strong>Articles & Blogs:</strong> Dive into a vast library of articles written by experts and enthusiasts alike.</li>
            <li><strong>Forums & Discussions:</strong> Engage with our community through interactive forums.</li>
            <li><strong>Workshops & Webinars:</strong> Enhance your skills with online workshops and webinars led by industry professionals.</li>
            <li><strong>Collaborative Projects:</strong> Collaborate with others on projects that inspire you.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Our Values
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Our values include:</strong>
          </Typography>
          <ul>
            <li><strong>Accessibility:</strong> Knowledge should be accessible to all, regardless of background or expertise.</li>
            <li><strong>Community:</strong> We are a community-driven platform where everyone's voice matters.</li>
            <li><strong>Respect:</strong> We foster a respectful environment where diverse perspectives are welcomed and valued.</li>
            <li><strong>Integrity:</strong> We are committed to providing accurate and reliable information.</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Join Us on This Journey
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            At <strong>KnowShare</strong>, we are committed to building a community where learning never stops. Whether you're here to learn, teach, or simply explore, we invite you to join us on this journey of knowledge sharing. Together, we can create a world where information is freely shared, and everyone has the opportunity to grow and succeed.
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 3 }}>
            Learn More
          </Button>
        </motion.div>
      </Paper>
    </Container>
  );
};

export default AboutUs;
