import React from 'react';
import Hero from '../components/Hero/Hero';
import Benefits from '../components/Benefits/Benefits';
import Features from '../components/Features/Features';
import Testimonials from '../components/Testimonials/Testimonials';
import Showcase from '../components/Showcase/Showcase';
import VideoSection from '../components/VideoSection/VideoSection';
import Faq from '../components/Faq/Faq';

function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <Features />
      <Testimonials />
      <Showcase />
      <VideoSection />
      <Faq />
    </>
  );
}

export default HomePage;