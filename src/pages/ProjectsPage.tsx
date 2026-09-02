import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

export default function ProjectsPage() {
  return (
    <section aria-label="All projects" className="page-section">
      <p className="section-label">
        <Link to="/">← Home</Link>
      </p>
      <h1 className="contact-heading reveal">All Projects</h1>
      <p className="hero-tagline reveal" style={{ marginBottom: '3.5rem' }}>
        A running list of things I've built — case studies, tools and experiments.
      </p>

      <div className="work-list reveal-stagger">
        {projects.map((project, i) => (
          <ProjectCard project={project} index={i} key={project.slug} />
        ))}
      </div>
    </section>
  );
}
