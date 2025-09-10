import React from 'react';
import Hero from '../components/Hero/Hero';
import Benefits from '../components/Benefits/Benefits';
import Features from '../components/Features/Features';
import Testimonials from '../components/Testimonials/Testimonials';
import Showcase from '../components/Showcase/Showcase';
import VideoSection from '../components/VideoSection/VideoSection';
import Faq from '../components/Faq/Faq';
import Pricing from "../components/Pricing/Pricing"
import ToolsSection from '../components/ToolsSection/ToolsSection';

function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <Features />
      <ToolsSection />
      <Testimonials />
      <Showcase />
      <Pricing />
      <VideoSection />
      <Faq />
    </>
  );
}

export default HomePage;