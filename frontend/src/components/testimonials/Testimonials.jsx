import React, { useState, useEffect } from 'react';
import './Testimonials.css';

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    // Mock fetch function to simulate API call
    const fetchTestimonials = async () => {
      // Replace this with your actual API call
      const data = [
        { id: 1, text: "This app has changed how I share my travel experiences!", author: "Alex D.", image: "https://via.placeholder.com/50" },
        { id: 2, text: "A wonderful platform to connect with like-minded people.", author: "Jamie L.", image: "https://via.placeholder.com/50" },
      ];
      setTestimonials(data);
    };
    
    fetchTestimonials();
  }, []);

  return (
    <section className="testimonials">
      <h2>What Our Users Say</h2>
      <div className="testimonial-list">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-item">
            <img src={testimonial.image} alt={testimonial.author} className="testimonial-image" />
            <p>"{testimonial.text}"</p>
            <span>- {testimonial.author}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
