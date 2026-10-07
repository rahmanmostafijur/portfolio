import { useEffect, useState, type MouseEvent } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { blogLink, navLinks, profile, type SectionId } from '@/data/profile';
import { useSectionNavigation } from '@/hooks/useSectionNavigation';
import { useActiveSection } from '@/hooks/useActiveSection';
import { ToggleTheme } from '@/components/lightswind/toggle-theme';
import LogoBadge from '@/components/ui/LogoBadge';
import { cn } from '@/lib/utils';

const sectionIds = navLinks.map((link) => link.id);

const linkClass = 'transition-colors hover:text-foreground';

function ActiveBar({ isActive }: { isActive: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'absolute -bottom-2 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-brand/80 shadow-[0_0_8px_rgba(139,92,246,0.8)] transition-all duration-300',
        isActive ? 'w-full' : 'w-0',
      )}
    />
  );
}

export default function Navbar() {
  const goToSection = useSectionNavigation();
  const { pathname } = useLocation();
  const activeSection = useActiveSection(sectionIds, pathname === '/');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  const handleClick = (id: SectionId) => (event: MouseEvent<HTMLAnchorElement>) => {
    // Let modified clicks (new tab/window) behave like normal links
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    setIsMenuOpen(false);
    goToSection(id);
  };

  return (
    <header className="fixed inset-x-0 top-6 z-50 flex justify-center px-4">
      <div className="glass-panel w-full max-w-7xl rounded-[2rem] shadow-xl">
        <nav aria-label="Primary" className="flex items-center justify-between gap-4 px-6 py-4">
          <a
            href="/#home"
            onClick={handleClick('home')}
            className="group flex shrink-0 items-center gap-3 rounded-xl"
            aria-label={`${profile.name}, back to top`}
          >
            <LogoBadge className="transition-transform duration-300 group-hover:scale-105" />
            <span className="flex flex-col text-left">
              <span className="text-sm leading-none font-extrabold tracking-tight text-foreground">
                {profile.name}
              </span>
              <span className="mt-0.5 text-[9px] font-bold tracking-widest text-muted-foreground uppercase">
                Portfolio
              </span>
            </span>
          </a>

          <ul className="hidden flex-1 justify-center gap-8 text-sm font-medium text-muted-foreground lg:flex">
            {navLinks.map((link) => (
              <li key={link.id} className="relative">
                <a
                  href={`/#${link.id}`}
                  onClick={handleClick(link.id)}
                  aria-current={activeSection === link.id ? 'location' : undefined}
                  className={cn(linkClass, activeSection === link.id && 'text-foreground')}
                >
                  {link.label}
                </a>
                <ActiveBar isActive={activeSection === link.id} />
              </li>
            ))}
            <li className="relative">
              <NavLink
                to={blogLink.to}
                className={({ isActive }) => cn(linkClass, isActive && 'text-foreground')}
              >
                {blogLink.label}
              </NavLink>
              <ActiveBar isActive={pathname.startsWith(blogLink.to)} />
            </li>
          </ul>

          <div className="flex items-center gap-2">
            <ToggleTheme className="shrink-0" />
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted lg:hidden"
            >
              {isMenuOpen ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
            </button>
          </div>
        </nav>

        {isMenuOpen && (
          <ul
            id="mobile-menu"
            className="flex flex-col gap-1 border-t border-border/60 px-4 py-3 text-base font-medium lg:hidden"
          >
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`/#${link.id}`}
                  onClick={handleClick(link.id)}
                  className="block rounded-xl px-3 py-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <NavLink
                to={blogLink.to}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {blogLink.label}
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}
