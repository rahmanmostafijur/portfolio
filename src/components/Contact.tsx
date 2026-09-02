export default function Contact() {
  return (
    <section id="contact" aria-label="Contact">
      <p className="section-label">Contact →</p>

      <h2 className="contact-heading reveal">
        Let's build something <em>great</em> together.
      </h2>

      <a href="mailto:mustafiz.emon194@gmail.com" className="contact-email-link reveal">
        mustafiz.emon194@gmail.com
      </a>

      <div className="contact-cols reveal-stagger">
        <div>
          <p className="contact-col-label">Social</p>
          <a href="https://github.com/rahmanmostafijur" target="_blank" rel="noopener noreferrer" className="contact-value-link">
            Github ↗
          </a>
          <a href="https://linkedin.com/in/mostafijemon00" target="_blank" rel="noopener noreferrer" className="contact-value-link">
            LinkedIn ↗
          </a>
        </div>

        <div>
          <p className="contact-col-label">Availability</p>
          <p className="contact-value-link" style={{ color: 'var(--text-muted)', cursor: 'default' }}>
            Open to freelance &amp; collaborations
          </p>
        </div>
      </div>
    </section>
  );
}
