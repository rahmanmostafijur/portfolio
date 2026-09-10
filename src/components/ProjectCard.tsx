import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: Math.min(index, 5) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex min-h-[290px] flex-col justify-between overflow-hidden rounded-2xl border p-7 transition-all duration-300 ${
        project.comingSoon
          ? 'border-white/6 bg-ink-700/40'
          : 'border-white/8 bg-ink-700/70 hover:-translate-y-1 hover:border-amber-brand/50 hover:shadow-[0_0_60px_-25px_var(--color-amber-brand)]'
      }`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-2 right-4 font-display text-[5.5rem] font-bold leading-none tracking-[-0.05em] text-white/[0.045]"
      >
        {num}
      </span>

      <div className="relative">
        <span className="font-display text-lg font-bold tracking-[-0.02em] text-chalk">{num}</span>

        {project.comingSoon ? (
          <span className="ml-3 rounded-full border border-white/12 px-2.5 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-chalk-faint">
            Coming Soon
          </span>
        ) : (
          <p className="mt-3 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-amber-brand">
            {project.subtitle}
          </p>
        )}

        <h3 className="mt-2 font-display text-[1.35rem] font-bold uppercase leading-[1.15] tracking-[-0.03em] text-chalk">
          {project.title}
        </h3>

        {!project.comingSoon && (
          <p className="mt-3 max-w-[42ch] font-sans text-[13px] leading-relaxed text-chalk-dim">
            {project.overview}
          </p>
        )}
      </div>

      {!project.comingSoon && (
        <div className="relative mt-6">
          <div className="mb-5 flex flex-wrap gap-x-4 gap-y-1.5">
            {project.tools.slice(0, 4).map((tool) => (
              <span
                key={tool}
                className="font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-chalk-faint"
              >
                {tool}
              </span>
            ))}
            {project.tools.length > 4 && (
              <span className="font-sans text-[9px] font-bold uppercase tracking-[0.14em] text-chalk-faint/60">
                +{project.tools.length - 4}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-cyan-brand px-4 py-2 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-ink-900 transition-transform duration-300 hover:-translate-y-0.5"
            >
              Case Study
            </Link>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-chalk transition-colors duration-300 hover:border-amber-brand hover:text-amber-brand"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-3">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                </svg>
                Source
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-chalk transition-colors duration-300 hover:border-cyan-brand hover:text-cyan-brand"
              >
                Live ↗
              </a>
            )}
          </div>
        </div>
      )}
    </motion.article>
  );
}
