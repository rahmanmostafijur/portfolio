import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const featured = projects.filter((project) => !project.comingSoon);

  return (
    <section id="projects" aria-label="Selected work">
      <p className="section-label">Projects →</p>

      <div className="work-list reveal-stagger">
        {featured.map((project, i) => (
          <ProjectCard project={project} index={i} key={project.slug} />
        ))}
      </div>

      <Link to="/projects" className="work-link" style={{ marginTop: '3rem' }}>
        View All Projects
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M3 13 13 3M13 3H6M13 3v7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </section>
  );
}
