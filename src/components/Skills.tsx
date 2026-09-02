const services = [
  {
    name: 'Backend Engineering',
    desc: 'Scalable REST APIs and services with Python, FastAPI and PostgreSQL.',
  },
  {
    name: 'Frontend Development',
    desc: 'Responsive interfaces built with React, Next.js and TypeScript.',
  },
  {
    name: 'AI & Machine Learning',
    desc: 'Data-driven features and ML pipelines integrated into production systems.',
  },
];

export default function Skills() {
  return (
    <section id="services" aria-label="Services">
      <p className="section-label">Services →</p>

      <div className="services-list reveal-stagger">
        {services.map((service, i) => (
          <div className="service-row" key={service.name}>
            <span className="service-index">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="service-name">{service.name}</h3>
            <p className="service-desc">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
