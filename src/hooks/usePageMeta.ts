import { useEffect } from 'react';
import { profile, seo } from '@/data/profile';

interface PageMeta {
  title?: string;
  description?: string;
  /** Path for the canonical URL, e.g. "/blog" */
  path?: string;
  noIndex?: boolean;
}

function setMeta(selector: string, attr: 'content' | 'href', value: string): () => void {
  const el = document.head.querySelector<HTMLElement>(selector);
  if (!el) return () => {};
  const previous = el.getAttribute(attr) ?? '';
  el.setAttribute(attr, value);
  return () => el.setAttribute(attr, previous);
}

/** Updates the title, description, canonical and social tags for a route; restores them on leave. */
export function usePageMeta({
  title,
  description = seo.description,
  path = '/',
  noIndex = false,
}: PageMeta): void {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${profile.name}` : seo.title;
    const url = new URL(path, profile.siteUrl).toString();
    const previousTitle = document.title;
    document.title = fullTitle;

    const restores = [
      setMeta('meta[name="description"]', 'content', description),
      setMeta('link[rel="canonical"]', 'href', url),
      setMeta('meta[property="og:title"]', 'content', fullTitle),
      setMeta('meta[property="og:description"]', 'content', description),
      setMeta('meta[property="og:url"]', 'content', url),
      setMeta('meta[name="twitter:title"]', 'content', fullTitle),
      setMeta('meta[name="twitter:description"]', 'content', description),
    ];

    let robots: HTMLMetaElement | null = null;
    if (noIndex) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      robots.content = 'noindex';
      document.head.appendChild(robots);
    }

    return () => {
      document.title = previousTitle;
      restores.forEach((restore) => restore());
      robots?.remove();
    };
  }, [title, description, path, noIndex]);
}
