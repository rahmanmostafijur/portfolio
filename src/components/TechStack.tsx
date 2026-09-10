import { motion } from 'framer-motion';

interface Tech {
  name: string;
  icon: string;
}

const categories: { label: string; items: Tech[] }[] = [
  {
    label: 'Languages',
    items: [
      { name: 'Python', icon: 'devicon-python-plain colored' },
      { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
      { name: 'SQL', icon: 'devicon-azuresqldatabase-plain colored' },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { name: 'React', icon: 'devicon-react-original colored' },
      { name: 'Next.js', icon: 'devicon-nextjs-plain text-chalk' },
      { name: 'HTML5', icon: 'devicon-html5-plain colored' },
      { name: 'CSS3', icon: 'devicon-css3-plain colored' },
    ],
  },
  {
    label: 'Backend',
    items: [
      { name: 'FastAPI', icon: 'devicon-fastapi-plain colored' },
      { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
      { name: 'REST APIs', icon: 'devicon-swagger-plain colored' },
    ],
  },
  {
    label: 'Database',
    items: [
      { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { name: 'Docker', icon: 'devicon-docker-plain colored' },
      { name: 'Postman', icon: 'devicon-postman-plain colored' },
      { name: 'Git', icon: 'devicon-git-plain colored' },
      { name: 'GitHub', icon: 'devicon-github-original text-chalk' },
      { name: 'Linux', icon: 'devicon-linux-plain text-chalk' },
    ],
  },
  {
    label: 'AI / ML',
    items: [
      { name: 'PyTorch', icon: 'devicon-pytorch-original colored' },
      { name: 'Pandas', icon: 'devicon-pandas-plain text-chalk' },
      { name: 'NumPy', icon: 'devicon-numpy-plain colored' },
    ],
  },
];

export default function TechStack() {
  return (
    <section
      id="tech-stack"
      aria-label="Tech stack"
      className="mx-auto w-full max-w-[1240px] px-6 py-16 md:px-12 md:py-20 lg:px-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-white/8 bg-ink-700/60 p-7 md:p-10"
      >
        <div className="mb-9 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold uppercase leading-none tracking-[-0.04em] text-chalk">
            Tech Stack
          </h2>
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-chalk-faint">
            Skills &amp; Tools
          </span>
        </div>

        <div className="grid gap-x-12 gap-y-9 md:grid-cols-2">
          {categories.map((category) => (
            <div key={category.label}>
              <p className="mb-4 border-b border-white/8 pb-3 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-brand">
                {category.label}
              </p>

              <div className="flex flex-wrap gap-2.5">
                {category.items.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex w-[84px] flex-col items-center gap-2 rounded-xl border border-white/8 bg-ink-600/70 px-2 py-3.5 transition-colors duration-300 hover:border-white/25"
                  >
                    <i className={`${tech.icon} text-[28px] leading-none`} aria-hidden="true" />
                    <span className="text-center font-sans text-[9px] font-bold uppercase tracking-[0.08em] text-chalk-faint">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
