import { useEffect, useRef, useState } from 'react';
import { useIsMobile, useReducedMotion } from '../hooks/usePortfolio';

type CursorState = 'default' | 'hover' | 'card' | 'text';

export default function CustomCursor() {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);
  const posRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (isMobile || reduced) return;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      // Detect target element type
      const el = e.target as HTMLElement | null;
      if (!el) return;

      if (el.closest('a, button, [role="button"]')) {
        setCursorState('hover');
      } else if (el.closest('[data-cursor="card"]')) {
        setCursorState('card');
      } else if (el.closest('p, h1, h2, h3, h4, h5, span')) {
        setCursorState('text');
      } else {
        setCursorState('default');
      }
    };

    const onLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const onEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    // Smooth ring follow with RAF
    const animate = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot && ring) {
        // Dot snaps directly
        dot.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`;

        // Ring lags behind smoothly
        ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.14;
        ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.14;
        ring.style.transform = `translate(${ringPosRef.current.x - 20}px, ${ringPosRef.current.y - 20}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, reduced]);

  if (isMobile || reduced) return null;

  const ringSize = cursorState === 'hover' ? 44 : cursorState === 'card' ? 52 : 40;
  const ringOpacity = cursorState === 'hover' ? 0.8 : 0.3;
  const dotSize = cursorState === 'hover' ? 6 : 8;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          borderRadius: '50%',
          backgroundColor: '#C8FF00',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s, width 0.2s, height 0.2s, background-color 0.2s',
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          borderRadius: '50%',
          border: `1.5px solid rgba(200, 255, 0, ${ringOpacity})`,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s, width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s',
          willChange: 'transform',
        }}
      />
    </>
  );
}
