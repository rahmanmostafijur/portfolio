import { useEffect } from 'react';

export default function Skills() {
  useEffect(() => {
    // This observer handles filling the skill bars when they scroll into view
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
              const htmlBar = bar as HTMLElement; 
              const pct = htmlBar.getAttribute('data-pct');
              
              setTimeout(() => { 
                htmlBar.style.width = pct + '%'; 
              }, 200);
            });
            barObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.skill-category').forEach(el => barObserver.observe(el));

    return () => barObserver.disconnect();
  }, []);

  return (
    <section id="skills" aria-label="Skills and technologies">
      <p className="section-label">Skills</p>
      <h2 className="skills-section-heading reveal">Tech I work with</h2>

      <div className="skills-categories reveal-stagger">

        {/* Languages */}
        <div className="skill-category">
          <p className="skill-cat-label">Languages</p>
          <div className="skill-bars">
            <div className="skill-bar-item">
              <div className="skill-bar-header"><span>Python</span><span className="skill-bar-pct">95%</span></div>
              <div className="skill-bar-track"><div className="skill-bar-fill" data-pct="95"></div></div>
            </div>
            <div className="skill-bar-item">
              <div className="skill-bar-header"><span>TypeScript / JavaScript</span><span className="skill-bar-pct">90%</span></div>
              <div className="skill-bar-track"><div className="skill-bar-fill" data-pct="90"></div></div>
            </div>
            <div className="skill-bar-item">
              <div className="skill-bar-header"><span>Java</span><span className="skill-bar-pct">80%</span></div>
              <div className="skill-bar-track"><div className="skill-bar-fill" data-pct="80"></div></div>
            </div>
            <div className="skill-bar-item">
              <div className="skill-bar-header"><span>C</span><span className="skill-bar-pct">75%</span></div>
              <div className="skill-bar-track"><div className="skill-bar-fill" data-pct="75"></div></div>
            </div>
          </div>
        </div>

        {/* Backend & Frameworks */}
        <div className="skill-category">
          <p className="skill-cat-label">Backend &amp; Frameworks</p>
          <div className="skill-bars">
            <div className="skill-bar-item">
              <div className="skill-bar-header"><span>Node.js</span><span className="skill-bar-pct">85%</span></div>
              <div className="skill-bar-track"><div className="skill-bar-fill" data-pct="85"></div></div>
            </div>
            <div className="skill-bar-item">
              <div className="skill-bar-header"><span>FastAPI</span><span className="skill-bar-pct">90%</span></div>
              <div className="skill-bar-track"><div className="skill-bar-fill" data-pct="90"></div></div>
            </div>
            <div className="skill-bar-item">
              <div className="skill-bar-header"><span>RESTful APIs</span><span className="skill-bar-pct">95%</span></div>
              <div className="skill-bar-track"><div className="skill-bar-fill" data-pct="95"></div></div>
            </div>
          </div>
        </div>

        {/* Databases */}
        <div className="skill-category">
          <p className="skill-cat-label">Databases</p>
          <div className="skill-bars">
            <div className="skill-bar-item">
              <div className="skill-bar-header"><span>PostgreSQL</span><span className="skill-bar-pct">90%</span></div>
              <div className="skill-bar-track"><div className="skill-bar-fill" data-pct="90"></div></div>
            </div>
            <div className="skill-bar-item">
              <div className="skill-bar-header"><span>SQL</span><span className="skill-bar-pct">85%</span></div>
              <div className="skill-bar-track"><div className="skill-bar-fill" data-pct="85"></div></div>
            </div>
          </div>
        </div>

        {/* Tools & Infrastructure */}
        <div className="skill-category">
          <p className="skill-cat-label">Tools &amp; Infrastructure</p>
          <div className="skill-bars">
            <div className="skill-bar-item">
              <div className="skill-bar-header"><span>Docker</span><span className="skill-bar-pct">80%</span></div>
              <div className="skill-bar-track"><div className="skill-bar-fill" data-pct="80"></div></div>
            </div>
            <div className="skill-bar-item">
              <div className="skill-bar-header"><span>Postman</span><span className="skill-bar-pct">95%</span></div>
              <div className="skill-bar-track"><div className="skill-bar-fill" data-pct="95"></div></div>
            </div>
            <div className="skill-bar-item">
              <div className="skill-bar-header"><span>Git / GitHub</span><span className="skill-bar-pct">90%</span></div>
              <div className="skill-bar-track"><div className="skill-bar-fill" data-pct="90"></div></div>
            </div>
            <div className="skill-bar-item">
              <div className="skill-bar-header"><span>Linux / Bash</span><span className="skill-bar-pct">85%</span></div>
              <div className="skill-bar-track"><div className="skill-bar-fill" data-pct="85"></div></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}