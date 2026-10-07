import { useEffect, useState } from 'react';
import type { SectionId } from '@/data/profile';

/**
 * Tracks which section crosses the middle band of the viewport.
 * Returns null when none of the sections are on the page (e.g. on /blog).
 */
export function useActiveSection(ids: readonly SectionId[], enabled: boolean): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id as SectionId);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, enabled]);

  return enabled ? active : null;
}
