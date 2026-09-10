import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const lines = [
  { prompt: 'emon@stack:', text: 'starting fastapi server...' },
  { prompt: 'emon@stack:', text: 'connecting to postgresql...' },
  { prompt: 'emon@stack:', text: 'ready', cursor: true },
];

export default function TerminalQuote() {
  return (
    <section
      aria-label="Dev environment"
      className="mx-auto w-full max-w-[1240px] px-6 py-16 md:px-12 md:py-20 lg:px-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-white/8 bg-ink-700/60 p-7 md:p-10"
      >
        <h2 className="mb-7 font-display text-[clamp(1.5rem,3vw,2rem)] font-bold uppercase leading-none tracking-[-0.04em] text-chalk">
          Dev Environment
        </h2>

        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="rounded-xl border border-white/8 bg-ink-900/80 p-6">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-chalk-faint">
              // local stack
            </p>
            {lines.map((line) => (
              <p key={line.text} className="font-mono text-[13px] leading-8 text-chalk-dim">
                <span className="text-amber-brand">{line.prompt}</span> {line.text}
                {line.cursor && (
                  <motion.span
                    aria-hidden
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                    className="ml-1 inline-block h-[1em] w-[7px] translate-y-[2px] bg-chalk"
                  />
                )}
              </p>
            ))}
          </div>

          <div>
            <p className="font-display text-[clamp(1.15rem,2.4vw,1.6rem)] font-bold leading-[1.35] text-chalk">
              "Full-stack engineering with a growing focus on applied machine learning — from
              clean APIs to shipped products."
            </p>
            <Link
              to="/projects"
              className="mt-5 inline-flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-amber-brand transition-opacity duration-300 hover:opacity-70"
            >
              See it in practice →
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
