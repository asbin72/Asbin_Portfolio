import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView, useReducedMotion } from '../hooks/usePortfolio';
import { stack } from '../data/portfolio';

function FlowArrow() {
  const reduced = useReducedMotion();
  return (
    <div className="flex flex-col items-center my-1" aria-hidden="true">
      <div className="w-px h-6" style={{ backgroundColor: 'rgba(200,255,0,0.3)' }} />
      <motion.div
        animate={reduced ? {} : { y: [0, 3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke="rgba(200,255,0,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  );
}

interface LayerProps {
  layer: typeof stack[0];
  index: number;
  isLast: boolean;
}

function ArchLayer({ layer, index, isLast }: LayerProps) {
  const { ref, inView } = useInView(0.2);
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      initial={reduced ? {} : { opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="arch-layer group relative"
        tabIndex={0}
        aria-label={`${layer.layer} layer: ${layer.tech.join(', ')}`}
      >
        {/* Layer number */}
        <div
          className="absolute top-4 right-4"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: 'rgba(200,255,0,0.3)',
            letterSpacing: '0.1em',
          }}
        >
          0{index + 1}
        </div>

        {/* Layer badge */}
        <div className="flex items-center gap-3 mb-4">
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.2em',
              color: '#C8FF00',
              border: '1px solid rgba(200,255,0,0.2)',
              padding: '3px 8px',
              borderRadius: '2px',
            }}
          >
            {layer.layer}
          </span>
        </div>

        {/* Tech names */}
        <div className="flex flex-wrap gap-2 mb-4">
          {layer.tech.map((t) => (
            <span
              key={t}
              className="font-bold"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(22px, 3vw, 32px)',
                color: '#F5F5F5',
                lineHeight: 1.1,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: '14px',
            color: '#929292',
            lineHeight: 1.6,
          }}
        >
          {layer.description}
        </p>

        {/* Hover accent bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-px"
          style={{ backgroundColor: '#C8FF00' }}
          initial={{ width: 0 }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {!isLast && <FlowArrow />}
    </motion.div>
  );
}

// Data flow animation through layers on scroll
function DataFlowDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div ref={containerRef} className="relative">
      {/* Animated vertical line on the left */}
      <div
        className="absolute hidden lg:block"
        style={{ left: '-40px', top: 0, bottom: 0, width: '1px', backgroundColor: 'rgba(255,255,255,0.06)' }}
        aria-hidden="true"
      >
        <motion.div
          className="absolute top-0 left-0 w-full"
          style={{ height: lineHeight, backgroundColor: '#C8FF00' }}
        />
      </div>

      {/* Layers */}
      <div className="space-y-0">
        {stack.map((layer, i) => (
          <ArchLayer
            key={layer.id}
            layer={layer}
            index={i}
            isLast={i === stack.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

export default function Architecture() {
  const { ref, inView } = useInView(0.1);
  const reduced = useReducedMotion();

  return (
    <section
      className="section-pad"
      style={{ backgroundColor: '#0D0D0D' }}
      aria-labelledby="arch-title"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Title */}
          <motion.div
            ref={ref as React.Ref<HTMLDivElement>}
            initial={reduced ? {} : { opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-32"
          >
            <span
              className="label-style block mb-6"
              style={{ color: '#929292' }}
            >
              SYSTEM ARCHITECTURE
            </span>

            <h2
              id="arch-title"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontWeight: 700,
                color: '#F5F5F5',
                lineHeight: 1.05,
                marginBottom: '20px',
              }}
            >
              HOW I
              <br />
              <span style={{ color: '#C8FF00' }}>BUILD</span>
            </h2>

            <p style={{ fontSize: '16px', color: '#929292', lineHeight: 1.7, maxWidth: '340px' }}>
              From interface to logic to data.
              <br />A full-stack approach to engineering modern web systems.
            </p>

            {/* Architecture ASCII diagram */}
            <div
              className="mt-10 p-6 rounded-lg"
              style={{
                backgroundColor: '#111111',
                border: '1px solid rgba(255,255,255,0.06)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                color: '#929292',
                lineHeight: 1.8,
              }}
              aria-hidden="true"
            >
              <span style={{ color: '#F5F5F5' }}>USER</span>
              <br />
              {'  '}↓
              <br />
              ┌──────────────┐
              <br />
              │{' '}
              <span style={{ color: '#61DAFB' }}>REACT</span>
              {'        '}│
              <br />
              │{' '}
              <span style={{ color: '#3178C6' }}>TYPESCRIPT</span>
              {'    '}│
              <br />
              └──────┬───────┘
              <br />
              {'      '}↓
              <br />
              ┌──────────────┐
              <br />
              │{' '}
              <span style={{ color: '#6DB33F' }}>SPRING BOOT</span>
              {'  '}│
              <br />
              │{' '}
              <span style={{ color: '#f89820' }}>JAVA</span>
              {'         '}│
              <br />
              └──────┬───────┘
              <br />
              {'      '}↓
              <br />
              ┌──────────────┐
              <br />
              │{' '}
              <span style={{ color: '#4479A1' }}>MySQL</span>
              {'        '}│
              <br />
              │{' '}
              <span style={{ color: '#929292' }}>DATA</span>
              {'         '}│
              <br />
              └──────────────┘
            </div>
          </motion.div>

          {/* Right: Interactive layers */}
          <div className="relative lg:pl-16">
            <DataFlowDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
