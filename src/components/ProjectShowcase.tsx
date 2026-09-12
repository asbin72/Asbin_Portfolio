import { useState, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';
import { project } from '../data/portfolio';
import { useInView, useReducedMotion } from '../hooks/usePortfolio';

// Simplified browser frame mockup for the project
function BrowserMockup() {
  return (
    <div className="browser-frame w-full shadow-2xl">
      {/* Browser chrome */}
      <div className="browser-bar">
        <div className="browser-dot" style={{ backgroundColor: '#FF5F57' }} />
        <div className="browser-dot" style={{ backgroundColor: '#FFBD2E' }} />
        <div className="browser-dot" style={{ backgroundColor: '#28C840' }} />
        <div
          className="flex-1 ml-4 flex items-center"
          style={{
            backgroundColor: 'rgba(255,255,255,0.04)',
            borderRadius: '4px',
            padding: '4px 10px',
            maxWidth: '260px',
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              color: '#929292',
              letterSpacing: '0.03em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            college-management-lovat.vercel.app
          </span>
        </div>
      </div>

      {/* App interface mockup */}
      <div
        className="relative"
        style={{ backgroundColor: '#0a0a0a', minHeight: '320px', overflow: 'hidden' }}
        aria-hidden="true"
      >
        {/* Mock navigation */}
        <div
          style={{
            backgroundColor: '#111',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '14px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '14px',
              fontWeight: 700,
              color: '#F5F5F5',
            }}
          >
            Kalpanaaa Education
          </div>
          <div className="flex gap-4">
            {['Home', 'Courses', 'About', 'Contact'].map((item) => (
              <span
                key={item}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '12px',
                  color: '#929292',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Mock hero */}
        <div
          style={{
            padding: '40px 24px',
            background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)',
          }}
        >
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(18px, 3vw, 28px)',
              fontWeight: 700,
              color: '#F5F5F5',
              marginBottom: '12px',
              lineHeight: 1.2,
            }}
          >
            Shaping The Future
            <br />
            Through Excellence
          </div>
          <div
            style={{
              fontSize: '13px',
              color: '#929292',
              marginBottom: '20px',
              maxWidth: '360px',
            }}
          >
            Premier institution offering high-quality degree programs
          </div>
          <div className="flex gap-3">
            <div
              style={{
                backgroundColor: '#C8FF00',
                color: '#070707',
                fontSize: '11px',
                fontWeight: 700,
                padding: '8px 18px',
                borderRadius: '3px',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Explore Programs
            </div>
            <div
              style={{
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#F5F5F5',
                fontSize: '11px',
                padding: '8px 18px',
                borderRadius: '3px',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Learn More
            </div>
          </div>
        </div>

        {/* Mock stats row */}
        <div
          className="grid grid-cols-3 gap-0"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          {[
            { label: 'Programs', value: '20+' },
            { label: 'Departments', value: '8' },
            { label: 'Faculty', value: '100+' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                padding: '16px 20px',
                borderRight: '1px solid rgba(255,255,255,0.04)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#C8FF00',
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: '11px', color: '#929292', marginTop: '2px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ProjectShowcaseProps {
  onPlayClick?: () => void;
  onPlayHover?: () => void;
}

export default function ProjectShowcase({ onPlayClick, onPlayHover }: ProjectShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { ref, inView } = useInView(0.1);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduced ? [1, 1, 1] : [0.96, 1, 0.96]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <section
      id="project"
      ref={containerRef}
      className="section-pad"
      style={{ backgroundColor: '#070707' }}
      aria-labelledby="project-title"
    >
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16"
          initial={reduced ? {} : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <span className="label-style flex items-center gap-2 mb-4" style={{ color: '#929292' }}>
              <Sparkles size={12} className="text-[#C8FF00]" />
              FEATURED PROJECT
            </span>
            <h2
              id="project-title"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(36px, 5vw, 60px)',
                fontWeight: 700,
                color: '#F5F5F5',
                lineHeight: 1.05,
              }}
            >
              SELECTED
              <br />
              <span style={{ color: '#C8FF00' }}>WORK</span>
            </h2>
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: '#929292',
              letterSpacing: '0.1em',
            }}
          >
            2026 // PRODUCTION
          </div>
        </motion.div>

        {/* Project card with interactive mouse spotlight */}
        <motion.div
          style={{ y, scale }}
          className="w-full"
        >
          <div
            ref={cardRef}
            className="relative rounded-2xl overflow-hidden transition-all duration-300"
            style={{
              border: hovered
                ? '1px solid rgba(200,255,0,0.35)'
                : '1px solid rgba(255,255,255,0.06)',
              backgroundColor: '#111111',
              boxShadow: hovered ? '0 30px 80px rgba(0,0,0,0.8), 0 0 50px rgba(200,255,0,0.06)' : 'none',
            }}
            data-cursor="card"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => {
              onPlayHover?.();
              setHovered(true);
            }}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Spotlight overlay following cursor */}
            {hovered && (
              <div
                className="absolute pointer-events-none transition-opacity duration-300 z-0"
                style={{
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(200,255,0,0.06), transparent 80%)`,
                }}
                aria-hidden="true"
              />
            )}

            {/* Top section with metadata */}
            <div
              className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-8 lg:p-10"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="flex flex-wrap items-center gap-3">
                {/* Status badge */}
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    letterSpacing: '0.15em',
                    color: '#C8FF00',
                    border: '1px solid rgba(200,255,0,0.3)',
                    padding: '3px 10px',
                    borderRadius: '2px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: '#C8FF00' }}
                  />
                  LIVE
                </span>

                {/* Tech badges */}
                {project.tech.map((t) => (
                  <span
                    key={t}
                    onMouseEnter={() => onPlayHover?.()}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      letterSpacing: '0.08em',
                      color: '#929292',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '3px 10px',
                      borderRadius: '2px',
                      backgroundColor: 'rgba(255,255,255,0.02)',
                      transition: 'all 0.2s',
                    }}
                    className="hover:text-[#C8FF00] hover:border-[#C8FF00]/40"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onPlayClick?.()}
                  onMouseEnter={() => onPlayHover?.()}
                  className="inline-flex items-center gap-2 group"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    color: '#070707',
                    backgroundColor: '#C8FF00',
                    fontWeight: 700,
                    padding: '8px 18px',
                    borderRadius: '3px',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    cursor: 'none',
                  }}
                  aria-label="Open live project in new tab"
                >
                  LIVE SYSTEM
                  <ExternalLink size={12} />
                </a>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onPlayClick?.()}
                  className="inline-flex items-center gap-2 group"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    color: '#929292',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '8px 16px',
                    borderRadius: '3px',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    cursor: 'none',
                  }}
                  onMouseEnter={(e) => {
                    onPlayHover?.();
                    e.currentTarget.style.color = '#F5F5F5';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#929292';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                  aria-label="View source code on GitHub in new tab"
                >
                  VIEW SOURCE
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Main project content */}
            <div className="relative z-10 grid lg:grid-cols-5 gap-0">
              {/* Left: Info */}
              <div
                className="lg:col-span-2 p-8 lg:p-10"
                style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}
              >
                <motion.h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(22px, 3vw, 32px)',
                    fontWeight: 700,
                    color: '#F5F5F5',
                    lineHeight: 1.15,
                    marginBottom: '16px',
                  }}
                  animate={hovered ? { color: '#F5F5F5' } : {}}
                >
                  {project.title}
                </motion.h3>

                <p
                  style={{
                    fontSize: '14px',
                    color: '#929292',
                    lineHeight: 1.7,
                    marginBottom: '28px',
                  }}
                >
                  {project.description}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {project.features.map((feat, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3"
                      initial={reduced ? {} : { opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: i * 0.08 + 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span
                        className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: '#C8FF00', boxShadow: '0 0 6px rgba(200,255,0,0.5)' }}
                      />
                      <span style={{ fontSize: '13px', color: '#929292', lineHeight: 1.5 }}>
                        {feat}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA arrow */}
                <motion.div
                  className="mt-8"
                  animate={hovered ? { x: 4 } : { x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onPlayClick?.()}
                    className="inline-flex items-center gap-2 group"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      letterSpacing: '0.1em',
                      color: '#C8FF00',
                      textDecoration: 'none',
                      cursor: 'none',
                    }}
                    aria-label="Explore live project"
                  >
                    EXPLORE PROJECT
                    <ArrowUpRight
                      size={14}
                      style={{
                        transform: hovered ? 'translate(2px, -2px)' : 'translate(0,0)',
                        transition: 'transform 0.3s',
                      }}
                    />
                  </a>
                </motion.div>
              </div>

              {/* Right: Browser mockup */}
              <div className="lg:col-span-3 p-8 lg:p-10 flex items-center justify-center">
                <motion.div
                  animate={hovered ? { scale: 1.02 } : { scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: 'center', width: '100%' }}
                >
                  <BrowserMockup />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
