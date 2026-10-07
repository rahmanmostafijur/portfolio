import { Link, useParams } from 'react-router-dom';
import { getBlogPostBySlug, type BlogPost } from '@/data/blog';
import NotFoundPage from '@/pages/NotFoundPage';
import { usePageMeta } from '@/hooks/usePageMeta';

const dateFormat: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) return <NotFoundPage />;
  return <BlogPostView post={post} />;
}

function BlogPostView({ post }: { post: BlogPost }) {
  usePageMeta({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}` });

  return (
    <article
      aria-labelledby="post-heading"
      className="mx-auto w-full max-w-3xl px-4 pt-32 pb-24 sm:px-6 md:pt-40"
    >
      <Link
        to="/blog"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <span aria-hidden>←</span> All posts
      </Link>

      <p className="mt-8 text-sm text-muted-foreground">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('en-US', dateFormat)}
        </time>{' '}
        · {post.readTime}
      </p>
      <h1
        id="post-heading"
        className="mt-3 font-display text-4xl leading-tight font-bold tracking-tight sm:text-5xl"
      >
        {post.title}
      </h1>

      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tags">
        {post.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-12 text-[17px] leading-[1.8] text-muted-foreground">
        <p>{post.intro}</p>

        {post.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-4">
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        <p className="mt-10 border-l-2 border-accent-from pl-5 text-foreground">{post.closing}</p>
      </div>
    </article>
  );
}
