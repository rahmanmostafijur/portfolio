export default function Projects() {
  return (
    <section id="projects" aria-label="Projects">
      <p className="section-label">Projects</p>
      <h2 className="projects-heading reveal">Things I've built</h2>

      <div className="projects-grid reveal-stagger">

        {/* Project 1: featured */}
        <article className="project-card featured" tabIndex={0} aria-label="Nexus — distributed task queue">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className="project-icon" aria-hidden="true">⚡</div>
            <span className="project-badge">Open Source</span>
          </div>
         <h3 className="project-title">Air Pollution Monitoring System & Forecasting</h3>
          <p className="project-desc">
            Developed an Air Pollution Monitoring and Forecasting System that tracks real-time air quality data and predicts future pollution levels.
Collected and processed environmental data from multiple sources to ensure accuracy and reliability.
Built a backend using Python and FastAPI to handle data processing, storage, and forecasting logic.
Implemented predictive models to analyze trends and forecast air quality levels based on historical data.
Designed an interactive frontend using React and Next.js for clear data visualization and user-friendly insights.
Enabled users to monitor pollution levels and make informed decisions through intuitive dashboards.
Focused on performance, scalability, and clean architecture throughout the system design..
          </p> 
          <div className="project-links">
            <a href="https://github.com/mustafiz-emon/Air-Polltion-Monitoring-and-Forecasting.git" className="project-link" aria-label="View Air Pollution Monitoring System & Forecasting on GitHub">
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38l-.01-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.67 7.67 0 012-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              GitHub
            </a>
            <a href="#" className="project-link" aria-label="Live demo of Nexus">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M8 2H2v12h12V8M10 2h4v4M14 2L7 9" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Live Demo
            </a>
          </div>
        </article>



      </div>
    </section>
  );
}