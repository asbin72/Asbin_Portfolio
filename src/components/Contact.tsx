import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { personal } from '../data/portfolio';
import { useInView, useReducedMotion, useIsMobile } from '../hooks/usePortfolio';

function BigCTA({ href, children }: { href: string; children: React.ReactNode }) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const isMobile = useIsMobile();

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (isMobile) return;
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
    btn.style.transition = 'transform 0.1s';
  }, [isMobile]);

  const onMouseLeave = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.style.transform = 'translate(0, 0)';
    btn.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
  }, []);

  return (
    <a
      ref={btnRef}
      href={href}
      className="inline-flex items-center gap-3 group"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 'clamp(12px, 1.5vw, 14px)',
        letterSpacing: '0.12em',
        color: '#070707',
        backgroundColor: '#C8FF00',
        padding: 'clamp(16px, 2vw, 20px) clamp(28px, 4vw, 44px)',
        borderRadius: '4px',
        textDecoration: 'none',
        fontWeight: 700,
        willChange: 'transform',
        cursor: 'none',
        transition: 'background-color 0.2s',
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#d4ff1a';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = '#C8FF00';
      }}
    >
      {children}
      <motion.div
        className="group-hover:rotate-45 transition-transform duration-200"
      >
        <ArrowUpRight size={18} />
      </motion.div>
    </a>
  );
}

export default function Contact() {
  const { ref, inView } = useInView(0.1);
  const reduced = useReducedMotion();

  return (
    <section
      id="contact"
      className="section-pad relative overflow-hidden"
      style={{ backgroundColor: '#070707' }}
      aria-labelledby="contact-title"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(200,255,0,0.04) 0%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(200,255,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10 text-center">
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          initial={reduced ? {} : { opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label-style block mb-8" style={{ color: '#929292' }}>
            LET'S WORK TOGETHER
          </span>

          <h2
            id="contact-title"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(36px, 7vw, 96px)',
              fontWeight: 700,
              color: '#F5F5F5',
              lineHeight: 1.0,
              marginBottom: '16px',
            }}
          >
            HAVE A PROJECT
            <br />
            <span style={{ color: '#C8FF00' }}>IN MIND?</span>
          </h2>

          <motion.p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(18px, 2.5vw, 28px)',
              color: '#929292',
              lineHeight: 1.4,
              marginBottom: '56px',
              fontWeight: 500,
            }}
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            LET'S BUILD SOMETHING WORTH SHIPPING.
          </motion.p>

          <motion.div
            className="flex flex-col items-center gap-6"
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <BigCTA href={`mailto:${personal.email}`}>
              START A CONVERSATION
            </BigCTA>

            <a
              href={`mailto:${personal.email}`}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '13px',
                letterSpacing: '0.08em',
                color: '#929292',
                textDecoration: 'none',
                transition: 'color 0.2s',
                cursor: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F5')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#929292')}
              aria-label={`Email ${personal.email}`}
            >
              {personal.email}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
