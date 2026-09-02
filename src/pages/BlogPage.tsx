import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blog';

export default function BlogPage() {
  return (
    <section aria-label="Blog" className="page-section">
      <p className="section-label">Blog →</p>
      <h1 className="contact-heading reveal">Writing</h1>
      <p className="hero-tagline reveal" style={{ marginBottom: '3.5rem' }}>
        Notes on backend engineering, data pipelines and the projects I'm building.
      </p>

      <div className="blog-grid reveal-stagger">
        {blogPosts.map((post, i) => (
          <article className="blog-card" key={post.slug}>
            <Link to={`/blog/${post.slug}`} className={`blog-card-thumb blog-card-thumb--${i % 3}`}>
              <span>{post.thumbLabel}</span>
            </Link>
            <div className="blog-card-body">
              <Link to={`/blog/${post.slug}`} className="blog-card-title">
                {post.title}
              </Link>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <div className="blog-card-footer">
                <span className="blog-list-meta" style={{ marginBottom: 0 }}>
                  {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · {post.readTime}
                </span>
                <Link to={`/blog/${post.slug}`} className="blog-card-cta">
                  Read Article
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
