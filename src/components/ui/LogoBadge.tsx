import { profile } from '@/data/profile';
import { cn } from '@/lib/utils';

interface LogoBadgeProps {
  className?: string;
}

/** Initials in a gradient-bordered rounded square, as in the template's navbar and footer. */
export default function LogoBadge({ className }: LogoBadgeProps) {
  return (
    <span
      aria-hidden
      className={cn(
        'relative block size-9 shrink-0 rounded-xl bg-linear-to-tr from-purple-600 via-primary to-sky-400 p-px shadow-lg',
        className,
      )}
    >
      <span className="flex size-full items-center justify-center rounded-[11px] bg-background">
        <span className="bg-linear-to-r from-purple-600 to-sky-600 bg-clip-text text-xs font-extrabold tracking-tighter text-transparent dark:from-purple-400 dark:to-sky-400">
          {profile.initials}
        </span>
      </span>
    </span>
  );
}
