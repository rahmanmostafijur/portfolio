import { useEffect, useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { navLinks, profile, services, socials, type SectionId } from '@/data/profile';
import { useSectionNavigation } from '@/hooks/useSectionNavigation';
import LogoBadge from '@/components/ui/LogoBadge';
import SocialIcon from '@/components/ui/SocialIcon';
import { cn } from '@/lib/utils';

const ROTATE_MS = 2600;
const rotatingWords = services.map((service) => service.title);
const footerLinks = [...navLinks, { id: 'contact' as SectionId, label: 'Contact' }];

/** Blur cross-fade between the service titles, as in the template footer. */
function RotatingWords() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % rotatingWords.length), ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const longest = rotatingWords.reduce((a, b) => (b.length > a.length ? b : a), '');

  return (
    <div className="relative inline-flex min-h-[70px] items-center justify-center text-center text-3xl font-extrabold tracking-tight text-foreground select-none md:text-5xl lg:text-6xl">
      <span className="sr-only">{rotatingWords.join(', ')}</span>
      {rotatingWords.map((word, i) => (
        <span
          key={word}
          aria-hidden
          className={cn(
            'absolute inset-0 flex items-center justify-center transition-all duration-700',
            i === index ? 'opacity-100 blur-0' : 'opacity-0 blur-xl',
          )}
        >
          {word}
        </span>
      ))}
      {/* Invisible copy of the longest title reserves the width */}
      <span aria-hidden className="pointer-events-none px-2 py-1 opacity-0">
        {longest}
      </span>
    </div>
  );
}

const circleLink =
  'glass-panel flex size-10 items-center justify-center rounded-full border-black/5 text-muted-foreground shadow-sm transition-all hover:scale-110 hover:border-brand/40 hover:text-foreground dark:border-white/10';

export default function Footer() {
  const goToSection = useSectionNavigation();

  const handleClick = (id: SectionId) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    goToSection(id);
  };

  return (
    <footer className="relative z-10 w-full overflow-hidden rounded-t-[3rem] border-t border-black/5 bg-card/60 pt-16 pb-32 shadow-2xl backdrop-blur-2xl md:pb-36 dark:border-white/10">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[350px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[140px]"
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10 px-6 md:px-12">
        <div className="flex flex-col items-center justify-between gap-6 border-b border-black/5 pb-8 md:flex-row dark:border-white/10">
          <div className="flex items-center gap-3">
            <LogoBadge className="size-10" />
            <div className="flex flex-col text-left">
              <span className="text-base leading-none font-extrabold tracking-tight text-foreground">
                {profile.name}
              </span>
              <span className="mt-0.5 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                {profile.title}
              </span>
            </div>
          </div>
          <a
            href="/#home"
            onClick={handleClick('home')}
            className="glass-panel flex items-center gap-2 rounded-full border-black/5 px-5 py-2.5 text-xs font-bold text-foreground shadow-sm transition-all hover:border-brand/40 dark:border-white/10"
          >
            Back to top
            <ArrowUp aria-hidden className="size-3.5" />
          </a>
        </div>

        <div className="my-2 flex flex-col items-center justify-center rounded-3xl border border-black/5 bg-black/[0.015] px-6 py-12 text-center shadow-sm dark:border-white/10 dark:bg-white/[0.02]">
          <span className="mb-3 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-extrabold tracking-widest text-primary uppercase shadow-sm">
            {profile.availability}
          </span>
          <RotatingWords />
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-6 border-t border-black/5 py-6 text-sm font-semibold text-muted-foreground md:gap-12 dark:border-white/10"
        >
          {footerLinks.map((link) => (
            <a
              key={link.id}
              href={`/#${link.id}`}
              onClick={handleClick(link.id)}
              className="transition-all duration-200 hover:scale-105 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Link to="/blog" className="transition-all duration-200 hover:scale-105 hover:text-foreground">
            Blog
          </Link>
        </nav>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-black/5 pt-6 text-xs text-muted-foreground md:flex-row dark:border-white/10">
          <ul className="flex items-center gap-3" aria-label="Social links">
            {socials.map((social) => {
              const isExternal = social.icon !== 'email';
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                    className={circleLink}
                  >
                    <SocialIcon name={social.icon} className="size-4" />
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="text-center font-medium md:text-right">
            © {new Date().getFullYear()} {profile.name}.
          </p>
        </div>
      </div>
    </footer>
  );
}
