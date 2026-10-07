import type { ReactNode } from 'react';
import type { SectionId } from '@/data/profile';
import { cn } from '@/lib/utils';
import Reveal from '@/components/ui/Reveal';

interface SectionProps {
  id: SectionId;
  /** Heading text; the optional `accent` is appended in gradient. Omit both to render a custom heading with id `${id}-heading`. */
  title?: string;
  accent?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
  children: ReactNode;
}

export default function Section({
  id,
  title,
  accent,
  subtitle,
  align = 'left',
  className,
  children,
}: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn('mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28', className)}
    >
      {title && (
        <Reveal className={cn('mb-12 max-w-2xl', align === 'center' && 'mx-auto text-center')}>
          <h2
            id={headingId}
            className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            {title}
            {accent && (
              <>
                {' '}
                <span className="text-gradient">{accent}</span>
              </>
            )}
          </h2>
          {subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}
        </Reveal>
      )}
      {children}
    </section>
  );
}
