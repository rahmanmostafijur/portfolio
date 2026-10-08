import { Briefcase, Globe, GraduationCap, Target, type LucideIcon } from 'lucide-react';
import { about, type FactCard } from '@/data/profile';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';

const factIcons: Record<FactCard['icon'], LucideIcon> = {
  briefcase: Briefcase,
  target: Target,
  graduation: GraduationCap,
  globe: Globe,
};

export default function About() {
  return (
    <Section id="about">
      <div className="flex flex-col items-center gap-16 md:flex-row">
        <Reveal className="flex-1 space-y-8">
          <div>
            <h2
              id="about-heading"
              className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl"
            >
              {about.headingLead} <span className="text-gradient-primary">{about.headingAccent}</span>
            </h2>
            {about.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="mt-4 text-lg leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <ul className="grid w-full flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
          {about.facts.map((fact, i) => {
            const Icon = factIcons[fact.icon];
            return (
              <li key={fact.label}>
                <Reveal delay={i * 0.08} className="h-full">
                  <div className="glass-panel group relative h-full overflow-hidden rounded-2xl border-foreground/10 p-6 transition-colors hover:border-brand/50">
                    <div
                      aria-hidden
                      className="absolute -top-12 -right-12 size-40 bg-[radial-gradient(closest-side,rgba(139,92,246,0.18),transparent)] opacity-70 transition-opacity group-hover:opacity-100"
                    />
                    <span className="mb-4 flex w-max rounded-xl p-3 text-primary">
                      <Icon aria-hidden className="size-6" />
                    </span>
                    <p className="mb-1 text-xl leading-snug font-bold text-foreground">{fact.value}</p>
                    <p className="text-sm font-medium text-muted-foreground">{fact.label}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
