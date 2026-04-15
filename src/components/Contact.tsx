export default function Contact() {
  return (
    <section id="contact" aria-label="Contact">
      <p className="section-label" style={{ marginBottom: '0.5rem' }}>Contact</p>
      <h2 className="contact-heading reveal" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textAlign: 'left', marginBottom: '0' }}>
        Let's build something intelligent together.
      </h2>

      <div className="contact-wrapper reveal-stagger">
        
        {/* Left Side: The Form */}
        <div className="contact-card">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" id="name" className="form-input" placeholder="John Doe" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" id="email" className="form-input" placeholder="john@example.com" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="details" className="form-label">Project details</label>
              <textarea id="details" className="form-input" placeholder="Tell me about your project..."></textarea>
            </div>

            <button type="submit" className="btn-submit">
              Send message
            </button>
          </form>
        </div>

        {/* Right Side: Info & Socials */}
        <div className="contact-card">
          <p className="contact-info-text">
            Prefer async communication first. Share as much context as
            possible about your product, research, or idea — I'll respond
            with concrete next steps, not just a hello.
          </p>
          
          <p className="contact-info-text">
            Response time: <strong>within 24–48 hours</strong>
            <br />
            Available for: <strong>freelance, collaborations &amp; research-driven work</strong>
          </p>

          <a href="mailto:sakibmunshi01@gmail.com" className="email-btn">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            mustafiz.emon194@gmail.com
          </a>

          <div className="social-icons-row">
            <a href="https://github.com/rahmanmostafijur" target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"></path>
              </svg>
            </a>
            <a href="https://linkedin.com/in/mostafijemon00" target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}