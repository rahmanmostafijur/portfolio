import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import type { SectionId } from '@/data/profile';

/** Returns a function that scrolls to a home-page section, navigating back to `/` first when on another page. */
export function useSectionNavigation(): (id: SectionId) => void {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  return useCallback(
    (id: SectionId) => {
      const targetHash = `#${id}`;

      // Same URL: the router won't fire a change, so scroll directly
      if (pathname === '/' && hash === targetHash) {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
        return;
      }

      navigate({ pathname: '/', hash: targetHash });
    },
    [pathname, hash, navigate, reduceMotion],
  );
}
