# M M Mostafijur Rahman — Portfolio

Personal portfolio of **M M Mostafijur Rahman**, a Full Stack Software Engineer working mainly with Python, FastAPI, React and PostgreSQL.

**Live:** https://mostafij.vercel.app

The site is a single page with sections for About, What I Do, Selected Works, Career, Education, Skills and Contact, plus a small blog. It includes a downloadable resume, a contact form, and light and dark themes.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | React 19, TypeScript, Vite |
| Styling | Tailwind CSS v4 (`@theme` tokens, class-based dark mode) |
| Motion | framer-motion (scroll reveals, dock magnification, ID card physics) |
| Routing | react-router-dom (`/`, `/blog`, `/blog/:slug`, redirects for old URLs) |
| UI components | [Lightswind UI](https://lightswind.com) (MIT), copied into `src/components/lightswind/` and adapted |
| Icons | lucide-react, plus tech logos from [simple-icons](https://simpleicons.org) (CC0) |
| Contact form | [Web3Forms](https://web3forms.com), with a mailto fallback |
| Hosting | Vercel |

## Features

- Light and dark themes that follow the OS setting on a first visit, remember the visitor's choice and load without a flash
- Accessible by default: semantic landmarks, a skip link, visible focus states, labelled icon buttons, and full keyboard support (including the draggable ID card and the dock)
- Respects `prefers-reduced-motion`: reveals, the marquee, dock magnification and the card swing all switch off
- Performance: self-hosted fonts, a lazy-loaded hero card, WebP images with explicit sizes, and local SVG logos
- SEO: meta description, canonical URLs, Open Graph and Twitter cards, JSON-LD, `robots.txt` and `sitemap.xml`

## Project structure

```
src/
  data/profile.ts         All site content (edit text here, not in components)
  data/blog.ts            Blog posts
  data/techIcons.ts       Logo file for each skill
  components/sections/    One component per page section (Hero, About, Projects, ...)
  components/layout/      Navbar, Dock, Footer, Section wrapper, scroll handling
  components/lightswind/  Adapted Lightswind components (ID card, dock, marquee, theme toggle)
  components/ui/          Small shared pieces (Reveal, SocialIcon)
  hooks/                  Section navigation, active section, page meta, media query
  lib/                    Theme storage, contact form logic, class-name helper
  pages/                  Home, Blog, Blog post, 404
public/
  images/                 Profile photo and project screenshots (WebP)
  tech/                   Tech logo SVGs
  Mostafijur_Rahman_CV.pdf
vercel.json               Redirects for old URLs and the single-page-app rewrite
```

## Editing content

Almost everything you see is in `src/data/profile.ts`: name, tagline, About text, services, projects, career, education, skills and section headings. Blog posts live in `src/data/blog.ts`.

To turn on direct sending for the contact form, set `web3formsAccessKey` in `src/data/profile.ts` to your Web3Forms access key. The key is public by design. Until it is set, the form opens the visitor's email app with the message filled in.

## Running locally

Requires Node.js 20.19+ or 22.12+ (needed by Vite 8).

```bash
npm install
npm run dev       # http://localhost:5173
npm run lint
npm run build     # type-check and build to dist/
npm run preview   # serve the production build at http://localhost:4173
```

## Deployment

The `main` branch deploys automatically to Vercel, and other branches get preview deployments. `vercel.json` redirects the old multi-page URLs (`/about`, `/projects`, `/contact`, ...) to their sections, and rewrites every other path to `index.html` so blog links work when opened directly.
