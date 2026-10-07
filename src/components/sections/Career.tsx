import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { Briefcase } from 'lucide-react';
import { career, headings } from '@/data/profile';
import { cn } from '@/lib/utils';
import Reveal from '@/components/ui/Reveal';

// Line position: left edge on small screens, centre from lg up (as in the template)
const LINE_X = 'left-5 lg:left-1/2';

export default function Career() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  // Progress runs from the timeline top reaching 70% of the viewport to its bottom reaching 50%
  useEffect(() => {
    if (reduceMotion) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = timelineRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (0.7 * vh - rect.top) / (rect.height + 0.2 * vh)));
      if (progressRef.current) progressRef.current.style.transform = `scaleY(${progress})`;
      if (dotRef.current) dotRef.current.style.top = `${progress * 100}%`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  return (
    <section id="career" aria-labelledby="career-heading" className="defer-render relative w-full overflow-hidden">
      <Reveal className="px-6 py-16 text-center">
        <h2 id="career-heading" className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          {headings.career.title} {headings.career.accent}
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{headings.career.subtitle}</p>
      </Reveal>

      <div ref={timelineRef} className="relative mx-auto max-w-7xl px-4 pb-24">
        <div aria-hidden className={cn('absolute top-0 z-10 h-full w-[3px] -translate-x-1/2 bg-primary/20', LINE_X)} />
        {!reduceMotion && (
          <>
            <div
              ref={progressRef}
              aria-hidden
              className={cn(
                'absolute top-0 z-10 h-full w-[3px] origin-top -translate-x-1/2 scale-y-0 bg-linear-to-b from-purple-600 via-brand to-sky-400',
                LINE_X,
              )}
            />
            <div
              ref={dotRef}
              aria-hidden
              className={cn('absolute top-0 z-20 -translate-x-1/2 -translate-y-1/2', LINE_X)}
            >
              <div className="size-5 rounded-full border-2 border-white bg-brand shadow-[0_0_20px_8px_rgba(139,92,246,0.45)]" />
            </div>
          </>
        )}

        <ol className="relative z-20">
          {career.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <li key={`${item.company}-${item.period}`} className="relative mb-20 flex py-4 last:mb-0">
                <span
                  aria-hidden
                  className={cn(
                    'absolute top-1/2 z-30 flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 bg-background',
                    i === 0 ? 'border-primary' : 'border-border',
                    LINE_X,
                  )}
                />
                <Reveal
                  className={cn(
                    'relative z-30 ml-12 w-full rounded-lg border border-border/40 bg-card shadow-md lg:w-[calc(50%-40px)]',
                    isLeft ? 'lg:mr-[calc(50%+20px)] lg:ml-0' : 'lg:ml-[calc(50%+20px)]',
                  )}
                >
                  <article className="rounded-lg border border-border bg-background p-6 text-left">
                    <p className="mb-2 flex items-center text-sm font-bold text-primary">
                      <Briefcase aria-hidden className="mr-2 size-4" />
                      {item.period}
                    </p>
                    <h3 className="mb-1 text-xl font-bold text-foreground">{item.role}</h3>
                    <p className="mb-2 font-medium text-muted-foreground">
                      {item.company} <span aria-hidden>·</span> {item.workMode}
                    </p>
                    <p className="leading-relaxed text-muted-foreground">{item.description}</p>
                    <ul aria-label={`Stack at ${item.company}`} className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-border/60 bg-muted/60 px-2.5 py-0.5 text-xs font-semibold text-foreground"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
