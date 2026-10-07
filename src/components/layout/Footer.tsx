import { Link } from 'react-router-dom';
import { profile, socials } from '@/data/profile';

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 pt-8 pb-28 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <p>
          © {new Date().getFullYear()} <span className="font-medium text-foreground">{profile.name}</span>
        </p>

        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <Link to="/blog" className="transition-colors hover:text-foreground">
            Blog
          </Link>
          {socials
            .filter((s) => s.icon !== 'email')
            .map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
        </nav>
      </div>
    </footer>
  );
}
