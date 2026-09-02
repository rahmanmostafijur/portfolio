const timeline = [
  {
    role: 'Software Engineer',
    org: 'Acciptra — Dhaka, Bangladesh (Hybrid)',
    date: 'Present',
    bullets: [
      'Designed and developed scalable backend services using Python and FastAPI, focusing on performance and clean architecture.',
      'Built dynamic, user-friendly interfaces with React and Next.js, ensuring responsive and seamless user experiences.',
      'Designed and consumed RESTful APIs, enabling smooth communication between frontend and backend systems.',
      'Collaborated with cross-functional teams to deliver high-quality, production-ready solutions.',
    ],
    tags: ['Python', 'JavaScript', 'React', 'PostgreSQL', 'Java'],
  },
];

export default function Experience() {
  return (
    <section id="experience" aria-label="Experience">
      <p className="section-label">Experience →</p>
      <h2 className="timeline-heading reveal">experience</h2>

      <div className="timeline-rows reveal-stagger">
        {timeline.map((item) => (
          <div className="timeline-row" key={item.role}>
            <div className="timeline-role">
              <h3>{item.role}</h3>
              <span className="timeline-org">{item.org}</span>
            </div>
            <div className="timeline-date">{item.date}</div>
            <div className="timeline-detail">
              <ul className="timeline-bullets">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              {item.tags && (
                <div className="exp-tags">
                  {item.tags.map((tag) => (
                    <span className="exp-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
