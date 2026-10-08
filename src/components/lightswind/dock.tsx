import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const SPRING = { mass: 0.1, stiffness: 150, damping: 12 };

export interface DockItemData {
  id: string;
  icon: React.ReactNode;
  label: string;
  href: string;
  onSelect: () => void;
  /** Marks the current location; rendered as aria-current */
  current?: "page" | "location";
}

interface DockProps {
  items: DockItemData[];
  /** Accessible name for the dock navigation landmark */
  label: string;
  className?: string;
  /** Idle size of each item in px */
  baseItemSize?: number;
  /** Size in px an item grows to under the pointer */
  magnification?: number;
  /** Distance in px over which magnification spreads to neighbours */
  distance?: number;
  /** Slide the dock out of view and take it out of the tab order */
  isHidden?: boolean;
}

function useDockItemSize(
  mouseX: MotionValue<number>,
  ref: React.RefObject<HTMLAnchorElement | null>,
  baseItemSize: number,
  magnification: number,
  distance: number,
) {
  const mouseDistance = useTransform(mouseX, (x) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || !Number.isFinite(x)) return distance;
    return x - rect.x - rect.width / 2;
  });
  const target = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  return useSpring(target, SPRING);
}

interface DockItemProps {
  item: DockItemData;
  mouseX: MotionValue<number>;
  baseItemSize: number;
  magnification: number;
  distance: number;
}

function DockItem({ item, mouseX, baseItemSize, magnification, distance }: DockItemProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const size = useDockItemSize(mouseX, ref, baseItemSize, magnification, distance);
  const [showLabel, setShowLabel] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Let modified clicks (new tab/window) behave like normal links
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    item.onSelect();
  };

  return (
    <motion.a
      ref={ref}
      href={item.href}
      onClick={handleClick}
      aria-label={item.label}
      aria-current={item.current}
      style={{ width: size, height: size }}
      onHoverStart={() => setShowLabel(true)}
      onHoverEnd={() => setShowLabel(false)}
      onFocus={() => setShowLabel(true)}
      onBlur={() => setShowLabel(false)}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full border shadow-sm transition-colors",
        item.current
          ? "border-transparent bg-brand-gradient text-white"
          : "border-foreground/10 bg-background/80 text-muted-foreground hover:text-foreground",
      )}
    >
      {item.icon}
      {showLabel && (
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 rounded-md bg-foreground px-2 py-0.5 text-xs font-medium whitespace-nowrap text-background shadow"
        >
          {item.label}
        </span>
      )}
    </motion.a>
  );
}

/**
 * macOS-style dock: items grow as the pointer approaches.
 * Magnification is off for reduced motion and touch screens; items are real links.
 */
export default function Dock({
  items,
  label,
  className,
  baseItemSize = 44,
  magnification = 60,
  distance = 140,
  isHidden = false,
}: DockProps) {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  const reduceMotion = useReducedMotion();
  const canMagnify = !reduceMotion;

  return (
    <nav
      aria-label={label}
      inert={isHidden}
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-3 z-40 flex justify-center px-2 transition-all duration-300 ease-out",
        isHidden && "translate-y-[150%] opacity-0",
        className,
      )}
    >
      <ul
        onPointerMove={(event) => {
          if (canMagnify && event.pointerType === "mouse") mouseX.set(event.clientX);
        }}
        onPointerLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
        className={cn("glass-panel glass-blur flex items-end gap-1 rounded-[1.75rem] p-2 shadow-xl sm:gap-2", !isHidden && "pointer-events-auto")}
        style={{ height: baseItemSize + 18 }}
      >
        {items.map((item) => (
          <li key={item.id} className="flex">
            <DockItem
              item={item}
              mouseX={mouseX}
              baseItemSize={baseItemSize}
              magnification={canMagnify ? magnification : baseItemSize}
              distance={distance}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

