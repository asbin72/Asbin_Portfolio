import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks/usePortfolio';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<'name' | 'status' | 'done'>('name');
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setPhase('status'), 700);
    const t2 = setTimeout(() => setPhase('done'), 1600);
    const t3 = setTimeout(() => onComplete(), 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete, reduced]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: '#070707' }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } }}
        >
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(200,255,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          <div className="relative flex flex-col items-center gap-6">
            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="text-[clamp(32px,6vw,64px)] font-bold tracking-[0.2em]"
                style={{ color: '#F5F5F5', fontFamily: "'Space Grotesk', sans-serif" }}
              >
                ASBIN
                <span style={{ color: '#C8FF00' }}>.TS</span>
              </span>
            </motion.div>

            {/* Status line */}
            <AnimatePresence>
              {phase === 'status' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3"
                >
                  <span
                    className="text-xs tracking-[0.25em] uppercase"
                    style={{ color: '#929292', fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    INITIALIZING SYSTEM
                  </span>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        style={{ color: '#C8FF00', fontFamily: "'JetBrains Mono', monospace", fontSize: '14px' }}
                      >
                        .
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress bar */}
            <motion.div
              className="w-48 h-px overflow-hidden"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="h-full"
                style={{ backgroundColor: '#C8FF00' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
