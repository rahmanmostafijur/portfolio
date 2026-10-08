import { useEffect, useRef } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// Trail dots, nearest first: each one eases towards the one in front of it
const TRAIL = [
  { opacity: 0.4, scale: 0.7 },
  { opacity: 0.3, scale: 0.525 },
  { opacity: 0.2, scale: 0.35 },
  { opacity: 0.1, scale: 0.175 },
];
const TRAIL_EASE = 0.35;
const TURN_EASE = 0.3;
// Pointer movement (px) needed before the arrow turns to face the new direction
const MIN_TURN_DISTANCE = 2;
const INTERACTIVE = 'a, button, [role="button"], label, summary, select';

/**
 * Arrow cursor that turns towards the direction of travel, with a fading dot trail.
 * Only for a mouse on wide screens; skipped for touch and reduced motion.
 */
export default function CustomCursor() {
  const isFinePointer = useMediaQuery('(hover: hover) and (pointer: fine) and (min-width: 768px)');
  const reduceMotion = usePrefersReducedMotion();
  const isEnabled = isFinePointer && !reduceMotion;

  const arrowRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isEnabled) return;
    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const pointer = { x: -100, y: -100 };
    const dots = TRAIL.map(() => ({ x: -100, y: -100 }));
    let last = { ...pointer };
    let angle = 0;
    let targetAngle = 0;
    let isVisible = false;
    let isOverInteractive = false;
    let frame = 0;

    const setVisible = (visible: boolean) => {
      isVisible = visible;
      if (arrowRef.current) arrowRef.current.style.opacity = visible ? '1' : '0';
      dotRefs.current.forEach((dot, i) => {
        if (dot) dot.style.opacity = visible ? String(TRAIL[i].opacity) : '0';
      });
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      isOverInteractive = event.target instanceof Element && event.target.closest(INTERACTIVE) !== null;
      if (!isVisible) {
        // Start the trail under the pointer instead of sweeping in from the corner
        last = { ...pointer };
        dots.forEach((dot) => Object.assign(dot, pointer));
        setVisible(true);
      }
    };
    const onLeave = () => setVisible(false);

    const tick = () => {
      const dx = pointer.x - last.x;
      const dy = pointer.y - last.y;
      if (Math.hypot(dx, dy) > MIN_TURN_DISTANCE) {
        // The arrow points up at 0deg, so add 90 to the travel direction
        targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        last = { ...pointer };
      }
      // Keep turning after the pointer stops, the short way round
      angle += ((((targetAngle - angle + 540) % 360) + 360) % 360 - 180) * TURN_EASE;

      if (arrowRef.current) {
        const scale = isOverInteractive ? 1.2 : 1;
        arrowRef.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${scale})`;
      }

      let lead = pointer;
      dots.forEach((dot, i) => {
        dot.x += (lead.x - dot.x) * TRAIL_EASE;
        dot.y += (lead.y - dot.y) * TRAIL_EASE;
        lead = dot;
        const el = dotRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%) scale(${TRAIL[i].scale})`;
        }
      });

      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      root.classList.remove('has-custom-cursor');
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <div aria-hidden className="pointer-events-none select-none">
      {TRAIL.map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            dotRefs.current[i] = el;
          }}
          className="fixed top-0 left-0 size-2.5 rounded-full bg-primary opacity-0 will-change-transform"
          style={{ zIndex: 9998 - i }}
        />
      ))}
      <div
        ref={arrowRef}
        className="fixed top-0 left-0 z-[9999] text-primary opacity-0 drop-shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-opacity duration-200 will-change-transform"
      >
        <svg width="44" height="47.52" viewBox="0 0 50 54" fill="none" className="drop-shadow-md">
          <path
            d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
            fill="currentColor"
          />
          <path
            d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
}
