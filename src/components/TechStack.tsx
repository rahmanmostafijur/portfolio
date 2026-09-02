const technologies = [
  'Python', 'FastAPI', 'React', 'Next.js', 'TypeScript', 'JavaScript',
  'Node.js', 'REST APIs', 'PostgreSQL', 'SQL', 'Docker', 'Postman',
  'Git / GitHub', 'Linux / Bash', 'Machine Learning',
];

export default function TechStack() {
  return (
    <section id="tech-stack" aria-label="Tech stack">
      <p className="section-label">Tech Stack →</p>
      <h2 className="timeline-heading reveal">tools of the trade</h2>

      <div className="tag-list reveal">
        {technologies.map((tech) => (
          <span className="tag-chip" key={tech}>{tech}</span>
        ))}
      </div>
    </section>
  );
}
