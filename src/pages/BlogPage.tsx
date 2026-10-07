import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blog';
import Reveal from '@/components/ui/Reveal';
import { usePageMeta } from '@/hooks/usePageMeta';

const dateFormat: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };

export default function BlogPage() {
  usePageMeta({
    title: 'Blog',
    description: "Notes on backend engineering, data pipelines and the projects I'm building.",
    path: '/blog',
  });

  return (
    <section
      aria-labelledby="blog-heading"
      className="mx-auto w-full max-w-7xl px-6 pt-36 pb-24 md:pt-44"
    >
      <Reveal className="mb-12 max-w-2xl">
        <h1 id="blog-heading" className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
          Notes &amp; <span className="text-gradient-primary">Writing</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Notes on backend engineering, data pipelines and the projects I'm building.
        </p>
      </Reveal>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, i) => (
          <li key={post.slug}>
            <Reveal delay={i * 0.06} className="h-full">
              <article className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-border/80 bg-card/80 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
                <div
                  aria-hidden
                  className="relative flex aspect-[16/9] items-center justify-center bg-linear-to-br from-purple-700 via-indigo-900 to-neutral-950 p-6 text-center"
                >
                  <span className="text-2xl font-extrabold tracking-tight text-white">{post.thumbLabel}</span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-medium text-muted-foreground">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', dateFormat)}
                    </time>{' '}
                    · {post.readTime}
                  </p>
                  <h2 className="mt-2 text-xl leading-snug font-bold tracking-tight">
                    <Link to={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <span aria-hidden className="mt-5 text-sm font-semibold text-foreground">
                    Read article →
                  </span>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
