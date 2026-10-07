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
      <span className="flex items-center gap-3 rounded-full border border-foreground/10 bg-background/80 px-5 py-2.5 text-xs font-medium tracking-wide whitespace-nowrap text-foreground shadow-md md:text-sm">
        {icon && (
          <img
            src={icon.src}
            alt=""
            width={20}
            height={20}
            loading="lazy"
            decoding="async"
            className={cn('size-5', icon.invertInDark && 'dark:invert')}
          />
        )}
        {name}
      </span>
    ),
  };
});

export default function TechMarquee() {
  return (
    <div className="relative z-10 mt-auto w-full border-y border-foreground/10 bg-foreground/[0.02] py-6">
      <SlidingLogoMarquee items={items} label="Technologies I work with" className="px-4" />
    </div>
  );
}
