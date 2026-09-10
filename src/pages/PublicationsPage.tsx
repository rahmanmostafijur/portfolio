import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function PublicationsPage() {
  return (
    <section
      aria-label="Publications"
      className="mx-auto w-full max-w-[1240px] px-6 pt-32 pb-24 md:px-12 md:pt-40 lg:px-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10"
      >
        <p className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-amber-brand">
          Publications
        </p>
        <h1 className="font-display text-[clamp(2.25rem,6vw,4rem)] font-bold uppercase leading-[0.95] tracking-[-0.045em] text-chalk">
          Research &amp; Writing
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-white/8 bg-ink-700/60 p-8 md:p-12"
      >
        <div className="mb-6 flex size-11 items-center justify-center rounded-full border border-white/10">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-5 text-chalk-faint">
            <path d="M4 5h10a2 2 0 0 1 2 2v12H6a2 2 0 0 1-2-2V5zM16 7h4v10a2 2 0 0 1-2 2h-2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <p className="max-w-[58ch] font-sans text-[15px] leading-[1.75] text-chalk-dim">
          No publications yet. I'm currently pursuing an M.Sc in Computer Science &amp; Engineering
          at East West University — research work will be listed here as it's completed.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/blog"
            className="rounded-full bg-amber-brand px-5 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-ink-900 transition-transform duration-300 hover:-translate-y-0.5"
          >
            Read the blog instead
          </Link>
          <Link
            to="/projects"
            className="rounded-full border border-white/15 px-5 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-chalk transition-colors duration-300 hover:border-amber-brand hover:text-amber-brand"
          >
            See projects
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
