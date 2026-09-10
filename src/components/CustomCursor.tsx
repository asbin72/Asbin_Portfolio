import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '../hooks/usePortfolio';

type CursorState = 'default' | 'hover' | 'card' | 'text';

export default function CustomCursor() {
  const isMobile = useIsMobile();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isVisible, setIsVisible] = useState(false);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Detect target element type
      const el = e.target as HTMLElement;
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

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    // Smooth ring follow with RAF
    const animate = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Dot snaps directly
      dot.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`;

      // Ring lags behind
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.12;
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.12;
      ring.style.transform = `translate(${ringPosRef.current.x - 20}px, ${ringPosRef.current.y - 20}px)`;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile, isVisible]);

  if (isMobile) return null;

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
