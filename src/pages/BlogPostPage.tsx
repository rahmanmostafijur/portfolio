import { Link, useParams } from 'react-router-dom';
import { getBlogPostBySlug } from '../data/blog';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <section aria-label="Post not found" className="page-section">
        <p className="section-label">
          <Link to="/blog">← All Posts</Link>
        </p>
        <h1 className="contact-heading reveal">Post not found</h1>
        <p className="hero-tagline reveal">
          That post doesn't exist yet. <Link to="/blog" className="work-link" style={{ display: 'inline-flex' }}>Back to writing</Link>
        </p>
      </section>
    );
  }

  return (
    <article aria-label={post.title} className="page-section blog-post">
      <p className="section-label">
        <Link to="/blog">← All Posts</Link>
      </p>

      <p className="blog-list-meta" style={{ marginTop: '1.5rem' }}>
        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        <span>·</span>
        <span>{post.readTime}</span>
      </p>
      <h1 className="contact-heading reveal" style={{ marginBottom: '1.5rem' }}>{post.title}</h1>

      <div className="tag-list" style={{ marginBottom: '2.5rem' }}>
        {post.tags.map((tag) => (
          <span className="tag-chip" key={tag}>{tag}</span>
        ))}
      </div>

      <div className="blog-body reveal">
        <p>{post.intro}</p>

        {post.sections.map((section) => (
          <div key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        ))}

        <p>{post.closing}</p>
      </div>
    </article>
  );
}
