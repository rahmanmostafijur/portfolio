import { HangingIdCard } from '@/components/lightswind/hanging-id-card';
import { idCardFields, profile } from '@/data/profile';
import { cn } from '@/lib/utils';

// Deterministic "barcode" bar sizes so the card looks the same on every render
const BARCODE_BARS = Array.from({ length: 36 }, (_, i) => ({
  width: i % 3 === 0 ? 3 : 1.5,
  height: 45 + Math.abs(Math.sin(i * 1.7)) * 55,
}));

/** The hero's hanging ID card. Lazy-loaded by Hero so it never competes with the heading for LCP. */
export default function HeroIdCard() {
  return (
    <HangingIdCard label={`ID card: ${profile.name}, ${profile.shortTitle}`} ropeLength={100}>
      <div className="flex h-full w-full flex-col bg-card">
        {/* Gradient header with photo */}
        <div className="relative flex flex-col items-center overflow-hidden bg-linear-to-br from-purple-700 via-zinc-200 to-indigo-950 px-5 pt-7 pb-6 text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] opacity-10"
          />
          <div className="relative mt-1 size-28 rounded-full border border-white/50 bg-linear-to-tr from-cyan-400 via-primary to-purple-400 p-1 shadow-2xl">
            <img
              src={profile.photo.src}
              srcSet={profile.photo.srcSet}
              sizes="112px"
              width={112}
              height={112}
              alt={profile.photo.alt}
              decoding="async"
              draggable={false}
              className="size-full rounded-full object-cover contrast-105"
            />
            <span
              aria-hidden
              className="absolute right-2 bottom-1 size-4 rounded-full border-2 border-white bg-emerald-500 shadow-md"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center gap-3 bg-card p-5 text-center">
          <div>
            <p className="text-xl font-extrabold tracking-tight text-foreground">{profile.name}</p>
            <p className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-foreground bg-card px-3 py-0.5 text-xs font-bold text-primary">
              {profile.shortTitle}
            </p>
          </div>

          <div aria-hidden className="my-0.5 w-full border-t border-border/60" />

          <dl className="grid w-full grid-cols-2 gap-2.5 rounded-xl border border-border/50 bg-muted/40 p-3 text-left">
            {idCardFields.map((field) => (
              <div key={field.label}>
                <dt className="block text-[9px] font-bold tracking-widest text-muted-foreground uppercase">
                  {field.label}
                </dt>
                <dd
                  className={cn(
                    'text-xs font-bold',
                    field.isStatus
                      ? 'flex items-center gap-1 text-emerald-700 dark:text-emerald-400'
                      : 'text-foreground',
                  )}
                >
                  {field.isStatus && <span aria-hidden>●</span>}
                  {field.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-1 flex w-full flex-col items-center gap-1">
            <div
              aria-hidden
              className="flex h-7 w-full items-end justify-center gap-[2.5px] rounded-lg border border-border/40 bg-white/90 px-3 py-0.5 dark:bg-black/40"
            >
              {BARCODE_BARS.map((bar, i) => (
                <span
                  key={i}
                  className="rounded-[1px] bg-foreground"
                  style={{ width: `${bar.width}px`, height: `${bar.height}%` }}
                />
              ))}
            </div>
            <div className="flex w-full items-center justify-between px-1 text-[10px]">
              <span className="font-mono font-bold tracking-widest text-primary">
                @{profile.githubHandle}
              </span>
              <span className="text-[9px] font-semibold tracking-wider text-muted-foreground uppercase">
                GitHub
              </span>
            </div>
          </div>
        </div>
      </div>
    </HangingIdCard>
  );
}
