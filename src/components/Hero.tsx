import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

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

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative isolate flex min-h-screen items-center overflow-hidden px-6 pt-28 md:px-12 lg:px-20"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[55%] top-[8%] h-[420px] w-[420px] rounded-full bg-cyan-brand/25 blur-[120px]" />
        <div className="absolute left-[68%] top-[45%] h-[340px] w-[340px] rounded-full bg-amber-brand/15 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%)',
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1240px]">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.05}
              className="mb-6 flex items-center gap-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-chalk-dim"
            >
              <span className="inline-block size-1.5 rounded-full bg-amber-brand shadow-[0_0_10px_var(--color-amber-brand)]" />
              Full Stack Software Engineer
            </motion.p>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.15}
              className="font-display text-[clamp(3rem,9vw,6.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.045em] text-chalk"
            >
              Mostafij
              <br />
              Emon
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.28}
              className="mt-7 max-w-[52ch] font-sans text-base leading-relaxed text-chalk-dim md:text-lg"
            >
              Full Stack Software Engineer building production-ready web applications end to
              end — clean APIs, responsive interfaces, and the systems that keep them running.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0.4}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="/Mostafijur_Rahman_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-amber-brand px-7 py-3.5 font-sans text-[13px] font-bold uppercase tracking-[0.08em] text-chalk transition-colors duration-300 hover:bg-amber-brand hover:text-ink-900"
              >
                Download CV
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-3.5">
                  <path d="M8 1v9m0 0 3-3m-3 3-3-3M2 12v2h12v-2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <div className="flex gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex size-11 items-center justify-center rounded-full border border-white/15 text-chalk-dim transition-colors duration-300 hover:border-amber-brand hover:text-amber-brand"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
            className="relative hidden aspect-square w-[clamp(200px,24vw,320px)] place-items-center rounded-full border border-white/10 lg:grid"
          >
            <div className="absolute inset-[16%] rounded-full border border-white/[0.07]" />
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            >
              <span className="absolute left-1/2 top-[5%] size-2.5 -translate-x-1/2 rounded-full bg-cyan-brand" />
              <span className="absolute bottom-[13%] left-[18%] size-2.5 rounded-full bg-violet-brand" />
              <span className="absolute bottom-[13%] right-[18%] size-2.5 rounded-full bg-amber-brand" />
            </motion.div>
            <span className="size-[18%] rounded-full bg-amber-brand shadow-[0_0_40px_var(--color-amber-brand)]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
