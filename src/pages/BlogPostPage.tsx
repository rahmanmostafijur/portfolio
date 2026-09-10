import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { getBlogPostBySlug } from '../data/blog';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <section
        aria-label="Post not found"
        className="mx-auto w-full max-w-[1240px] px-6 pt-32 pb-24 md:px-12 md:pt-40 lg:px-20"
      >
        <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold uppercase tracking-[-0.04em] text-chalk">
          Post not found
        </h1>
        <Link
          to="/blog"
          className="mt-6 inline-flex rounded-full bg-amber-brand px-5 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-ink-900"
        >
          Back to writing
        </Link>
      </section>
    );
  }

  return (
    <article
      aria-label={post.title}
      className="mx-auto w-full max-w-[1240px] px-6 pt-32 pb-24 md:px-12 md:pt-40 lg:px-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          to="/blog"
          className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-chalk-faint transition-colors duration-300 hover:text-amber-brand"
        >
          ← All posts
        </Link>

        <p className="mt-8 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-chalk-faint">
          {new Date(post.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}{' '}
          · {post.readTime}
        </p>

        <h1 className="mt-4 max-w-[20ch] font-display text-[clamp(2rem,5.5vw,3.5rem)] font-bold uppercase leading-[1] tracking-[-0.045em] text-chalk">
          {post.title}
        </h1>

        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-chalk-faint"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12 max-w-[68ch]"
      >
        <p className="font-sans text-[17px] leading-[1.8] text-chalk-dim">{post.intro}</p>

        {post.sections.map((section) => (
          <div key={section.heading} className="mt-10">
            <h2 className="font-display text-[1.35rem] font-bold uppercase tracking-[-0.02em] text-chalk">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mt-4 font-sans text-[17px] leading-[1.8] text-chalk-dim"
              >
                {paragraph}
              </p>
            ))}
          </div>
        ))}

        <p className="mt-10 border-l-2 border-amber-brand pl-5 font-sans text-[17px] leading-[1.8] text-chalk">
          {post.closing}
        </p>
      </motion.div>
    </article>
  );
}
