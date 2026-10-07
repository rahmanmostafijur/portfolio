import React, { useState } from "react";
import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SlidingLogoMarqueeItem {
  id: string;
  content: React.ReactNode;
}

export interface SlidingLogoMarqueeProps {
  items: SlidingLogoMarqueeItem[];
  /** Accessible name for the list of items */
  label: string;
  /** Seconds for one full loop */
  duration?: number;
  className?: string;
  itemClassName?: string;
}

/**
 * Infinite horizontal marquee: the list is rendered twice and the track slides by -50%.
 * Pauses on hover/focus and via its own button; renders a static wrapped list under reduced motion.
 */
export function SlidingLogoMarquee({
  items,
  label,
  duration = 40,
  className,
  itemClassName,
}: SlidingLogoMarqueeProps) {
  const reduceMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);

  const renderList = (isDuplicate: boolean) => (
    <ul
      aria-label={isDuplicate ? undefined : label}
      aria-hidden={isDuplicate || undefined}
      className="flex shrink-0 items-center gap-6 py-1 pr-6"
    >
      {items.map((item) => (
        <li key={item.id} className={itemClassName}>
          {item.content}
        </li>
      ))}
    </ul>
  );

  if (reduceMotion) {
    return (
      <ul aria-label={label} className={cn("flex flex-wrap justify-center gap-3", className)}>
        {items.map((item) => (
          <li key={item.id} className={itemClassName}>
            {item.content}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={cn("group/marquee relative flex items-center gap-3", className)}>
      <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div
          className="flex w-max animate-[marquee-x_var(--marquee-duration)_linear_infinite] group-focus-within/marquee:[animation-play-state:paused] group-hover/marquee:[animation-play-state:paused]"
          style={
            {
              "--marquee-duration": `${duration}s`,
              animationPlayState: isPaused ? "paused" : undefined,
            } as React.CSSProperties
          }
        >
          {renderList(false)}
          {renderList(true)}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsPaused((p) => !p)}
        aria-label={isPaused ? "Play tech list animation" : "Pause tech list animation"}
        aria-pressed={isPaused}
        className="glass-panel flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
      >
        {isPaused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
      </button>
    </div>
  );
}

