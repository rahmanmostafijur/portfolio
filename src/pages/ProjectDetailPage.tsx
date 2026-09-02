import { Link, useParams } from 'react-router-dom';
import { getProjectBySlug } from '../data/projects';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <section aria-label="Project not found" className="page-section">
        <p className="section-label">
          <Link to="/projects">← All Projects</Link>
        </p>
        <h1 className="contact-heading reveal">Project not found</h1>
        <p className="hero-tagline reveal">
          That project doesn't exist yet. <Link to="/projects" className="work-link" style={{ display: 'inline-flex' }}>Back to all projects</Link>
        </p>
      </section>
    );
  }

  return (
    <section aria-label={project.title} className="page-section">
      <p className="section-label">
        <Link to="/projects">← All Projects</Link>
      </p>

      <p className="work-subtitle reveal" style={{ marginTop: '1.5rem' }}>{project.subtitle} · {project.year}</p>
      <h1 className="contact-heading reveal" style={{ marginBottom: '1.5rem' }}>{project.title}</h1>
      <p className="hero-tagline reveal" style={{ marginBottom: '2.5rem' }}>{project.overview}</p>

      <div className="work-mockup reveal" style={{ marginBottom: '3rem' }}>
        <div className="browser-chrome">
          <span className="browser-dot"></span>
          <span className="browser-dot"></span>
          <span className="browser-dot"></span>
          <span className="browser-address">{project.slug}.dev</span>
        </div>
        <div className="work-mockup-body">
          <span>{project.subtitle}</span>
        </div>
      </div>

      <div className="project-detail-grid reveal-stagger">
        <div>
          <p className="contact-col-label">Built with</p>
          <div className="tag-list" style={{ marginTop: 0 }}>
            {project.tools.map((tool) => (
              <span className="tag-chip" key={tool}>{tool}</span>
            ))}
          </div>
        </div>

        <div>
          <p className="contact-col-label">Highlights</p>
          <ul className="work-features">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="work-cta-row reveal" style={{ marginTop: '2.5rem' }}>
        {project.liveUrl && (
          <a href={project.liveUrl} className="work-cta-primary" target="_blank" rel="noopener noreferrer">
            Live ↗
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            className={project.liveUrl ? 'work-cta-secondary' : 'work-cta-primary'}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        )}
      </div>
    </section>
  );
}
