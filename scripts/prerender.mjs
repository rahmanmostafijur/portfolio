// Writes static HTML for each route after `vite build` so the first paint does not wait for JavaScript.
// The client then hydrates this markup (see src/main.tsx).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const serverEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const { render, prerenderRoutes, siteUrl } = await import(pathToFileURL(serverEntry).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const escapeAttr = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const escapeText = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function replaceOrFail(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`prerender: ${label} not found in index.html`);
  return html.replace(pattern, replacement);
}

function withRouteMeta(html, route) {
  const url = new URL(route.path, siteUrl).toString();
  const title = escapeAttr(route.title);
  const description = escapeAttr(route.description);
  const tags = [
    [/<title>[^<]*<\/title>/, `<title>${escapeText(route.title)}</title>`, 'title'],
    [/(<meta name="description" content=")[^"]*(")/, `$1${description}$2`, 'description'],
    [/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`, 'canonical'],
    [/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`, 'og:title'],
    [/(<meta property="og:description" content=")[^"]*(")/, `$1${description}$2`, 'og:description'],
    [/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`, 'og:url'],
    [/(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`, 'twitter:title'],
    [/(<meta name="twitter:description" content=")[^"]*(")/, `$1${description}$2`, 'twitter:description'],
  ];
  return tags.reduce((acc, [pattern, replacement, label]) => replaceOrFail(acc, pattern, replacement, label), html);
}

for (const route of prerenderRoutes) {
  const appHtml = await render(route.path);
  const html = replaceOrFail(
    withRouteMeta(template, route),
    /<div id="root"><\/div>/,
    `<div id="root" data-prerendered="${escapeAttr(route.path)}">${appHtml}</div>`,
    'root element',
  );

  const outDir = route.path === '/' ? dist : path.join(dist, ...route.path.split('/').filter(Boolean));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
  console.log(`prerendered ${route.path}`);
}
