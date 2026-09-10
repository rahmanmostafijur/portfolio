import { motion } from 'framer-motion';

export interface TimelineItem {
  role: string;
  org: string;
  date: string;
  bullets: string[];
  tags?: string[];
}

interface TimelineProps {
  eyebrow: string;
  title: string;
  items: TimelineItem[];
}

export default function Timeline({ eyebrow, title, items }: TimelineProps) {
  return (
    <section
      aria-label={eyebrow}
      className="mx-auto w-full max-w-[1240px] px-6 pt-32 pb-24 md:px-12 md:pt-40 lg:px-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12"
      >
        <p className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-amber-brand">
          {eyebrow}
        </p>
        <h1 className="font-display text-[clamp(2.25rem,6vw,4rem)] font-bold uppercase leading-[0.95] tracking-[-0.045em] text-chalk">
          {title}
        </h1>
      </motion.div>

      <div className="border-t border-white/8">
        {items.map((item, i) => (
          <motion.article
            key={item.role}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-4 border-b border-white/8 py-9 transition-colors duration-300 hover:bg-white/[0.015] md:grid-cols-[1.1fr_0.5fr_1.6fr] md:gap-8 md:px-2"
          >
            <div>
              <h2 className="font-display text-xl font-bold uppercase leading-tight tracking-[-0.02em] text-chalk">
                {item.role}
              </h2>
              <p className="mt-1.5 font-sans text-[13px] text-cyan-brand">{item.org}</p>
            </div>

            <div className="md:pt-1">
              <span className="inline-block rounded-full border border-white/10 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-chalk-faint">
                {item.date}
              </span>
            </div>

            <div>
              <ul className="space-y-2.5">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="relative pl-5 font-sans text-[13px] leading-relaxed text-chalk-dim before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-white/25"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>

              {item.tags && item.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-2.5 py-1 font-sans text-[9px] font-bold uppercase tracking-[0.12em] text-chalk-faint"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
