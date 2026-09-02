import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
        <div className="nav-left">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <img
              src="/emon.png"
              alt="Mostafij Emon"
              className="nav-avatar-img"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <span className="nav-name">Emon</span>
          </Link>
        </div>

        <div className="nav-link-cols">
          <div className="nav-link-col">
            <Link to="/">Home</Link>
            <Link to="/projects">Projects</Link>
          </div>
          <div className="nav-link-col">
            <Link to="/about">About</Link>
            <Link to="/blog">Blog</Link>
          </div>
        </div>

        <div className="nav-actions">
          <button onClick={toggleTheme} className="nav-icon-btn" aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
          <Link to="/contact" className="nav-resume-btn">Contact with me →</Link>
        </div>

        <div className="hamburger" aria-label="Open menu" onClick={() => setIsMenuOpen(true)}>
          <span></span><span></span><span></span>
        </div>
      </nav>

      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`} role="dialog" aria-label="Navigation menu">
        <button className="mobile-close" onClick={closeMenu}>[ close ]</button>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>
        <Link to="/projects" onClick={closeMenu}>Projects</Link>
        <Link to="/blog" onClick={closeMenu}>Blog</Link>
        <Link to="/contact" onClick={closeMenu}>Contact</Link>
      </div>
    </>
  );
}
