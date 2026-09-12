import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Terminal, FileText } from 'lucide-react';
import { useReducedMotion } from '../hooks/usePortfolio';

interface FloatingDockProps {
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
  onPlayClick?: () => void;
}

export default function FloatingDock({
  onOpenCommandPalette,
  onOpenResume,
  onPlayClick,
}: FloatingDockProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showDock, setShowDock] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.round((currentScroll / totalScroll) * 100)));
      }
      setShowDock(currentScroll > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    onPlayClick?.();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {showDock && (
        <motion.div
          className="fixed bottom-6 right-6 z-[90] flex items-center gap-2 p-1.5 rounded-full bg-[#111111]/90 backdrop-blur-md border border-white/10 shadow-2xl"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Command Palette Trigger */}
          <button
            onClick={() => {
              onPlayClick?.();
              onOpenCommandPalette();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#C8FF00]/10 border border-white/5 hover:border-[#C8FF00]/30 text-neutral-300 hover:text-[#C8FF00] text-xs font-mono transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8FF00]"
            title="Open Command Palette (Ctrl+K)"
            aria-label="Open Command Menu"
          >
            <Terminal size={13} className="text-[#C8FF00]" />
            <span className="hidden sm:inline text-[11px]">⌘K</span>
          </button>

          {/* Resume Trigger */}
          <button
            onClick={() => {
              onPlayClick?.();
              onOpenResume();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#C8FF00]/10 border border-white/5 hover:border-[#C8FF00]/30 text-neutral-300 hover:text-[#C8FF00] text-xs font-mono transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8FF00]"
            title="View Resume"
            aria-label="View Resume"
          >
            <FileText size={13} />
            <span className="hidden sm:inline text-[11px]">CV</span>
          </button>

          {/* Scroll to Top with Progress Circle */}
          <button
            onClick={scrollToTop}
            className="relative w-8 h-8 rounded-full flex items-center justify-center bg-[#1a1a1a] hover:bg-[#222] border border-white/10 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8FF00]"
            title="Back to top"
            aria-label="Back to top"
          >
            {/* SVG Circular Progress */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 32 32">
              <circle
                cx="16"
                cy="16"
                r="14"
                className="stroke-white/10"
                strokeWidth="2"
                fill="none"
              />
              <circle
                cx="16"
                cy="16"
                r="14"
                className="stroke-[#C8FF00] transition-all duration-150"
                strokeWidth="2"
                strokeDasharray={88}
                strokeDashoffset={88 - (88 * scrollProgress) / 100}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <ArrowUp size={14} className="text-[#C8FF00]" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
