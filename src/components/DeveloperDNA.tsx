import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../data/portfolio';
import { useInView, useReducedMotion } from '../hooks/usePortfolio';

// Category color map
const categoryColors: Record<string, string> = {
  frontend: '#61DAFB',
  backend: '#6DB33F',
  data: '#4479A1',
  concept: '#C8FF00',
};

export default function DeveloperDNA() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const { ref, inView } = useInView(0.1);
  const reduced = useReducedMotion();

  const active = skills.find((s) => s.name === activeSkill);

  return (
    <section
      className="section-pad"
      style={{ backgroundColor: '#070707' }}
      aria-labelledby="dna-title"
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          className="mb-16"
          initial={reduced ? {} : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label-style block mb-5" style={{ color: '#929292' }}>
            TECHNICAL PROFILE
          </span>
          <h2
            id="dna-title"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(40px, 5vw, 64px)',
              fontWeight: 700,
              color: '#F5F5F5',
              lineHeight: 1.05,
              marginBottom: '16px',
            }}
          >
            DEVELOPER
            <br />
            <span style={{ color: '#C8FF00' }}>DNA</span>
          </h2>
          <p style={{ fontSize: '15px', color: '#929292', maxWidth: '400px', lineHeight: 1.7 }}>
            Hover any skill to explore its role in the system.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          {/* Skill chips */}
          <div className="lg:col-span-2">
            {/* Category legend */}
            <div className="flex flex-wrap gap-4 mb-8">
              {Object.entries(categoryColors).map(([cat, color]) => (
                <div key={cat} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      color: '#929292',
                      textTransform: 'uppercase',
                    }}
                  >
                    {cat}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="flex flex-wrap gap-3"
              role="list"
              aria-label="Developer skills"
            >
              {skills.map((skill, i) => {
                const isActive = activeSkill === skill.name;
                const catColor = categoryColors[skill.category] || '#929292';

                return (
                  <motion.button
                    key={skill.name}
                    role="listitem"
                    className="skill-chip focus:outline-none"
                    style={{
                      color: isActive ? '#C8FF00' : '#929292',
                      borderColor: isActive ? 'rgba(200,255,0,0.5)' : 'rgba(255,255,255,0.08)',
                      backgroundColor: isActive ? 'rgba(200,255,0,0.07)' : '#111111',
                      boxShadow: isActive ? '0 0 20px rgba(200,255,0,0.1)' : 'none',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    aria-pressed={isActive}
                    aria-label={`${skill.name}: ${skill.description}`}
                    onClick={() => setActiveSkill(isActive ? null : skill.name)}
                    initial={reduced ? {} : { opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={reduced ? {} : { y: -2 }}
                  >
                    {/* Category dot */}
                    <span
                      className="w-1.5 h-1.5 rounded-full mr-2 flex-shrink-0"
                      style={{ backgroundColor: catColor, display: 'inline-block' }}
                      aria-hidden="true"
                    />
                    {skill.name}

                    {/* Active indicator */}
                    {isActive && (
                      <motion.span
                        className="absolute bottom-0 left-0 h-0.5 w-full"
                        style={{ backgroundColor: '#C8FF00' }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Skill detail panel */}
          <div className="lg:col-span-1">
            <div
              className="rounded-xl p-6 h-full min-h-[200px] flex flex-col justify-center"
              style={{
                backgroundColor: '#111111',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <AnimatePresence mode="wait">
                {active ? (
                  <motion.div
                    key={active.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: categoryColors[active.category] || '#929292' }}
                        aria-hidden="true"
                      />
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '10px',
                          letterSpacing: '0.15em',
                          color: '#929292',
                          textTransform: 'uppercase',
                        }}
                      >
                        {active.category}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '24px',
                        fontWeight: 700,
                        color: '#F5F5F5',
                        marginBottom: '12px',
                      }}
                    >
                      {active.name}
                    </h3>

                    <p
                      style={{
                        fontSize: '14px',
                        color: '#929292',
                        lineHeight: 1.7,
                      }}
                    >
                      {active.description}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-center"
                  >
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '11px',
                        letterSpacing: '0.1em',
                        color: 'rgba(255,255,255,0.2)',
                      }}
                    >
                      SELECT A SKILL
                      <br />
                      TO LEARN MORE
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
