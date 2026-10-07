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
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h2
            id="about-heading"
            className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            {about.headingLead}
            <br />
            <span className="text-gradient">{about.headingAccent}</span>
          </h2>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="mt-6 text-lg text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2">
          {about.facts.map((fact, i) => {
            const Icon = factIcons[fact.icon];
            return (
              <li key={fact.label}>
                <Reveal delay={i * 0.08} className="h-full">
                  <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-linear-to-br from-accent-from/15 to-accent-to/15 text-accent-from">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <p className="mt-5 text-sm font-medium text-muted-foreground">{fact.label}</p>
                    <p className="mt-1 font-display text-lg leading-snug font-bold text-foreground">
                      {fact.value}
                    </p>
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
