import { HangingIdCard } from '@/components/lightswind/hanging-id-card';
import { idCardFields, profile } from '@/data/profile';

// Deterministic "barcode" bar heights so the card looks the same on every render
const BARCODE_BARS = Array.from({ length: 30 }, (_, i) => ({
  width: i % 3 === 0 ? 3 : 1.5,
  height: 50 + Math.sin(i * 1.3) * 35,
}));

/** The hero's hanging ID card. Lazy-loaded by Hero so it never competes with the heading for LCP. */
export default function HeroIdCard() {
  return (
    <HangingIdCard
      label={`ID card: ${profile.name}, ${profile.shortTitle}`}
      ropeLength={120}
      cardClassName="w-64"
    >
      {/* Gradient header with photo */}
      <div className="relative flex flex-col items-center bg-brand-gradient px-4 pt-5 pb-6">
        <span aria-hidden className="absolute top-3 left-3 h-5 w-6 rounded bg-amber-300/90 shadow-sm" />
        <img
          src={profile.photo.src}
          srcSet={profile.photo.srcSet}
          sizes="96px"
          width={96}
          height={96}
          alt={profile.photo.alt}
          decoding="async"
          draggable={false}
          className="size-24 rounded-full border-4 border-white/40 object-cover shadow-md"
        />
      </div>

      <div className="flex flex-col items-center gap-3 px-4 py-4">
        <div className="text-center">
          <p className="font-display text-base leading-tight font-bold text-zinc-900 dark:text-white">
            {profile.name}
          </p>
          <p className="mt-2 inline-block rounded-full bg-zinc-100 px-3 py-0.5 text-[11px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
            {profile.shortTitle}
          </p>
        </div>

        <dl className="grid w-full grid-cols-2 gap-2">
          {idCardFields.map((field) => (
            <div key={field.label} className="rounded-lg bg-zinc-50 px-2.5 py-2 dark:bg-zinc-800/70">
              <dt className="text-[9px] font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                {field.label}
              </dt>
              <dd className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold text-zinc-900 dark:text-zinc-100">
                {field.isStatus && <span aria-hidden className="size-1.5 rounded-full bg-emerald-500" />}
                {field.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="w-full border-t border-zinc-100 pt-3 dark:border-zinc-800">
          <div aria-hidden className="mx-auto flex h-6 items-end justify-center gap-[2px]">
            {BARCODE_BARS.map((bar, i) => (
              <span
                key={i}
                className="rounded-[1px] bg-zinc-800 dark:bg-zinc-200"
                style={{ width: `${bar.width}px`, height: `${bar.height}%` }}
              />
            ))}
          </div>
          <p className="mt-1 text-center font-mono text-[10px] font-bold tracking-widest text-zinc-600 dark:text-zinc-300">
            @{profile.githubHandle}
          </p>
        </div>
      </div>
    </HangingIdCard>
  );
}
