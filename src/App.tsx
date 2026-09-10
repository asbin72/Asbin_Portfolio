import { useState, useCallback } from 'react';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Architecture from './components/Architecture';
import ProjectShowcase from './components/ProjectShowcase';
import Experience from './components/Experience';
import DeveloperDNA from './components/DeveloperDNA';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      {/* Noise texture overlay */}
      <div className="noise" aria-hidden="true" />

      {/* Custom cursor — desktop only */}
      <CustomCursor />

      {/* Loading screen */}
      <LoadingScreen onComplete={handleLoadComplete} />

      {/* Main content */}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
          visibility: loaded ? 'visible' : 'hidden',
        }}
        aria-hidden={!loaded}
      >
        <Navbar />

        <main id="main-content">
          <Hero />
          <Architecture />
          <ProjectShowcase />
          <Experience />
          <DeveloperDNA />
          <About />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
