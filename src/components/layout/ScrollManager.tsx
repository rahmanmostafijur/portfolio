import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';

/** Scrolls to the URL hash target (e.g. after a legacy-route redirect), or to the top on a page change. */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    let id: string;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [pathname, hash, reduceMotion]);

  return null;
}
