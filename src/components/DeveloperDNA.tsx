import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { skills } from '../data/portfolio';
import { useInView, useReducedMotion } from '../hooks/usePortfolio';

// Category color map
const categoryColors: Record<string, string> = {
  frontend: '#61DAFB',
  backend: '#6DB33F',
  data: '#4479A1',
  concept: '#C8FF00',
};

interface DeveloperDNAProps {
  onPlayClick?: () => void;
  onPlayHover?: () => void;
}

export default function DeveloperDNA({ onPlayClick, onPlayHover }: DeveloperDNAProps) {
  const [activeSkill, setActiveSkill] = useState<string>('Java');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { ref, inView } = useInView(0.1);
  const reduced = useReducedMotion();

  const categories = [
    { id: 'all', label: 'ALL' },
    { id: 'backend', label: 'BACKEND', color: categoryColors.backend },
    { id: 'frontend', label: 'FRONTEND', color: categoryColors.frontend },
    { id: 'data', label: 'DATA', color: categoryColors.data },
    { id: 'concept', label: 'CONCEPTS', color: categoryColors.concept },
  ];

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  const active = skills.find((s) => s.name === activeSkill) || skills[0];

  const handleCategoryClick = (catId: string) => {
    onPlayClick?.();
    setActiveCategory(catId);
    if (catId !== 'all') {
      const firstInCategory = skills.find((s) => s.category === catId);
      if (firstInCategory) {
        setActiveSkill(firstInCategory.name);
      }
    }
  };

  const handleSkillSelect = (skillName: string) => {
    onPlayClick?.();
    setActiveSkill(skillName);
  };

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
          <span className="label-style flex items-center gap-2 mb-5" style={{ color: '#929292' }}>
            <Sparkles size={12} className="text-[#C8FF00]" />
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
            Click any technology or concept to explore its role in the system.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          {/* Skill chips */}
          <div className="lg:col-span-2">
            {/* Category filter tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => {
                const isCatActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    onMouseEnter={() => onPlayHover?.()}
                    className="flex items-center gap-2 px-3.5 py-2 rounded text-xs font-mono transition-all focus:outline-none"
                    style={{
                      backgroundColor: isCatActive ? 'rgba(200,255,0,0.12)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${isCatActive ? 'rgba(200,255,0,0.5)' : 'rgba(255,255,255,0.08)'}`,
                      color: isCatActive ? '#C8FF00' : '#929292',
                      cursor: 'none',
                    }}
                  >
                    {cat.color && (
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                    )}
                    <span style={{ letterSpacing: '0.1em' }}>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            <div
              className="flex flex-wrap gap-3"
              role="list"
              aria-label="Developer skills"
            >
              {filteredSkills.map((skill, i) => {
                const isActive = active?.name === skill.name;
                const catColor = categoryColors[skill.category] || '#929292';

                return (
                  <motion.button
                    key={skill.name}
                    role="listitem"
                    className="skill-chip focus:outline-none"
                    style={{
                      color: isActive ? '#C8FF00' : '#929292',
                      borderColor: isActive ? 'rgba(200,255,0,0.5)' : 'rgba(255,255,255,0.08)',
                      backgroundColor: isActive ? 'rgba(200,255,0,0.08)' : '#111111',
                      boxShadow: isActive ? '0 0 20px rgba(200,255,0,0.12)' : 'none',
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'none',
                    }}
                    aria-pressed={isActive}
                    aria-label={`${skill.name}: ${skill.description}`}
                    onClick={() => handleSkillSelect(skill.name)}
                    onMouseEnter={() => onPlayHover?.()}
                    initial={reduced ? {} : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
              className="rounded-xl p-6 h-full min-h-[240px] flex flex-col justify-center relative overflow-hidden"
              style={{
                backgroundColor: '#111111',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              }}
            >
              {/* Subtle accent glow top border */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{
                  backgroundColor: active ? (categoryColors[active.category] || '#C8FF00') : '#C8FF00',
                  opacity: 0.6,
                }}
              />

              <AnimatePresence mode="wait">
                {active ? (
                  <motion.div
                    key={active.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
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
                            color: categoryColors[active.category] || '#929292',
                            textTransform: 'uppercase',
                            fontWeight: 600,
                          }}
                        >
                          {active.category}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '9px',
                          letterSpacing: '0.1em',
                          color: 'rgba(255,255,255,0.3)',
                          textTransform: 'uppercase',
                        }}
                      >
                        {active.category === 'concept' ? 'CONCEPT' : 'TECH STACK'}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '26px',
                        fontWeight: 700,
                        color: '#F5F5F5',
                        marginBottom: '12px',
                        letterSpacing: '-0.02em',
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
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
