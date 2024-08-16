import React from 'react';
import Hero from '../hero/Hero';
import Features from '../features/Features';
import Testimonials from '../testimonials/Testimonials';
import ESuggestions from '../experiencepage/suggestions/ESuggestions';
import Banner from '../banner/Banner';
// import SuggestionPage from '../suggestion/SuggestionPage/SuggestionPage';
const HomePage = () => {
  return (
    <div>
      <Hero/>
      <Banner/>
      <ESuggestions/>
      <Features/>
      <Testimonials/>
    </div>
  )
}

export default HomePage
