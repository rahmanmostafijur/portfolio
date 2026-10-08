import { useCallback, useSyncExternalStore } from 'react';

/** True once the page has scrolled more than `offset` px. Always false on the server. */
export function useScrolledPast(offset: number): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener('scroll', onChange, { passive: true });
    return () => window.removeEventListener('scroll', onChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > offset,
    () => false,
  );
}
