import { CodeXml, Server } from 'lucide-react';
import { headings, skillGroups } from '@/data/profile';
import { techIcons } from '@/data/techIcons';
import { cn } from '@/lib/utils';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';

// Tinted pill colours from the template's "traits" chips, darkened in light mode for contrast
const TONES = [
  'border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300',
  'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300',
  'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300',
  'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300',
  'border-yellow-500/30 bg-yellow-500/10 text-yellow-800 dark:text-yellow-300',
];

export default function Skills() {
  return (
    <Section id="skills" icon={CodeXml} {...headings.skills}>
      <Reveal>
        <div className="glass-panel relative overflow-hidden rounded-[2rem] border-foreground/15 p-6 shadow-xl sm:p-8">
          <div className="mb-8 flex items-center justify-between gap-4 border-b border-border/60 pb-4">
            <h3 className="flex items-center gap-2 text-xl font-bold text-foreground">
              <Server aria-hidden className="size-5 text-primary" />
              Technical Arsenal
            </h3>
            <span className="rounded-full border border-border/50 bg-muted/60 px-3 py-1 text-xs font-bold tracking-wider text-muted-foreground uppercase">
              By category
            </span>
          </div>

          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, i) => (
              <div key={group.category}>
                <h4 className="mb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                  {group.category}
                </h4>
                <ul className="flex flex-wrap gap-3">
                  {group.items.map((item) => {
                    const icon = techIcons[item];
                    return (
                      <li
                        key={item}
                        className={cn(
                          'flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold shadow-sm transition-transform hover:scale-105',
                          TONES[i % TONES.length],
                        )}
                      >
                        {icon && (
                          <img
                            src={icon.src}
                            alt=""
                            width={16}
                            height={16}
                            loading="lazy"
                            decoding="async"
                            className={cn('size-4', icon.invertInDark && 'dark:invert')}
                          />
                        )}
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
