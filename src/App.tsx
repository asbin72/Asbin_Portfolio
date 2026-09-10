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
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const handleLoadComplete = useCallback(() => setLoaded(true), []);
  const handleOpenResume = useCallback(() => setResumeOpen(true), []);
  const handleCloseResume = useCallback(() => setResumeOpen(false), []);

  return (
    <>
      {/* Noise texture overlay */}
      <div className="noise" aria-hidden="true" />

      {/* Custom cursor — desktop only */}
      <CustomCursor />

      {/* Loading screen */}
      <LoadingScreen onComplete={handleLoadComplete} />

      {/* Interactive Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={handleCloseResume} />

      {/* Main content */}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
          visibility: loaded ? 'visible' : 'hidden',
        }}
        aria-hidden={!loaded}
      >
        <Navbar onOpenResume={handleOpenResume} />

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
