import { GraduationCap } from 'lucide-react';
import { education, headings } from '@/data/profile';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';

export default function Education() {
  return (
    <Section id="education" {...headings.education}>
      <ul className="grid gap-6 lg:grid-cols-3">
        {education.map((item, i) => (
          <li key={item.degree}>
            <Reveal delay={i * 0.08} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-accent-from/15 to-accent-to/15 text-accent-from">
                    <GraduationCap aria-hidden className="size-5" />
                  </span>
                  {item.highlight && (
                    <span className="rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white">
                      {item.highlight}
                    </span>
                  )}
                </div>
                <h3 className="mt-5 text-xl leading-snug font-bold tracking-tight text-foreground">
                  {item.degree}
                </h3>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  {item.institution} <span aria-hidden>•</span> {item.years}
                </p>
                <ul className="mt-4 space-y-2">
                  {item.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="relative pl-4 text-sm leading-relaxed text-muted-foreground before:absolute before:top-[0.6em] before:left-0 before:size-1.5 before:rounded-full before:bg-accent-from"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
