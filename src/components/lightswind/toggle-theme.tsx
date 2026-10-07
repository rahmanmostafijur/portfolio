import { useCallback, useEffect, useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { flushSync } from 'react-dom';

import { cn } from '@/lib/utils';
import { saveTheme } from '@/lib/theme';

interface ToggleThemeProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'onClick'> {
  /** Duration of the circle-spread reveal in ms */
  duration?: number;
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const ToggleTheme = ({ className, duration = 400, ...props }: ToggleThemeProps) => {
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Stay in sync with the class set by the inline script in index.html
  useEffect(() => {
    const updateTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = useCallback(async () => {
    const applyTheme = () => {
      const next = !isDark;
      setIsDark(next);
      document.documentElement.classList.toggle('dark', next);
      saveTheme(next);
    };

    // No View Transitions support or reduced motion: switch instantly
    if (!document.startViewTransition || prefersReducedMotion() || !buttonRef.current) {
      applyTheme();
      return;
    }

    await document.startViewTransition(() => flushSync(applyTheme)).ready;

    // Circle-spread reveal from the button's centre
    const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top),
    );

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
      },
      { duration, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' },
    );
  }, [isDark, duration]);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      className={cn(
        'glass-panel inline-flex size-10 items-center justify-center rounded-full text-foreground transition-transform duration-300 hover:scale-105',
        className,
      )}
      {...props}
    >
      {isDark ? (
        <Sun aria-hidden className="size-[18px] text-amber-300" />
      ) : (
        <Moon aria-hidden className="size-[18px] text-violet-600" />
      )}
    </button>
  );
};

