export default function About() {
  return (
    <section id="expertise" aria-label="About">
      <div className="about-grid">
        <p className="section-label">
          About <span aria-hidden="true">→</span>
        </p>

        <div className="about-copy reveal-stagger">
          <p>
            As a <strong>Full Stack Software Engineer</strong> I help{' '}
            <span className="muted">companies and teams</span> around the world connect their{' '}
            <strong>products</strong> to <span className="muted">reliable, scalable</span>{' '}
            infrastructure.
          </p>
          <p>
            Projects can be done directly with <span className="muted">clients</span> or in a
            supporting role for <span className="muted">teams and startups</span> building{' '}
            <strong>APIs</strong>, <strong>web platforms</strong> and{' '}
            <span className="muted">machine learning</span> features from the ground up.
          </p>
        </div>
      </div>
    </section>
  );
}
