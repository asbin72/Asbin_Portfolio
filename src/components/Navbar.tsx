import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personal, navLinks } from '../data/portfolio';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Trap focus and handle escape key when mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        toggleButtonRef.current?.focus();
        return;
      }

      if (e.key === 'Tab') {
        const drawer = drawerRef.current;
        if (!drawer) return;
        const focusableElements = drawer.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // Track active section
  useEffect(() => {
    const sections = ['project', 'experience', 'about', 'contact'];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100]"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="transition-all duration-500"
          style={{
            backgroundColor: scrolled ? 'rgba(7,7,7,0.92)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
            padding: scrolled ? '16px 0' : '24px 0',
          }}
        >
          <div className="container-custom flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group focus:outline-none"
              aria-label="Back to top"
            >
              <span
                className="text-lg font-bold tracking-[0.15em] transition-colors duration-200"
                style={{ color: '#F5F5F5', fontFamily: "'Space Grotesk', sans-serif" }}
              >
                ASBIN
                <span
                  className="transition-colors duration-200"
                  style={{ color: '#C8FF00' }}
                >
                  .TS
                </span>
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNav(link.href)}
                    className="relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      letterSpacing: '0.15em',
                      color: isActive ? '#C8FF00' : '#929292',
                      transition: 'color 0.2s',
                      background: 'none',
                      border: 'none',
                      cursor: 'none',
                      padding: '4px 0',
                    }}
                  >
                    <span className="group-hover:text-white transition-colors duration-200" style={{ color: 'inherit' }}>
                      {link.label}
                    </span>
                    <span
                      className="absolute bottom-0 left-0 h-px transition-all duration-300"
                      style={{
                        backgroundColor: '#C8FF00',
                        width: isActive ? '100%' : '0%',
                      }}
                    />
                  </button>
                );
              })}

              <a
                href={personal.resume || '/resume.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="group focus:outline-none"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  color: '#C8FF00',
                  border: '1px solid rgba(200,255,0,0.3)',
                  padding: '8px 18px',
                  borderRadius: '3px',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  cursor: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(200,255,0,0.1)';
                  e.currentTarget.style.borderColor = '#C8FF00';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(200,255,0,0.3)';
                }}
              >
                RESUME
              </a>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              ref={toggleButtonRef}
              className="lg:hidden flex flex-col gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <motion.span
                className="block h-px w-6 origin-center"
                style={{ backgroundColor: '#F5F5F5' }}
                animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-px w-6"
                style={{ backgroundColor: '#F5F5F5' }}
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-px w-6 origin-center"
                style={{ backgroundColor: '#F5F5F5' }}
                animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-[99] lg:hidden flex flex-col"
            style={{ backgroundColor: '#070707' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex-1 flex flex-col justify-center items-center gap-8 p-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(32px, 8vw, 56px)',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    color: '#F5F5F5',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#C8FF00')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#F5F5F5')}
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.a
                href={personal.resume || '/resume.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="focus:outline-none"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '13px',
                  letterSpacing: '0.12em',
                  color: '#070707',
                  backgroundColor: '#C8FF00',
                  padding: '10px 24px',
                  borderRadius: '3px',
                  textDecoration: 'none',
                  fontWeight: 700,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                VIEW RESUME
              </motion.a>

              <motion.a
                href={`mailto:${personal.email}`}
                className="text-base"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  color: '#929292',
                  textDecoration: 'none',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                {personal.email}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
