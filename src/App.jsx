import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Stats from './components/Stats';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Benefits from './components/Benefits';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Splash from './components/Splash';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <Splash onComplete={handleSplashComplete} />}
      {!showSplash && (
        <div className="bg-deep-indigo text-white min-h-screen">
          <Navigation />
          <Hero />
          <Stats />
          <HowItWorks />
          <Features />
          <Benefits />
          <Testimonials />
          <FAQ />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
