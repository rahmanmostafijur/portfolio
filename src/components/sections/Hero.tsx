import { lazy, Suspense, type MouseEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { profile, socials } from '@/data/profile';
import { useSectionNavigation } from '@/hooks/useSectionNavigation';
import SocialIcon from '@/components/ui/SocialIcon';

const HeroIdCard = lazy(() => import('@/components/sections/HeroIdCard'));

// Space reserved for the lazy card so nothing shifts when it loads
const CARD_SLOT = 'h-[540px] w-72';

export default function Hero() {
  const goToSection = useSectionNavigation();
  const reduceMotion = useReducedMotion();

  // The heading itself is never faded in, so it can paint immediately as the LCP element
  const fadeUp = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  const handleViewWork = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    goToSection('projects');
  };

  return (
    <section id="home" aria-labelledby="home-heading" className="relative isolate overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 right-[-10%] size-[32rem] rounded-full bg-accent-from/15 blur-3xl" />
        <div className="absolute top-1/2 left-[-15%] size-[28rem] rounded-full bg-accent-to/10 blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pt-32 pb-16 sm:px-6 md:pt-40 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16 lg:pb-24">
        <div className="min-w-0">
          <motion.p
            {...fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-foreground shadow-sm"
          >
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {profile.availability}
          </motion.p>

          <h1
            id="home-heading"
            className="mt-6 pb-1 font-display text-[2.75rem] leading-[1.05] font-bold text-balance tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m
            <br />
            <span className="text-gradient break-words">{profile.name}</span>
          </h1>

          <motion.p {...fadeUp(0.1)} className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            {profile.tagline}
          </motion.p>

          <motion.div {...fadeUp(0.2)} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="/#projects"
              onClick={handleViewWork}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
            >
              View Work
              <ArrowRight aria-hidden className="size-4" />
            </a>
            <a
              href={profile.cvUrl}
              download
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted"
            >
              Resume
              <ArrowDown aria-hidden className="size-4" />
            </a>
          </motion.div>

          <motion.ul {...fadeUp(0.3)} className="mt-8 flex items-center gap-3" aria-label="Social links">
            {socials.map((social) => {
              const isExternal = social.icon !== 'email';
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                    className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <SocialIcon name={social.icon} className="size-[18px]" />
                  </a>
                </li>
              );
            })}
          </motion.ul>
        </div>

        <div className={`mx-auto ${CARD_SLOT} lg:mx-0`}>
          <Suspense fallback={null}>
            <HeroIdCard />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
