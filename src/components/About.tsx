export default function About() {
  return (
    <section id="about" aria-label="About me">
      <div className="about-grid">

        {/* ─── NEW GLASS CARD WITH FLOATING BACKGROUND SHAPES ─── */}
        <div className="about-glass-wrapper reveal">
          
          {/* Animated Background Shapes (Behind the glass) */}
          <div className="bg-shape shape-purple-top"></div>
          <div className="bg-shape shape-teal-mid"></div>
          <div className="bg-shape shape-purple-small"></div>

          {/* The Frosted Glass Card */}
          <div className="glass-card">
            {/* Avatar with glowing/glitchy green border */}
            <div className="avatar-glitch-container">
              <img 
                src="/emon.png" 
                alt="Mostafij Emon" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            
            <h3 className="glass-title">Software ENGINEER · ACCIPTRA</h3>
          
          </div>
        </div>

        {/* Right: Text Content (Unchanged) */}
        <div>
          <p className="section-label">About me</p>

          <h2 className="about-heading reveal">
            Building software<br />that actually <em>matters</em>
          </h2>

          <p className="about-text reveal">
            Hey — I'm Mostafij Emon, an AI Engineer and Backend Specialist.
            I specialize in full-stack development, distributed systems,
            and machine learning pipelines. I obsess over code quality, performance
            at scale, and creating seamless developer experiences.
          </p>

          <p className="about-text reveal">
            I've built and shipped products spanning complex APIs, AI-driven solutions, 
            and scalable infrastructure. When I'm not pushing commits, I explore new 
            architectures, contribute to open source, and constantly refine my toolkit.
          </p>

          <div className="skills-grid reveal">
            <span className="skill-chip">Python</span>
            <span className="skill-chip">TypeScript</span>
            <span className="skill-chip">FastAPI</span>
            <span className="skill-chip">React</span>
            <span className="skill-chip">Node.js</span>
            <span className="skill-chip">PostgreSQL</span>
            <span className="skill-chip">Docker</span>
            <span className="skill-chip">Machine Learning</span>
            <span className="skill-chip">REST APIs</span>
          </div>
        </div>

      </div>
    </section>
  );
}