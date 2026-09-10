import { motion } from 'framer-motion';
import { experience } from '../data/portfolio';
import { useInView, useReducedMotion } from '../hooks/usePortfolio';

interface ExperienceItemProps {
  item: typeof experience[0];
  index: number;
  isLast: boolean;
}

function ExperienceItem({ item, index, isLast }: ExperienceItemProps) {
  const { ref, inView } = useInView(0.15);
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      className="flex items-start gap-4 sm:gap-6 md:gap-8 relative"
      initial={reduced ? {} : { opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* 1. DEDICATED TIMELINE COLUMN (Guaranteed zero overlap) */}
      <div className="flex flex-col items-center flex-shrink-0 pt-6">
        {/* Node */}
        <div
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: item.current ? 'rgba(200, 255, 0, 0.12)' : '#161616',
            border: item.current
              ? '2px solid #C8FF00'
              : '1.5px solid rgba(255, 255, 255, 0.15)',
            boxShadow: item.current ? '0 0 20px rgba(200, 255, 0, 0.35)' : 'none',
          }}
          aria-hidden="true"
        >
          {item.current ? (
            <motion.div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: '#C8FF00' }}
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          ) : (
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
            />
          )}
        </div>

        {/* Connecting Line to next item */}
        {!isLast && (
          <div
            className="w-0.5 my-2 flex-1 min-h-[40px] sm:min-h-[56px]"
            style={{
              background: item.current
                ? 'linear-gradient(to bottom, #C8FF00, rgba(255, 255, 255, 0.08))'
                : 'rgba(255, 255, 255, 0.08)',
            }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* 2. CARD CONTENT COLUMN */}
      <div
        className="flex-1 min-w-0 rounded-2xl transition-all duration-300 relative overflow-hidden"
        style={{
          backgroundColor: '#111111',
          border: item.current
            ? '1px solid rgba(200, 255, 0, 0.35)'
            : '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: item.current
            ? '0 16px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(200, 255, 0, 0.05)'
            : '0 8px 24px rgba(0, 0, 0, 0.35)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = item.current
            ? '#C8FF00'
            : 'rgba(255, 255, 255, 0.25)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = item.current
            ? 'rgba(200, 255, 0, 0.35)'
            : 'rgba(255, 255, 255, 0.08)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {/* Subtle accent highlight line on top of current role */}
        {item.current && (
          <div
            className="w-full h-0.5"
            style={{
              background: 'linear-gradient(90deg, #C8FF00, transparent)',
            }}
            aria-hidden="true"
          />
        )}

        <div className="p-6 sm:p-8 lg:p-9">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8">
            {/* Left Info: Role & Company */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2.5">
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(20px, 2.5vw, 24px)',
                    fontWeight: 700,
                    color: '#F5F5F5',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.role}
                </h3>

                {item.current && (
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      letterSpacing: '0.15em',
                      color: '#070707',
                      backgroundColor: '#C8FF00',
                      padding: '3px 9px',
                      borderRadius: '3px',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: '#070707' }}
                    />
                    CURRENT
                  </span>
                )}
              </div>

              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '13px',
                  letterSpacing: '0.08em',
                  color: item.current ? '#C8FF00' : '#929292',
                  fontWeight: 500,
                }}
              >
                {item.company}
              </div>
            </div>

            {/* Right Meta: Date & Badge */}
            <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/5 flex-shrink-0">
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px',
                  color: '#929292',
                  letterSpacing: '0.05em',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.period}
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  color: 'rgba(255, 255, 255, 0.45)',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '3px 10px',
                  borderRadius: '3px',
                  textTransform: 'uppercase',
                }}
              >
                {item.type}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const { ref: titleRef, inView: titleInView } = useInView(0.1);
  const reduced = useReducedMotion();

  return (
    <section
      id="experience"
      className="section-pad"
      style={{ backgroundColor: '#0D0D0D' }}
      aria-labelledby="experience-title"
    >
      <div className="container-custom">
        {/* Title Header */}
        <motion.div
          ref={titleRef as React.Ref<HTMLDivElement>}
          className="mb-14 sm:mb-18"
          initial={reduced ? {} : { opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label-style block mb-4" style={{ color: '#929292' }}>
            CAREER HISTORY
          </span>
          <h2
            id="experience-title"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 700,
              color: '#F5F5F5',
              lineHeight: 1.05,
            }}
          >
            EXPERIENCE
          </h2>
        </motion.div>

        {/* Timeline Container with completely separated columns */}
        <div className="max-w-4xl flex flex-col gap-6 sm:gap-8">
          {experience.map((item, i) => (
            <ExperienceItem
              key={item.id}
              item={item}
              index={i}
              isLast={i === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
