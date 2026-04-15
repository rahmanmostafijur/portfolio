import { useState, useEffect } from 'react';

// Roles matching your profile
const roles = [
  'AI Engineer',
  'Systems Architect',
  'Open Source Author',
  'Backend Specialist',
  'Machine Learning Expert',
];

export default function Hero() {
  const [text, setText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation effect
  useEffect(() => {
    const currentRole = roles[roleIdx];
    const typingSpeed = isDeleting ? 40 : 75;

    if (!isDeleting && text === currentRole) {
      const pause = setTimeout(() => setIsDeleting(true), 1800);
      return () => clearTimeout(pause);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIdx((prev) => (prev + 1) % roles.length);
      const pause = setTimeout(() => {}, 400);
      return () => clearTimeout(pause);
    }

    const timeout = setTimeout(() => {
      setText(currentRole.substring(0, text.length + (isDeleting ? -1 : 1)));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIdx]);

  return (
    <section id="hero" aria-label="Introduction">
      <p className="hero-pre">Available for new opportunities &nbsp;·&nbsp; Open to relocation</p>

      {/* Corrected Name! */}
      <h1 className="hero-name">
        <span className="glitch">Mostafij Emon</span>
      </h1>

      {/* The animated typing role */}
      <h2 className="hero-role">
        <span>{text}</span>
        <span className="typed-cursor" aria-hidden="true"></span>
      </h2>

      <p className="hero-desc">
        I craft scalable systems and elegant interfaces — turning complex problems
        into clean, performant solutions. Passionate about AI architecture,
        developer experience, and open source.
      </p>

      <div className="hero-ctas">
        <a href="#projects" className="btn-primary">View my work</a>
        {/* Your CV Download Button */}
        <a href="/Mostafijur_Rahman_CV.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline">
          Download CV
        </a>
      </div>

      <div className="hero-stats reveal-stagger">
        <div className="stat-item">
          <span className="stat-num">1<span>+</span></span>
          <span className="stat-label">years of experience</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">0<span>+</span></span>
          <span className="stat-label">projects shipped</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">0<span>k</span></span>
          <span className="stat-label">GitHub stars</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">0<span>+</span></span>
          <span className="stat-label">open source contributions</span>
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <span className="scroll-line"></span>
        scroll to explore
      </div>
    </section>
  );
}