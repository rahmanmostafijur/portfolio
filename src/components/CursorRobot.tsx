import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

/**
 * Original cursor-tracking robot, drawn as inline SVG.
 * Head, eyes and body lean toward the pointer wherever it is on the page.
 */
export default function CursorRobot() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 110, damping: 18, mass: 0.5 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  const headRotate = useTransform(sx, [-1, 1], [-10, 10]);
  const headX = useTransform(sx, [-1, 1], [-10, 10]);
  const headY = useTransform(sy, [-1, 1], [-7, 7]);
  const eyeX = useTransform(sx, [-1, 1], [-6, 6]);
  const eyeY = useTransform(sy, [-1, 1], [-4, 4]);
  const bodyX = useTransform(sx, [-1, 1], [-5, 5]);
  const bodyRotate = useTransform(sx, [-1, 1], [-3, 3]);
  const glowX = useTransform(sx, [-1, 1], [-24, 24]);

  useEffect(() => {
    if (reduceMotion) return;

    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      px.set(Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2))));
      py.set(Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2))));
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [px, py, reduceMotion]);

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/8 bg-ink-700"
    >
      <motion.div
        aria-hidden
        style={{ x: glowX }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-brand/12 blur-[70px]"
      />

      <svg
        viewBox="0 0 320 240"
        className="relative size-full"
        role="img"
        aria-label="Robot illustration that follows the cursor"
      >
        <defs>
          <linearGradient id="botBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a3d3d" />
            <stop offset="100%" stopColor="#1e2020" />
          </linearGradient>
          <linearGradient id="botHead" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#454949" />
            <stop offset="100%" stopColor="#242727" />
          </linearGradient>
          <radialGradient id="eyeGlow">
            <stop offset="0%" stopColor="var(--color-cyan-brand)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--color-cyan-brand)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="160" cy="214" rx="66" ry="9" fill="#000" opacity="0.45" />

        <motion.g style={{ x: bodyX, rotate: bodyRotate, transformOrigin: "160px 200px" }}>
          <rect x="112" y="132" width="96" height="72" rx="26" fill="url(#botBody)" stroke="rgba(255,255,255,0.09)" />
          <rect x="146" y="150" width="28" height="8" rx="4" fill="rgba(255,255,255,0.10)" />
          <circle cx="160" cy="176" r="9" fill="var(--color-amber-brand)" opacity="0.85" />
          <circle cx="160" cy="176" r="16" fill="var(--color-amber-brand)" opacity="0.12" />
          <rect x="86" y="138" width="20" height="52" rx="10" fill="url(#botBody)" stroke="rgba(255,255,255,0.07)" />
          <rect x="214" y="138" width="20" height="52" rx="10" fill="url(#botBody)" stroke="rgba(255,255,255,0.07)" />
        </motion.g>

        <rect x="150" y="120" width="20" height="18" rx="7" fill="#2b2e2e" />

        <motion.g style={{ x: headX, y: headY, rotate: headRotate, transformOrigin: "160px 120px" }}>
          <rect x="102" y="44" width="116" height="80" rx="30" fill="url(#botHead)" stroke="rgba(255,255,255,0.12)" />
          <rect x="116" y="62" width="88" height="44" rx="20" fill="#111414" stroke="rgba(255,255,255,0.06)" />

          <motion.g style={{ x: eyeX, y: eyeY }}>
            <circle cx="142" cy="84" r="16" fill="url(#eyeGlow)" />
            <circle cx="178" cy="84" r="16" fill="url(#eyeGlow)" />
            <circle cx="142" cy="84" r="6.5" fill="var(--color-cyan-brand)" />
            <circle cx="178" cy="84" r="6.5" fill="var(--color-cyan-brand)" />
          </motion.g>

          <line x1="160" y1="44" x2="160" y2="26" stroke="rgba(255,255,255,0.25)" strokeWidth="3" strokeLinecap="round" />
          <motion.circle
            cx="160"
            cy="22"
            r="6"
            fill="var(--color-amber-brand)"
            animate={reduceMotion ? undefined : { opacity: [1, 0.35, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <rect x="94" y="74" width="10" height="24" rx="5" fill="#2b2e2e" />
          <rect x="216" y="74" width="10" height="24" rx="5" fill="#2b2e2e" />
        </motion.g>
      </svg>
    </div>
  );
}
