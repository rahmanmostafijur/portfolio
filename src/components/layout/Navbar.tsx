import type { MouseEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { blogLink, navLinks, profile, type SectionId } from '@/data/profile';
import { useSectionNavigation } from '@/hooks/useSectionNavigation';
import { ToggleTheme } from '@/components/lightswind/toggle-theme';

export default function Navbar() {
  const goToSection = useSectionNavigation();

  const handleClick = (id: SectionId) => (event: MouseEvent<HTMLAnchorElement>) => {
    // Let modified clicks (new tab/window) behave like normal links
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    goToSection(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 rounded-2xl border border-border bg-background/80 px-3 shadow-sm backdrop-blur-xl sm:px-4"
      >
        <a
          href="/#home"
          onClick={handleClick('home')}
          className="flex shrink-0 items-center gap-3 rounded-xl"
          aria-label={`${profile.name}, back to top`}
        >
          <span
            aria-hidden
            className="flex size-10 items-center justify-center rounded-xl bg-brand-gradient font-display text-sm font-bold text-white"
          >
            {profile.initials}
          </span>
          <span className="hidden flex-col leading-tight sm:flex md:hidden lg:flex">
            <span className="font-display text-[15px] font-bold text-foreground">{profile.name}</span>
            <span className="text-[10px] font-semibold tracking-[0.2em] text-muted-foreground">
              PORTFOLIO
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`/#${link.id}`}
                onClick={handleClick(link.id)}
                className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:px-4"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <NavLink
              to={blogLink.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground lg:px-4 ${
                  isActive ? 'bg-muted text-foreground' : 'text-muted-foreground'
                }`
              }
            >
              {blogLink.label}
            </NavLink>
          </li>
        </ul>

        <ToggleTheme className="shrink-0" />
      </nav>
    </header>
  );
}
