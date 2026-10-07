import { SlidingLogoMarquee } from '@/components/lightswind/sliding-logo-marquee';
import { skillGroups } from '@/data/profile';
import { techIcons } from '@/data/techIcons';
import { cn } from '@/lib/utils';

const technologies = skillGroups.flatMap((group) => group.items);

const items = technologies.map((name) => {
  const icon = techIcons[name];
  return {
    id: name,
    content: (
      <span className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium whitespace-nowrap text-foreground shadow-sm">
        {icon && (
          <img
            src={icon.src}
            alt=""
            width={18}
            height={18}
            loading="lazy"
            decoding="async"
            className={cn('size-[18px]', icon.invertInDark && 'dark:invert')}
          />
        )}
        {name}
      </span>
    ),
  };
});

export default function TechMarquee() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
      <SlidingLogoMarquee items={items} label="Technologies I work with" />
    </div>
  );
}
