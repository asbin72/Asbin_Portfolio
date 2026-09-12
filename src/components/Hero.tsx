import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { personal, heroStack } from '../data/portfolio';
import { useReducedMotion, useIsMobile } from '../hooks/usePortfolio';

// Canvas-based architecture background
function ArchBackground({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const nodesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number }>>([]);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize nodes
    const nodeCount = window.innerWidth < 768 ? 20 : 40;
    nodesRef.current = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
    }));

    if (reduced) {
      // Just draw static state
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodesRef.current.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200,255,0,0.15)';
        ctx.fill();
      });
      return () => window.removeEventListener('resize', resize);
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodes = nodesRef.current;
      const mx = (mouseX / window.innerWidth) * canvas.width;
      const my = (mouseY / window.innerHeight) * canvas.height;

      // Update positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Subtle mouse repulsion
        const dx = node.x - mx;
        const dy = node.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          node.x += (dx / dist) * 0.4;
          node.y += (dy / dist) * 0.4;
        }
      });

      // Draw connections
      const maxDist = 160;
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(200,255,0,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // Draw nodes
      nodes.forEach((node) => {
        const dx = node.x - mx;
        const dy = node.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const brightness = dist < 150 ? 0.5 : 0.15;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,255,0,${brightness})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [mouseX, mouseY, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}

// Magnetic CTA Button
function MagneticButton({
  children,
  href,
  onClick,
  primary = false,
  onPlayHover,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  primary?: boolean;
  onPlayHover?: () => void;
}) {
  const btnRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const isMobile = useIsMobile();

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (isMobile) return;
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  }, [isMobile]);

  const onMouseLeave = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.style.transform = 'translate(0, 0)';
    btn.style.transition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1)';
  }, []);

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: primary ? '12px 26px' : '11px 20px',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '12px',
    letterSpacing: '0.12em',
    textDecoration: 'none',
    borderRadius: '3px',
    border: primary ? 'none' : '1px solid rgba(255,255,255,0.15)',
    backgroundColor: primary ? '#C8FF00' : 'transparent',
    color: primary ? '#070707' : '#F5F5F5',
    fontWeight: primary ? 700 : 500,
    cursor: 'none',
    transition: 'background-color 0.2s, border-color 0.2s, color 0.2s, transform 0.1s',
    willChange: 'transform',
  };

  const hoverStyle = primary
    ? { backgroundColor: '#d4ff1a' }
    : { borderColor: 'rgba(255,255,255,0.4)', backgroundColor: 'rgba(255,255,255,0.04)' };

  const commonProps = {
    onMouseMove,
    onMouseLeave,
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      onPlayHover?.();
      const el = e.currentTarget as HTMLElement;
      if (primary) el.style.backgroundColor = hoverStyle.backgroundColor!;
      else {
        el.style.borderColor = hoverStyle.borderColor!;
        el.style.backgroundColor = hoverStyle.backgroundColor!;
      }
      el.style.transition = 'transform 0.1s';
    },
    onMouseOut: (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget as HTMLElement;
      el.style.backgroundColor = primary ? '#C8FF00' : 'transparent';
      el.style.borderColor = primary ? 'none' : 'rgba(255,255,255,0.15)';
    },
  };

  if (href) {
    return (
      <a
        ref={btnRef as React.Ref<HTMLAnchorElement>}
        href={href}
        style={style}
        {...commonProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as unknown as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      style={style}
      {...commonProps}
    >
      {children}
    </button>
  );
}

interface HeroProps {
  onPlayClick?: () => void;
  onPlayHover?: () => void;
}

export default function Hero({ onPlayClick, onPlayHover }: HeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState('');
  const reduced = useReducedMotion();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const handler = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, [reduced]);

  const handleWorkClick = () => {
    onPlayClick?.();
    document.getElementById('project')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: '#070707' }}
      aria-label="Hero section"
    >
      {/* Architecture background */}
      {!reduced && (
        <ArchBackground mouseX={mousePos.x} mouseY={mousePos.y} />
      )}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />

      {/* Radial gradient center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,255,0,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10 pt-28 pb-20">
        {/* Two-column grid: content left, photo right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-112px)]">

          {/* LEFT: Text content */}
          <div className="flex flex-col justify-center">
            {/* Status badge with Live Time */}
            <motion.div
              className="flex flex-wrap items-center gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="inline-flex items-center gap-2 label-style py-1 px-2.5 rounded border border-white/10 bg-white/5 backdrop-blur-sm"
                style={{ color: '#929292' }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: '#C8FF00', boxShadow: '0 0 8px #C8FF00' }}
                />
                AVAILABLE FOR ROLES
              </span>

              {currentTime && (
                <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] text-neutral-400 py-1 px-2.5 rounded border border-white/5 bg-white/[0.02]">
                  <span className="text-[#C8FF00]">IST</span> {currentTime}
                </span>
              )}
            </motion.div>

            {/* Main headline */}
            <div className="mb-6">
              <motion.h1
                className="leading-none tracking-tight"
                style={{
                  fontSize: 'clamp(42px, 7vw, 100px)',
                  fontWeight: 700,
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: '#F5F5F5',
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                ASBIN{' '}
                <span style={{ color: '#C8FF00' }}>T S</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2
                  className="leading-none tracking-tight mt-1"
                  style={{
                    fontSize: 'clamp(42px, 7vw, 100px)',
                    fontWeight: 700,
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: '#929292',
                  }}
                >
                  SOFTWARE
                  <br />
                  DEVELOPER
                </h2>
              </motion.div>
            </div>

            <motion.p
              className="mb-7 max-w-md"
              style={{
                fontSize: 'clamp(15px, 1.8vw, 18px)',
                color: '#929292',
                fontWeight: 400,
                lineHeight: 1.7,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {personal.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-3"
              style={{ marginBottom: '28px' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagneticButton onClick={handleWorkClick} primary onPlayHover={onPlayHover}>
                EXPLORE MY WORK
                <ArrowUpRight size={13} />
              </MagneticButton>
              <MagneticButton href={`mailto:${personal.email}`} onPlayHover={onPlayHover}>
                GET IN TOUCH
                <ArrowUpRight size={13} />
              </MagneticButton>
            </motion.div>

            {/* Thin separator */}
            <motion.div
              style={{
                height: '1px',
                backgroundColor: 'rgba(255,255,255,0.08)',
                maxWidth: '360px',
                transformOrigin: 'left',
                marginBottom: '24px',
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.65, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            />

            {/* Stack pills */}
            <motion.div
              className="flex flex-col gap-2.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <span
                className="label-style flex items-center gap-1.5"
                style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px' }}
              >
                <Sparkles size={11} className="text-[#C8FF00]" />
                CORE TECH STACK
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {heroStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.05, borderColor: '#C8FF00' }}
                  >
                    <span
                      onMouseEnter={() => onPlayHover?.()}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '11px',
                        letterSpacing: '0.06em',
                        color: '#929292',
                        border: '1px solid rgba(255,255,255,0.08)',
                        padding: '4px 12px',
                        borderRadius: '3px',
                        backgroundColor: 'rgba(255,255,255,0.02)',
                        display: 'inline-block',
                        transition: 'all 0.2s',
                        cursor: 'none',
                      }}
                      className="hover:text-white hover:border-[#C8FF00]/40 hover:bg-[#C8FF00]/5"
                    >
                      {tech}
                    </span>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Profile photo */}
          <motion.div
            className="hidden lg:flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div
                className="absolute -inset-4 rounded-2xl pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.08) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
                aria-hidden="true"
              />

              {/* Corner accent — top-left */}
              <div
                className="absolute -top-3 -left-3 pointer-events-none"
                aria-hidden="true"
              >
                <svg width="24" height="24" fill="none">
                  <path d="M1 23V1h22" stroke="#C8FF00" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Corner accent — bottom-right */}
              <div
                className="absolute -bottom-3 -right-3 pointer-events-none"
                aria-hidden="true"
              >
                <svg width="24" height="24" fill="none">
                  <path d="M23 1v22H1" stroke="#C8FF00" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Photo container */}
              <div
                className="relative overflow-hidden"
                style={{
                  width: 'clamp(280px, 28vw, 420px)',
                  aspectRatio: '3 / 4',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,255,0,0.06)',
                }}
              >
                {/* Dark overlay gradient on bottom for name display */}
                <div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(7,7,7,0.75) 0%, transparent 45%)',
                  }}
                  aria-hidden="true"
                />

                {/* The photo */}
                <picture>
                  <source srcSet="/asbin.webp" type="image/webp" />
                  <img
                    src="/asbin.jpg"
                    alt="Asbin T S — Software Developer"
                    width="420"
                    height="560"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      display: 'block',
                      filter: 'contrast(1.04) brightness(0.97)',
                    }}
                    loading="eager"
                  />
                </picture>

                {/* Name overlay at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-20 p-6"
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px',
                      letterSpacing: '0.2em',
                      color: '#C8FF00',
                      marginBottom: '4px',
                    }}
                  >
                    SOFTWARE DEVELOPER
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#F5F5F5',
                      letterSpacing: '0.03em',
                    }}
                  >
                    Asbin T S
                  </div>
                </div>
              </div>

              {/* Floating accent badge — top right */}
              <motion.div
                className="absolute -top-4 -right-4 z-30"
                animate={reduced ? {} : { y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div
                  style={{
                    backgroundColor: '#C8FF00',
                    color: '#070707',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    boxShadow: '0 8px 24px rgba(200,255,0,0.3)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  OPEN TO WORK
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          className="w-px h-12"
          style={{ backgroundColor: 'rgba(200,255,0,0.3)' }}
          animate={reduced ? {} : { scaleY: [1, 0.5, 1], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.2em',
            color: '#929292',
          }}
        >
          SCROLL
        </span>
      </motion.div>
    </section>
  );
}
