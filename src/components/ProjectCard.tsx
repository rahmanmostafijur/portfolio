import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';

const MAX_VISIBLE_TOOLS = 4;

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const num = String(index + 1).padStart(2, '0');

  if (project.comingSoon) {
    return (
      <article className="work-item work-item--soon">
        <div className="work-mockup">
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
        <div>
          <span className="work-num">{num}</span>
          <span className="coming-soon-badge">Coming Soon</span>
          <h3 className="work-title" style={{ marginTop: '0.75rem' }}>{project.title}</h3>
        </div>
      </article>
    );
  }

  const visibleTools = project.tools.slice(0, MAX_VISIBLE_TOOLS);
  const extraCount = project.tools.length - visibleTools.length;

  return (
    <article className="work-item">
      <Link to={`/projects/${project.slug}`} className="work-mockup" style={{ display: 'block' }}>
        <div className="browser-chrome">
          <span className="browser-dot"></span>
          <span className="browser-dot"></span>
          <span className="browser-dot"></span>
          <span className="browser-address">{project.slug}.dev</span>
        </div>
        <div className="work-mockup-body">
          <span>{project.subtitle}</span>
        </div>
      </Link>

      <div>
        <span className="work-num">{num}</span>
        <p className="work-subtitle">{project.subtitle}</p>
        <h3 className="work-title">{project.title}</h3>
        <p className="work-overview">{project.overview}</p>

        <div className="work-tool-badges">
          {visibleTools.map((tool) => (
            <span className="tag-chip" key={tool}>{tool}</span>
          ))}
          {extraCount > 0 && <span className="tag-chip tag-chip--more">+{extraCount} more</span>}
        </div>

        <div className="work-cta-row">
          <Link to={`/projects/${project.slug}`} className="work-cta-primary">
            Case Study
          </Link>
          {project.liveUrl ? (
            <a href={project.liveUrl} className="work-cta-secondary" target="_blank" rel="noopener noreferrer">
              Live ↗
            </a>
          ) : project.githubUrl ? (
            <a href={project.githubUrl} className="work-cta-secondary" target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
