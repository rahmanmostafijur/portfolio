export default function Experience() {
  return (
    <section id="experience" aria-label="Work experience">
      <p className="section-label">Experience</p>
      <h2 className="exp-heading reveal">Where I've worked</h2>

      <div className="timeline reveal">

        {/* Job 1 */}
        <div className="timeline-item">
          <p className="exp-period">2026 — Present</p>
          <h3 className="exp-role">Software Engineer</h3>
          <p className="exp-company">Acciptra &nbsp;·&nbsp; Dhaka, Bangladesh (Hybrid)</p>
          <p className="exp-desc">
            Designed and developed scalable backend services using Python and FastAPI, focusing on performance and clean architecture.
Built dynamic, user-friendly interfaces with React and Next.js, ensuring responsive and seamless user experiences.
Developed and maintained full-stack features using TypeScript for better type safety and code reliability.
Designed and consumed RESTful APIs, enabling smooth communication between frontend and backend systems.
Optimized application performance and improved load times through efficient data handling and rendering strategies.
Collaborated with cross-functional teams to deliver high-quality, production-ready solutions.
Wrote clean, maintainable, and well-documented code following modern development best practices.
Continuously debugged, tested, and improved system stability and scalability in a fast-paced environment.
          </p>
          <div className="exp-tags">
            <span className="exp-tag">Python</span>
            <span className="exp-tag">JavaScript</span>
            <span className="exp-tag">React</span>
            <span className="exp-tag">PostgreSQL</span>
            <span className="exp-tag">Java</span>
          </div>
        </div>



      </div>
    </section>
  );
}