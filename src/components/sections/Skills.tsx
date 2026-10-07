import { headings, skillGroups } from '@/data/profile';
import { techIcons } from '@/data/techIcons';
import { cn } from '@/lib/utils';
import Section from '@/components/layout/Section';
import Reveal from '@/components/ui/Reveal';

export default function Skills() {
  return (
    <Section id="skills" {...headings.skills}>
      <Reveal>
        <div className="grid gap-x-10 gap-y-8 rounded-2xl border border-border bg-card p-6 shadow-sm sm:grid-cols-2 sm:p-8 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                {group.category}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => {
                  const icon = techIcons[item];
                  return (
                    <li
                      key={item}
                      className="flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-sm font-medium text-foreground"
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
      </Reveal>
    </Section>
  );
}
