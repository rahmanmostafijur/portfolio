import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import App from '@/App';
import { blogPosts } from '@/data/blog';
import { profile, seo } from '@/data/profile';

export interface PrerenderRoute {
  path: string;
  title: string;
  description: string;
}

/** Pages written to static HTML at build time (see scripts/prerender.mjs). */
export const prerenderRoutes: PrerenderRoute[] = [
  { path: '/', title: seo.title, description: seo.description },
  {
    path: '/blog',
    title: `Blog — ${profile.name}`,
    description: "Notes on backend engineering, data pipelines and the projects I'm building.",
  },
  ...blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    title: `${post.title} — ${profile.name}`,
    description: post.excerpt,
  })),
];

export const siteUrl = profile.siteUrl;

/** Renders a route to HTML, waiting for lazy components so the markup is complete. */
export async function render(path: string): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={path}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
  const reader = prelude.getReader();
  const decoder = new TextDecoder();
  let html = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    html += decoder.decode(value, { stream: true });
  }
  return html + decoder.decode();
}
