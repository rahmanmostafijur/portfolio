export default function Education() {
  return (
    <section id="education" aria-label="Education">
      <p className="section-label">Education</p>
      <h2 className="exp-heading reveal">Academic Background</h2>

      <div className="timeline reveal">
        {/* Degree 1 */}
        <div className="timeline-item">
          <p className="exp-period">2019 — 2023</p>
          <h3 className="exp-role">B.Sc in Computer Science & Engineering</h3>
          <p className="exp-company">Green University of Bangladesh, Dhaka</p>
          <p className="exp-desc">
            Graduated with Honors. Specialized in distributed systems and software architecture. 
            Core coursework included Data Structures, Algorithms, Operating Systems, and Machine Learning.
          </p>
        </div>

        {/* Degree/Certification 2 (Optional, delete if not needed) */}
        <div className="timeline-item">
          <p className="exp-period">2017</p>
          <h3 className="exp-role">HSC in Science</h3>
          <p className="exp-company">Adamjee Cantonment College</p>
          <p className="exp-desc">
            Completed higher secondary education with a focus on science subjects.
          </p>
        </div>
      </div>
    </section>
  );
}