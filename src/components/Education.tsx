const timeline = [
  {
    role: 'M.Sc in Computer Science & Engineering',
    org: 'East West University (EWU), Dhaka',
    date: 'Present',
    bullets: [
      'Currently pursuing a Master\'s degree, building on a foundation in software architecture and systems design.',
    ],
  },
  {
    role: 'B.Sc in Computer Science & Engineering',
    org: 'Green University of Bangladesh, Dhaka',
    date: '2019 — 2023',
    bullets: [
      'Graduated with Honors. Specialized in distributed systems and software architecture. Core coursework included Data Structures, Algorithms, Operating Systems, and Machine Learning.',
    ],
  },
  {
    role: 'HSC in Science',
    org: 'Adamjee Cantonment College',
    date: '2017',
    bullets: ['Completed higher secondary education with a focus on science subjects.'],
  },
];

export default function Education() {
  return (
    <section id="education" aria-label="Education">
      <p className="section-label">Education →</p>
      <h2 className="timeline-heading reveal">education</h2>

      <div className="timeline-rows reveal-stagger">
        {timeline.map((item) => (
          <div className="timeline-row" key={item.role}>
            <div className="timeline-role">
              <h3>{item.role}</h3>
              <span className="timeline-org">{item.org}</span>
            </div>
            <div className="timeline-date">{item.date}</div>
            <div className="timeline-detail">
              <ul className="timeline-bullets">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
