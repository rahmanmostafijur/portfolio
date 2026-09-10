import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Panel {
  kicker: string;
  label: string;
  desc: string;
  tags: string[];
  accent: string;
}

const panels: Panel[] = [
  {
    kicker: 'code',
    label: 'Full-Stack Development',
    desc: 'End-to-end delivery of modern web applications with type-safe, maintainable architectures.',
    tags: ['React', 'Next.js', 'TypeScript', 'FastAPI', 'Node.js'],
    accent: 'var(--color-cyan-brand)',
  },
  {
    kicker: 'api',
    label: 'Backend Engineering',
    desc: 'Scalable REST APIs and services with Python, FastAPI and PostgreSQL — from schema design through deployment.',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    accent: 'var(--color-amber-brand)',
  },
  {
    kicker: 'ml',
    label: 'Applied Machine Learning',
    desc: 'Data-driven features and ML pipelines wired into production systems — the focus of my ongoing M.Sc research.',
    tags: ['Machine Learning', 'Python', 'Data Pipelines'],
    accent: 'var(--color-violet-brand)',
  },
];

export default function CoreExpertise() {
  const [active, setActive] = useState(0);

  return (
    <section aria-label="Core expertise" className="mx-auto w-full max-w-[1240px] px-6 py-20 md:px-12 md:py-28 lg:px-20">
      <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold uppercase leading-none tracking-[-0.04em] text-chalk">
          Core Expertise
        </h2>
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-chalk-faint">
          Full-Stack Web &amp; Applied ML
        </span>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-white/8 bg-ink-700/60 p-3 md:h-[360px] md:flex-row">
        {panels.map((panel, i) => {
          const isActive = active === i;
          return (
            <button
              key={panel.label}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-expanded={isActive}
              style={{ borderColor: isActive ? panel.accent : undefined }}
              className={`group relative overflow-hidden rounded-xl border bg-ink-600/70 text-left transition-[flex,border-color] duration-500 ease-out md:h-full ${
                isActive
                  ? 'flex-[6] shadow-[0_0_50px_-18px_var(--tw-shadow-color)] md:flex-[6]'
                  : 'flex-[1] border-white/8 hover:border-white/20'
              }`}
            >
              {/* collapsed vertical label — only rendered when collapsed */}
              {!isActive && (
                <span
                  className="absolute inset-0 flex items-center justify-center font-sans text-[11px] font-bold uppercase tracking-[0.2em] md:[writing-mode:vertical-rl] md:rotate-180"
                  style={{ color: panel.accent }}
                >
                  {panel.label}
                </span>
              )}

              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    key={panel.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-full flex-col justify-center p-7 md:p-9"
                  >
                    <p className="font-display text-xl font-bold lowercase" style={{ color: panel.accent }}>
                      {panel.kicker}
                    </p>
                    <h3 className="mt-1 font-display text-[clamp(1.25rem,2.4vw,1.85rem)] font-bold uppercase tracking-[-0.03em] text-chalk">
                      {panel.label}
                    </h3>
                    <p className="mt-3 max-w-[46ch] font-sans text-sm leading-relaxed text-chalk-dim">
                      {panel.desc}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                      {panel.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-chalk-faint"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </section>
  );
}
