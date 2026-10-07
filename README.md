# M M Mostafijur Rahman — Portfolio

Personal portfolio of **M M Mostafijur Rahman**, a Full Stack Software Engineer working mainly with Python, FastAPI, React and PostgreSQL.

**Live:** https://mostafij.vercel.app

The site is a single page with sections for About, What I Do, Selected Works, Career, Education, Skills and Contact, plus a small blog. It includes a downloadable resume, a contact form, and light and dark themes.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | React 19, TypeScript, Vite (pages prerendered to static HTML at build time) |
| Styling | Tailwind CSS v4 (`@theme` tokens, class-based dark mode) |
| Motion | CSS transitions and IntersectionObserver; framer-motion only for the dock magnification |
| Routing | react-router-dom (`/`, `/blog`, `/blog/:slug`, redirects for old URLs) |
| UI components | [Lightswind UI](https://lightswind.com) (MIT), copied into `src/components/lightswind/` and adapted |
| Icons | lucide-react, plus tech logos from [simple-icons](https://simpleicons.org) (CC0) |
| Font | [Geist](https://github.com/vercel/geist-font) (SIL OFL 1.1), self-hosted |
| Contact form | Vercel serverless function (`api/contact.ts`) sending through SMTP with nodemailer, with a mailto fallback |
| Hosting | Vercel |

## Features

- Light and dark themes that follow the OS setting on a first visit, remember the visitor's choice and load without a flash
- Accessible by default: semantic landmarks, a skip link, visible focus states, labelled icon buttons, and full keyboard support (including the draggable ID card and the dock)
- Respects `prefers-reduced-motion`: reveals, the marquee, dock magnification and the card swing all switch off
- Performance: prerendered HTML, a small entry script that loads the app after first paint, a preloaded self-hosted font, deferred rendering of below-the-fold sections, WebP images with explicit sizes, and local SVG logos
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
  main.tsx / bootstrap.tsx  Tiny entry, then the app (hydrates prerendered pages)
  entry-server.tsx        Server render used by the prerender step
scripts/prerender.mjs     Writes static HTML for /, /blog and each post after the build
public/
  images/                 Profile photo and project screenshots (WebP)
  tech/                   Tech logo SVGs
  fonts/                  Geist font file and licence
  Mostafijur_Rahman_CV.pdf
api/contact.ts            Serverless function that emails contact-form messages over SMTP
vercel.json               Redirects for old URLs and the single-page-app rewrite
```

## Editing content

Almost everything you see is in `src/data/profile.ts`: name, tagline, About text, services, projects, career, education, skills and section headings. Blog posts live in `src/data/blog.ts`.

## Contact form (SMTP)

The form posts to `/api/contact`, a Vercel function that sends the message to your inbox over SMTP. The visitor's address is set as Reply-To, so you can answer with a normal reply. Set these environment variables in Vercel (Project Settings → Environment Variables), then redeploy:

| Variable | Example | Notes |
| --- | --- | --- |
| `SMTP_HOST` | `smtp.gmail.com` | Your provider's SMTP server |
| `SMTP_PORT` | `465` | 465 uses TLS; 587 uses STARTTLS |
| `SMTP_USER` | `you@gmail.com` | Also used as the From address |
| `SMTP_PASS` | App Password | For Gmail, turn on 2-Step Verification and create an [App Password](https://myaccount.google.com/apppasswords) |
| `CONTACT_TO_EMAIL` | `you@gmail.com` | Optional. Defaults to `SMTP_USER` |

See `.env.example`. If sending fails, the form shows an error with a link that opens the visitor's email app with the message filled in. `npm run dev` doesn't run the function; use `npx vercel dev` to test the form locally.

## Running locally

Requires Node.js 20.19+ or 22.12+ (needed by Vite 8).

```bash
npm install
npm run dev       # http://localhost:5173
npm run lint
npm run build     # type-check, build to dist/ and prerender the pages
npm run preview   # serve the production build at http://localhost:4173
```

## Deployment

The `main` branch deploys automatically to Vercel, and other branches get preview deployments. `vercel.json` redirects the old multi-page URLs (`/about`, `/projects`, `/contact`, ...) to their sections, and rewrites every other path to `index.html` so blog links work when opened directly.
