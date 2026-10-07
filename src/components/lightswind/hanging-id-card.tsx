import React, { useRef, useEffect, useCallback, useId, useState } from "react";
import { cn } from "@/lib/utils";

// ─── Physics constants ────────────────────────────────────────────────────────
const SPRING_K = 0;          // Real pendulum relies on gravity
const DAMPING  = 0.92;       // Air resistance for smooth natural swing
const GRAVITY  = 3000;       // Gravity scalar for snappy momentum
const MASS     = 1;
const TAP_IMPULSE = 4.0;     // Angular velocity added by a click / Enter / Space
const NUDGE_IMPULSE = 2.5;   // Angular velocity added by an arrow key

interface CardPhysicsState {
  angle:  number;   // radians from vertical
  vel:    number;   // angular velocity  rad/s
}

export interface HangingIdCardProps {
  /** Card face rendered below the punched lanyard slot */
  children: React.ReactNode;
  /** Accessible name for the draggable card */
  label: string;
  ropeLength?: number;
  ropeColor?: string;
  className?: string;
  cardClassName?: string;
  hint?: string;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ─── SVG Black Lanyard Rope & Metal Lock Clip ──────────────────────────────────
const Lanyard = ({ length, color }: { length: number; color: string }) => {
  const clampY = length;
  const ringY = length + 10;
  const hookY = length + 18;

  return (
    <svg
      aria-hidden
      width="44"
      height={length + 38}
      viewBox={`0 0 44 ${length + 38}`}
      style={{ display: "block", margin: "0 auto", overflow: "visible" }}
    >
      <defs>
        {/* Metal clamp & ring gradient */}
        <linearGradient id="metalDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#71717a" />
          <stop offset="35%" stopColor="#27272a" />
          <stop offset="70%" stopColor="#52525b" />
          <stop offset="100%" stopColor="#18181b" />
        </linearGradient>

        {/* Hook gradient */}
        <linearGradient id="hookDark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#52525b" />
          <stop offset="40%" stopColor="#18181b" />
          <stop offset="100%" stopColor="#3f3f46" />
        </linearGradient>

        {/* Ribbon fabric texture shading */}
        <linearGradient id="strapHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
          <stop offset="25%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="75%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Main Lanyard Ribbon Strap */}
      <rect x="12" y="0" width="20" height={clampY + 4} rx="2" fill={color || "#18181b"} />
      {/* Strap fabric depth shading */}
      <rect x="12" y="0" width="20" height={clampY + 4} rx="2" fill="url(#strapHighlight)" />

      {/* Strap side stitch lines */}
      <line
        x1="13.5" y1="0" x2="13.5" y2={clampY + 4}
        stroke="#ffffff" strokeOpacity="0.15" strokeWidth="0.75" strokeDasharray="3 2"
      />
      <line
        x1="30.5" y1="0" x2="30.5" y2={clampY + 4}
        stroke="#ffffff" strokeOpacity="0.15" strokeWidth="0.75" strokeDasharray="3 2"
      />

      {/* Metallic Ribbon Crimp Clamp (Base of Strap) */}
      <rect
        x="10" y={clampY} width="24" height="10" rx="2.5"
        fill="url(#metalDark)" stroke="#18181b" strokeWidth="0.8"
      />
      {/* Metallic Screws/Rivets on Clamp */}
      <circle cx="13.5" cy={clampY + 5} r="1.3" fill="#a1a1aa" />
      <circle cx="30.5" cy={clampY + 5} r="1.3" fill="#a1a1aa" />

      {/* Swivel Ring Loop */}
      <path
        d={`M 15 ${clampY + 9} C 15 ${ringY + 6}, 29 ${ringY + 6}, 29 ${clampY + 9}`}
        fill="none" stroke="url(#metalDark)" strokeWidth="3" strokeLinecap="round"
      />

      {/* Swivel Joint */}
      <rect x="19" y={ringY + 2} width="6" height="6" rx="1" fill="url(#metalDark)" />

      {/* Metal Snap Hook / Lock Clip */}
      <path
        d={`M 20 ${ringY + 7}
           L 20 ${hookY + 6}
           C 20 ${hookY + 15}, 24 ${hookY + 15}, 24 ${hookY + 6}
           L 24 ${ringY + 7}`}
        fill="none" stroke="url(#hookDark)" strokeWidth="3.5" strokeLinecap="round"
      />

      {/* Spring Clip Latch Lever */}
      <line x1="20.5" y1={hookY + 1} x2="20.5" y2={hookY + 10} stroke="#d4d4d8" strokeWidth="1.2" />
    </svg>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export const HangingIdCard = ({
  children,
  label,
  ropeLength  = 140,
  ropeColor   = "#18181b",
  className,
  cardClassName,
  hint        = "Drag or click the card",
}: HangingIdCardProps) => {
  const physRef      = useRef<CardPhysicsState>({ angle: 0, vel: 0 });
  const rafRef       = useRef<number | null>(null);
  const prevTimeRef  = useRef<number | null>(null);
  const prevAngleRef = useRef<number>(0);
  const isDraggingRef= useRef(false);
  const hintId       = useId();
  // The frame loop re-schedules itself through a ref so `tick` never references itself
  const tickRef      = useRef<FrameRequestCallback | null>(null);
  const loopRef      = useRef<FrameRequestCallback>((now) => tickRef.current?.(now));

  const [angle, setAngle] = useState(0);
  const dragStartX   = useRef(0);
  const dragAngle0   = useRef(0);

  // ── Physics loop ────────────────────────────────────────────────────────────
  const tick = useCallback((now: number) => {
    if (prevTimeRef.current === null) { prevTimeRef.current = now; }
    const dt = Math.min((now - prevTimeRef.current) / 1000, 0.05); // cap at 50ms
    prevTimeRef.current = now;

    const s = physRef.current;
    if (!isDraggingRef.current) {
      // Realistic pendulum: L is approximate center of mass
      const L = ropeLength + 100;
      const torque =
        -(GRAVITY / L)    * Math.sin(s.angle) -
        (DAMPING  / MASS) * s.vel             -
        (SPRING_K / MASS) * s.angle;

      s.vel   += torque * dt;
      s.angle += s.vel  * dt;

      setAngle(s.angle);

      if (Math.abs(s.angle) > 0.001 || Math.abs(s.vel) > 0.001) {
        rafRef.current = requestAnimationFrame(loopRef.current);
      } else {
        // settled perfectly at bottom
        s.angle = 0; s.vel = 0;
        setAngle(0);
      }
    } else {
      // Track velocity while dragging so we can "flick" it
      if (dt > 0) {
        s.vel = (s.angle - prevAngleRef.current) / dt;
      }
      prevAngleRef.current = s.angle;
      rafRef.current = requestAnimationFrame(loopRef.current);
    }
  }, [ropeLength]);

  useEffect(() => { tickRef.current = tick; }, [tick]);

  const startPhysics = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    prevTimeRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const push = useCallback((impulse: number) => {
    if (prefersReducedMotion()) return;
    physRef.current.vel += impulse;
    startPhysics();
  }, [startPhysics]);

  // ── Pointer events ──────────────────────────────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (prefersReducedMotion()) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    isDraggingRef.current = true;
    dragStartX.current   = e.clientX;
    dragAngle0.current   = physRef.current.angle;
    prevAngleRef.current = physRef.current.angle;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    prevTimeRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartX.current;
    const L = ropeLength + 100;
    const newAngle = dragAngle0.current - dx / L;
    const clamped  = Math.max(-1.4, Math.min(1.4, newAngle));
    physRef.current.angle = clamped;
    setAngle(clamped);
  }, [ropeLength]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    isDraggingRef.current = false;
  }, []);

  // ── Click impulse (tap) ─────────────────────────────────────────────────────
  const onCardClick = useCallback(() => {
    if (Math.abs(physRef.current.vel) < 0.1 && Math.abs(physRef.current.angle) < 0.05) {
      push(TAP_IMPULSE);
    }
  }, [push]);

  // ── Keyboard: Enter/Space swing it, arrow keys nudge it ────────────────────
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    const impulses: Record<string, number> = {
      Enter: TAP_IMPULSE,
      " ": TAP_IMPULSE,
      ArrowLeft: NUDGE_IMPULSE,
      ArrowRight: -NUDGE_IMPULSE,
    };
    const impulse = impulses[e.key];
    if (impulse === undefined) return;
    e.preventDefault();
    push(impulse);
  }, [push]);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  const cardRotateDeg = angle * (180 / Math.PI);

  return (
    <div className={cn("flex flex-col items-center select-none", className)}>
      {/* Ceiling anchor pin */}
      <div
        aria-hidden
        className="w-3.5 h-3.5 rounded-full shadow-md z-10 relative bg-zinc-900 border border-zinc-700"
      />

      {/* The Pendulum Assembly (Rope + Lock Clip + Card) */}
      <div
        role="group"
        aria-roledescription="draggable ID card"
        aria-label={label}
        aria-describedby={hintId}
        tabIndex={0}
        className="flex flex-col items-center cursor-grab rounded-2xl active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClick={onCardClick}
        onKeyDown={onKeyDown}
        style={{
          transform: `rotate(${cardRotateDeg}deg)`,
          transformOrigin: "top center",
          willChange: "transform",
          marginTop: "-6px",
          // Horizontal drags swing the card; vertical swipes still scroll the page on touch screens
          touchAction: "pan-y",
        }}
      >
        {/* Lanyard Rope with Lock Clip */}
        <div style={{ pointerEvents: "none" }}>
          <Lanyard length={ropeLength} color={ropeColor} />
        </div>

        {/* ID Card */}
        <div
          className={cn(
            "relative w-52 rounded-2xl overflow-hidden shadow-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 pointer-events-none mt-[-16px]",
            cardClassName,
          )}
        >
          {/* Punched Slot Hole for Lanyard Clip */}
          <div className="flex justify-center pt-2.5 pb-1 bg-zinc-100 dark:bg-zinc-800/80 border-b border-zinc-200/80 dark:border-zinc-800">
            <div className="w-8 h-2.5 rounded-full bg-zinc-950 dark:bg-black border border-zinc-400/50 dark:border-zinc-700 shadow-inner flex items-center justify-center">
              <div className="w-6 h-1 rounded-full bg-zinc-900 dark:bg-zinc-950 opacity-90" />
            </div>
          </div>

          {children}
        </div>
      </div>

      {/* Drag hint (also read as the keyboard instructions) */}
      <p
        aria-hidden
        className="mt-8 text-xs text-muted-foreground font-medium select-none pointer-events-none"
      >
        {hint}
      </p>
      <p id={hintId} className="sr-only">
        {hint}. With the keyboard, press Enter or Space to swing it, or the arrow keys to nudge it.
      </p>
    </div>
  );
};

export default HangingIdCard;
