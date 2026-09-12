import { useState, useCallback, useEffect } from 'react';
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
import CommandPalette from './components/CommandPalette';
import { useSoundFx } from './hooks/useSoundFx';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const { soundEnabled, toggleSound, playClick, playHover, playSuccess } = useSoundFx();

  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  const openResumeDirect = useCallback(() => {
    playClick();
    window.open('/resume.pdf', '_blank', 'noopener,noreferrer');
  }, [playClick]);

  const closeCommandPalette = useCallback(() => {
    setIsCommandPaletteOpen(false);
  }, []);

  // Global keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
        <Navbar
          onPlayClick={playClick}
          onPlayHover={playHover}
        />

        <main id="main-content">
          <Hero
            onPlayClick={playClick}
            onPlayHover={playHover}
          />
          <Architecture />
          <ProjectShowcase
            onPlayClick={playClick}
            onPlayHover={playHover}
          />
          <Experience />
          <DeveloperDNA
            onPlayClick={playClick}
            onPlayHover={playHover}
          />
          <About />
          <Contact
            onPlayClick={playClick}
            onPlayHover={playHover}
            onPlaySuccess={playSuccess}
          />
        </main>

        <Footer />

        {/* Global Command Palette (accessible via Ctrl+K / Cmd+K) */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={closeCommandPalette}
          onOpenResume={openResumeDirect}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          onPlayClick={playClick}
          onPlaySuccess={playSuccess}
        />
      </div>
    </>
  );
}
