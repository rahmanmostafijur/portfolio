import { lazy, Suspense, type MouseEvent } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { profile, socials } from '@/data/profile';
import { useSectionNavigation } from '@/hooks/useSectionNavigation';
import SocialIcon from '@/components/ui/SocialIcon';
import TechMarquee from '@/components/sections/TechMarquee';

const HeroIdCard = lazy(() => import('@/components/sections/HeroIdCard'));

// Space reserved for the lazy card so nothing shifts when it loads
const CARD_SLOT = 'h-[660px] w-full max-w-md';

export default function Hero() {
  const goToSection = useSectionNavigation();

  // The heading itself is never faded in, so it can paint immediately as the LCP element
  const fadeUp = (delay: number) => ({
    style: { animationDelay: `${delay}s` },
  });

  const handleViewWork = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    goToSection('projects');
  };

  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative flex min-h-screen flex-col overflow-hidden bg-background pt-28 md:pt-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="bg-dot-grid absolute inset-0" />
        <div className="absolute top-[50vh] left-1/2 h-[600px] w-[1000px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(139,92,246,0.14),transparent)] dark:bg-[radial-gradient(closest-side,rgba(139,92,246,0.3),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center gap-12 px-6 pb-12 md:flex-row md:gap-20">
        <div className="flex min-w-0 flex-1 flex-col items-center text-center md:items-start md:text-left">
          <p
            {...fadeUp(0)}
            className="animate-fade-up glass-panel mb-6 inline-flex items-center gap-2.5 rounded-full border-foreground/10 px-4 py-1.5"
          >
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-green-500" />
            </span>
            <span className="text-xs font-medium text-muted-foreground">{profile.availability}</span>
          </p>

          <h1
            id="home-heading"
            className="mb-4 text-5xl leading-[1.1] font-bold tracking-tight text-foreground md:text-7xl"
          >
            Hi, I&apos;m
            <br />
            <span className="text-gradient-name text-[clamp(3rem,6.5vw,5.5rem)] leading-none font-extrabold break-words">
              {profile.name}
            </span>
          </h1>

          <p
            {...fadeUp(0.1)}
            className="animate-fade-up mb-8 w-full max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            {profile.tagline}
          </p>

          <div
            {...fadeUp(0.2)}
            className="animate-fade-up mb-10 flex flex-wrap items-center justify-center gap-4 md:justify-start"
          >
            <a
              href="/#projects"
              onClick={handleViewWork}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:-translate-y-0.5"
            >
              View Work
              <ArrowRight aria-hidden className="size-4" />
            </a>
            <a
              href={profile.cvUrl}
              download
              className="glass-panel inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
            >
              Resume
              <Download aria-hidden className="size-4" />
            </a>
          </div>

          <ul {...fadeUp(0.3)} className="animate-fade-up flex items-center gap-4" aria-label="Social links">
            {socials.map((social) => {
              const isExternal = social.icon !== 'email';
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                    className="block rounded-md p-1 text-muted-foreground transition-all duration-200 hover:-translate-y-1 hover:text-foreground"
                  >
                    <SocialIcon name={social.icon} className="size-5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={`relative flex flex-1 items-start justify-center ${CARD_SLOT}`}>
          <Suspense fallback={null}>
            <HeroIdCard />
          </Suspense>
        </div>
      </div>

      <TechMarquee />
    </section>
  );
}
