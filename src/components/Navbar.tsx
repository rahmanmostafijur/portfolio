import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/education', label: 'Education' },
  { to: '/projects', label: 'Projects' },
  { to: '/publications', label: 'Publications' },
  { to: '/blog', label: 'Blog' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLight, setIsLight] = useState(() => localStorage.getItem('theme') === 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('light', isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  }, [isLight]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative font-sans text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:bg-amber-brand after:transition-all after:duration-300 ${
      isActive
        ? 'text-chalk after:w-full'
        : 'text-chalk-faint after:w-0 hover:text-chalk hover:after:w-full'
    }`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'border-b border-white/8 bg-ink-800/85 py-4 backdrop-blur-xl'
            : 'border-b border-transparent py-6'
        }`}
      >
        <nav className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-6 px-6 md:px-10 lg:px-12">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <img
              src="/emon.png"
              alt=""
              className="size-8 rounded-full border border-white/15 object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <span className="font-display text-base font-bold uppercase tracking-[-0.01em] text-chalk">
              Emon
            </span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex xl:gap-9">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsLight((p) => !p)}
              aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
              aria-pressed={isLight}
              className="relative hidden h-6 w-11 shrink-0 rounded-full border border-chalk-faint/40 bg-ink-600 transition-colors duration-300 sm:block"
            >
              <span
                className={`absolute top-0.5 size-4 rounded-full bg-chalk transition-transform duration-300 ${
                  isLight ? 'translate-x-[22px]' : 'translate-x-0.5'
                }`}
              />
            </button>

            <Link
              to="/contact"
              className="hidden rounded-full bg-amber-brand px-5 py-2.5 font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-ink-900 transition-transform duration-300 hover:-translate-y-0.5 sm:block"
            >
              Contact
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              className="flex flex-col gap-1.5 p-1 lg:hidden"
            >
              <span className="h-px w-6 bg-chalk" />
              <span className="h-px w-6 bg-chalk" />
              <span className="h-px w-6 bg-chalk" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-label="Navigation menu"
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-6 bg-ink-900/98 backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="absolute right-6 top-6 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-chalk-faint hover:text-chalk"
            >
              [ close ]
            </button>

            {[...navItems, { to: '/contact', label: 'Contact' }].map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
              >
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `font-display text-2xl font-bold uppercase tracking-[-0.02em] transition-colors ${
                      isActive ? 'text-amber-brand' : 'text-chalk hover:text-amber-brand'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
