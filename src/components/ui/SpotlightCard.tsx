import { useRef, type PointerEvent, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightCardProps {
  className?: string;
  children: ReactNode;
}

const layerClass =
  'pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100';

/**
 * Card with a violet-to-sky glow that follows the mouse while hovered.
 * The pointer position is written to CSS variables, so moving never re-renders React.
 */
export default function SpotlightCard({ className, children }: SpotlightCardProps) {
  const ref = useRef<HTMLElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    ref.current.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  };

  return (
    <article
      ref={ref}
      onPointerMove={handlePointerMove}
      className={cn('group relative overflow-hidden', className)}
    >
      <div
        aria-hidden
        className={layerClass}
        style={{
          background:
            'radial-gradient(300px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(139, 92, 246, 0.12), transparent 75%)',
        }}
      />
      <div
        aria-hidden
        className={layerClass}
        style={{
          background:
            'radial-gradient(300px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgb(139, 92, 246), rgb(56, 189, 248), transparent 70%)',
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </article>
  );
}
