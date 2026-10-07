import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import type { SectionId } from '@/data/profile';
import { cn } from '@/lib/utils';
import Reveal from '@/components/ui/Reveal';

interface SectionProps {
  id: SectionId;
  /** Heading text; the optional `accent` is appended in gradient. Omit both to render a custom heading with id `${id}-heading`. */
  title?: string;
  accent?: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'responsive';
  /** Render the whole heading in the accent gradient */
  gradientTitle?: boolean;
  /** Optional icon shown in a tinted box before the heading */
  icon?: LucideIcon;
  className?: string;
  children: ReactNode;
}

const alignClass = {
  left: '',
  center: 'mx-auto text-center',
  responsive: 'text-center md:text-left',
} as const;

export default function Section({
  id,
  title,
  accent,
  subtitle,
  align = 'left',
  gradientTitle = false,
  icon: Icon,
  className,
  children,
}: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn('mx-auto w-full max-w-7xl px-6 py-24', className)}
    >
      {title && (
        <Reveal className={cn('mb-12 md:mb-16', alignClass[align])}>
          <div className={cn(Icon && 'mb-3 flex items-center gap-4')}>
            {Icon && (
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary shadow-md">
                <Icon aria-hidden className="size-6" />
              </span>
            )}
            <h2
              id={headingId}
              className={cn(
                'text-3xl font-bold tracking-tight md:text-5xl',
                !Icon && 'mb-4',
                gradientTitle ? 'text-gradient-primary' : 'text-foreground',
              )}
            >
              {title}
              {accent && (
                <>
                  {' '}
                  <span className={gradientTitle ? undefined : 'text-gradient-primary'}>{accent}</span>
                </>
              )}
            </h2>
          </div>
          {subtitle && (
            <p
              className={cn(
                'max-w-2xl text-lg text-muted-foreground',
                align === 'center' && 'mx-auto',
              )}
            >
              {subtitle}
            </p>
          )}
        </Reveal>
      )}
      {children}
    </section>
  );
}
