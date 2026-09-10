import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

export default function ProjectsPage() {
  const shipped = projects.filter((p) => !p.comingSoon).length;

  return (
    <section
      aria-label="Projects"
      className="mx-auto w-full max-w-[1240px] px-6 pt-32 pb-24 md:px-12 md:pt-40 lg:px-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 flex flex-wrap items-end justify-between gap-5"
      >
        <div>
          <p className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-amber-brand">
            Projects
          </p>
          <h1 className="font-display text-[clamp(2.25rem,6vw,4rem)] font-bold uppercase leading-[0.95] tracking-[-0.045em] text-chalk">
            Selected Work
          </h1>
        </div>
        <p className="max-w-[38ch] font-sans text-sm leading-relaxed text-chalk-dim">
          {shipped} shipped {shipped === 1 ? 'project' : 'projects'}, plus what's currently on the
          bench — case studies, tools and experiments.
        </p>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard project={project} index={i} key={project.slug} />
        ))}
      </div>
    </section>
  );
}
