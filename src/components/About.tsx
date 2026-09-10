import { motion } from 'framer-motion';
import { personal, progression } from '../data/portfolio';
import { useInView, useReducedMotion } from '../hooks/usePortfolio';

function ProgressionStep({
  step,
  index,
  isLast,
}: {
  step: typeof progression[0];
  index: number;
  isLast: boolean;
}) {
  const { ref, inView } = useInView(0.2);
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      className="relative flex flex-col items-center text-center"
      initial={reduced ? {} : { opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Step indicator */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center mb-4"
        style={{
          backgroundColor: 'rgba(200,255,0,0.1)',
          border: '1px solid rgba(200,255,0,0.3)',
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            color: '#C8FF00',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Step label */}
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 'clamp(11px, 1.5vw, 13px)',
          letterSpacing: '0.12em',
          color: '#F5F5F5',
          fontWeight: 600,
          marginBottom: '6px',
          display: 'block',
        }}
      >
        {step.step}
      </span>
      <span
        style={{
          fontSize: '12px',
          color: '#929292',
          lineHeight: 1.5,
          maxWidth: '140px',
        }}
      >
        {step.description}
      </span>

      {/* Arrow connector */}
      {!isLast && (
        <div className="hidden sm:flex absolute right-0 top-4 translate-x-1/2 items-center" aria-hidden="true">
          <div className="w-8 h-px" style={{ backgroundColor: 'rgba(200,255,0,0.2)' }} />
          <svg width="6" height="8" viewBox="0 0 6 8" fill="none">
            <path d="M1 1L5 4L1 7" stroke="rgba(200,255,0,0.4)" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </motion.div>
  );
}

export default function About() {
  const { ref, inView } = useInView(0.1);
  const reduced = useReducedMotion();

  return (
    <section
      id="about"
      className="section-pad"
      style={{ backgroundColor: '#0D0D0D' }}
      aria-labelledby="about-title"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Editorial text */}
          <div>
            <motion.span
              className="label-style block mb-6"
              style={{ color: '#929292' }}
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              ABOUT
            </motion.span>

            <motion.div
              ref={ref as React.Ref<HTMLDivElement>}
              initial={reduced ? {} : { opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2
                id="about-title"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  fontWeight: 700,
                  color: '#F5F5F5',
                  lineHeight: 1.1,
                  marginBottom: '28px',
                }}
              >
                {personal.aboutHeadline.split('CODE.').map((part, i) =>
                  i === 0 ? (
                    <span key={i}>
                      {part}
                      CODE.
                    </span>
                  ) : (
                    <span key={i} style={{ color: '#C8FF00' }}>
                      {part}
                    </span>
                  )
                )}
              </h2>

              <p
                style={{
                  fontSize: '16px',
                  color: '#929292',
                  lineHeight: 1.8,
                  marginBottom: '24px',
                  maxWidth: '480px',
                }}
              >
                {personal.about}
              </p>

              {/* Quick stats */}
              <div
                className="grid grid-cols-2 gap-4 mt-8"
                role="list"
                aria-label="Quick facts"
              >
                {[
                  { label: 'FOCUS', value: 'Full-Stack' },
                  { label: 'APPROACH', value: 'Systems-First' },
                  { label: 'BACKEND', value: 'Java + Spring' },
                  { label: 'FRONTEND', value: 'React + TS' },
                ].map((item) => (
                  <div
                    key={item.label}
                    role="listitem"
                    className="p-4 rounded-lg"
                    style={{
                      backgroundColor: '#111111',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '9px',
                        letterSpacing: '0.15em',
                        color: '#929292',
                        marginBottom: '6px',
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#F5F5F5',
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Career progression */}
          <div>
            <motion.div
              initial={reduced ? {} : { opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10"
            >
              <span
                className="label-style block mb-4"
                style={{ color: '#929292' }}
              >
                CAREER PROGRESSION
              </span>
              <p
                style={{
                  fontSize: '14px',
                  color: '#929292',
                  lineHeight: 1.6,
                  marginBottom: '32px',
                }}
              >
                A natural evolution from frontend fundamentals to full-stack engineering.
              </p>
            </motion.div>

            {/* Progression steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 relative">
              {progression.map((step, i) => (
                <ProgressionStep
                  key={step.step}
                  step={step}
                  index={i}
                  isLast={i === progression.length - 1}
                />
              ))}
            </div>

            {/* Vertical mobile connector */}
            <div
              className="flex sm:hidden flex-col items-center mt-2 gap-1"
              aria-hidden="true"
            >
              <div className="w-px h-6" style={{ backgroundColor: 'rgba(200,255,0,0.2)' }} />
              <div className="w-px h-6" style={{ backgroundColor: 'rgba(200,255,0,0.15)' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
