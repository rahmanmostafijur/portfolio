import { motion } from 'framer-motion';

const facts = [
  { label: 'Location', value: 'Dhaka, Bangladesh' },
  { label: 'Availability', value: 'Open to work' },
  { label: 'Focus', value: 'Full Stack / ML' },
  { label: 'Tools', value: 'React / FastAPI / TS' },
];

const socials = [
  {
    href: 'https://github.com/rahmanmostafijur',
    label: 'GitHub',
    path: 'M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z',
  },
  {
    href: 'https://linkedin.com/in/mostafijemon00',
    label: 'LinkedIn',
    path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
  },
];

export default function ProfileBlock() {
  return (
    <section
      aria-label="Profile"
      className="mx-auto w-full max-w-[1240px] px-6 py-16 md:px-12 md:py-20 lg:px-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="grid items-start gap-10 md:grid-cols-[300px_minmax(0,1fr)] md:gap-14"
      >
        <div>
          <div className="relative overflow-hidden rounded-xl border border-white/15 bg-ink-700 shadow-[0_0_70px_-25px_var(--color-cyan-brand)]">
            <img
              src="/emon.png"
              alt="Mostafij Emon"
              className="aspect-[3/4] w-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <span className="absolute bottom-0 right-0 bg-chalk px-4 py-2.5 font-display text-[13px] font-bold uppercase tracking-[0.08em] text-ink-900">
              Emon
            </span>
          </div>

          <div className="flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex size-14 items-center justify-center rounded-b-full bg-chalk text-ink-900 transition-colors duration-300 hover:bg-amber-brand"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-[clamp(1.6rem,3.6vw,2.5rem)] font-bold uppercase leading-[1.05] tracking-[-0.04em] text-chalk">
            Full Stack Software Engineer
          </h2>

          <p className="mt-6 max-w-[60ch] font-sans text-[15px] leading-[1.75] text-chalk-dim">
            Based in Dhaka, Bangladesh, I build production-ready web applications end to end —
            designing clean APIs, shipping responsive interfaces, and keeping the systems behind
            them maintainable.
          </p>
          <p className="mt-4 max-w-[60ch] font-sans text-[15px] leading-[1.75] text-chalk-dim">
            Alongside day-to-day full-stack work, my M.Sc research is pushing me further into
            applied machine learning and data-driven features.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-xl border border-white/8 bg-ink-600/70 px-5 py-4"
              >
                <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-chalk-faint">
                  {fact.label}
                </span>
                <span className="mt-1.5 block font-display text-[15px] font-bold uppercase tracking-[0.02em] text-chalk">
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
