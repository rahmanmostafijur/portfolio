import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { getProjectBySlug } from '../data/projects';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <section
        aria-label="Project not found"
        className="mx-auto w-full max-w-[1240px] px-6 pt-32 pb-24 md:px-12 md:pt-40 lg:px-20"
      >
        <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold uppercase tracking-[-0.04em] text-chalk">
          Project not found
        </h1>
        <Link
          to="/projects"
          className="mt-6 inline-flex rounded-full bg-amber-brand px-5 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-ink-900"
        >
          Back to projects
        </Link>
      </section>
    );
  }

  return (
    <article
      aria-label={project.title}
      className="mx-auto w-full max-w-[1240px] px-6 pt-32 pb-24 md:px-12 md:pt-40 lg:px-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          to="/projects"
          className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-chalk-faint transition-colors duration-300 hover:text-amber-brand"
        >
          ← All projects
        </Link>

        <p className="mt-8 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-amber-brand">
          {project.subtitle} · {project.year}
        </p>

        <h1 className="mt-3 max-w-[18ch] font-display text-[clamp(2rem,5.5vw,3.5rem)] font-bold uppercase leading-[1] tracking-[-0.045em] text-chalk">
          {project.title}
        </h1>

        <p className="mt-6 max-w-[62ch] font-sans text-[16px] leading-[1.75] text-chalk-dim">
          {project.overview}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-cyan-brand px-5 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-ink-900 transition-transform duration-300 hover:-translate-y-0.5"
            >
              Live ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 px-5 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-chalk transition-colors duration-300 hover:border-amber-brand hover:text-amber-brand"
            >
              Source ↗
            </a>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="mt-14 grid gap-10 md:grid-cols-[240px_minmax(0,1fr)]"
      >
        <div>
          <p className="mb-4 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-chalk-faint">
            Built with
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-white/10 px-3 py-1.5 font-sans text-[11px] text-chalk-dim"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-chalk-faint">
            Highlights
          </p>
          <ul className="space-y-3">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="relative pl-5 font-sans text-[15px] leading-[1.7] text-chalk-dim before:absolute before:left-0 before:top-[0.75em] before:h-px before:w-2.5 before:bg-amber-brand"
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </article>
  );
}
