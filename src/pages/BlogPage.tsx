import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blog';

const thumbStyles = [
  'from-amber-brand to-[#8a5c0a]',
  'from-cyan-brand to-[#0b4f5e]',
  'from-violet-brand to-[#3b2470]',
];

export default function BlogPage() {
  return (
    <section
      aria-label="Blog"
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
            Blog
          </p>
          <h1 className="font-display text-[clamp(2.25rem,6vw,4rem)] font-bold uppercase leading-[0.95] tracking-[-0.045em] text-chalk">
            Writing
          </h1>
        </div>
        <p className="max-w-[38ch] font-sans text-sm leading-relaxed text-chalk-dim">
          Notes on backend engineering, data pipelines and the projects I'm building.
        </p>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, i) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-ink-700/70 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
          >
            <Link
              to={`/blog/${post.slug}`}
              className={`flex aspect-[16/9] items-center justify-center bg-gradient-to-br p-6 text-center ${thumbStyles[i % thumbStyles.length]}`}
            >
              <span className="font-display text-[clamp(1.1rem,2vw,1.5rem)] font-bold uppercase tracking-[-0.02em] text-white/95">
                {post.thumbLabel}
              </span>
            </Link>

            <div className="flex flex-1 flex-col p-6">
              <Link
                to={`/blog/${post.slug}`}
                className="font-display text-[1.15rem] font-bold leading-snug tracking-[-0.02em] text-chalk transition-colors duration-300 hover:text-amber-brand"
              >
                {post.title}
              </Link>

              <p className="mt-3 flex-1 font-sans text-[13px] leading-relaxed text-chalk-dim">
                {post.excerpt}
              </p>

              <p className="mt-5 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-chalk-faint">
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}{' '}
                · {post.readTime}
              </p>

              <Link
                to={`/blog/${post.slug}`}
                className="mt-4 inline-flex w-fit rounded-full bg-amber-brand px-4 py-2 font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-ink-900 transition-transform duration-300 hover:-translate-y-0.5"
              >
                Read article
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
