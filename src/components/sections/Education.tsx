import {
  Award,
  BookOpen,
  Building2,
  Calendar,
  CircleCheck,
  GraduationCap,
  School,
  type LucideIcon,
} from 'lucide-react';
import { education, headings } from '@/data/profile';
import { cn } from '@/lib/utils';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';

const degreeIcons: LucideIcon[] = [GraduationCap, BookOpen, School];

// The template pairs a tinted badge with outlined ones; the first highlight gets the tint
const badgeStyles = [
  'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  'glass-panel border-foreground/10 text-foreground',
];

export default function Education() {
  return (
    <Section id="education" icon={GraduationCap} {...headings.education}>
      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {education.map((item, i) => {
          const Icon = degreeIcons[i % degreeIcons.length];
          return (
            <li key={item.degree}>
              <Reveal delay={i * 0.08} className="h-full">
                <article className="group h-full rounded-[2rem] border border-border/80 bg-card/80 p-8 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary shadow-sm">
                      <Icon aria-hidden className="size-7" />
                    </span>
                    {item.highlight && (
                      <span
                        className={cn(
                          'flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-extrabold shadow-sm',
                          badgeStyles[i === 0 ? 0 : 1],
                        )}
                      >
                        <Award aria-hidden className="size-3.5" />
                        {item.highlight}
                      </span>
                    )}
                  </div>

                  <h3 className="mb-2 text-2xl font-extrabold tracking-tight text-foreground">
                    {item.degree}
                  </h3>
                  <p className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-border/60 pb-4 text-xs font-semibold text-muted-foreground">
                    <span className="flex items-center gap-1.5 font-bold text-foreground">
                      <Building2 aria-hidden className="size-3.5 text-primary" />
                      {item.institution}
                    </span>
                    <span aria-hidden>•</span>
                    <span className="flex items-center gap-1.5 font-mono font-bold text-primary">
                      <Calendar aria-hidden className="size-3.5" />
                      {item.years}
                    </span>
                  </p>

                  <ul className="space-y-3.5">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-sm leading-relaxed">
                        <CircleCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span className="font-medium text-foreground/90">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
