export default function Hero() {
  return (
    <section id="hero" aria-label="Introduction">
      <div className="hero-title-wrap">
        <h1 className="hero-serif hero-serif--overlap">
          Hey, I'm <em>Mostafij Emon</em>
        </h1>

        <div className="hero-photo-wrap hero-photo-overlap">
          <img
            src="/emon.png"
            alt="Mostafij Emon"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className="scroll-badge" aria-hidden="true">Scroll more ↓</div>
        </div>
      </div>

      <div className="hero-below">
        <p className="hero-tagline">
          As a <strong>Full Stack Software Engineer</strong>, I help teams design, build and
          ship reliable software — from polished frontends to clean, production-grade APIs.
        </p>

        <div className="hero-socials">
          <a href="https://github.com/rahmanmostafijur" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"></path></svg>
          </a>
          <a href="https://linkedin.com/in/mostafijemon00" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
        </div>

        <a
          href="/Mostafijur_Rahman_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-resume-link"
        >
          Download Resume
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M8 1v9m0 0 3-3m-3 3-3-3M2 12v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
