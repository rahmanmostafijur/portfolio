import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-white/8">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center justify-between gap-4 px-6 py-8 text-center sm:flex-row sm:text-left md:px-12 lg:px-20">
        <p className="font-sans text-[13px] text-chalk-faint">
          Designed &amp; built by{' '}
          <span className="font-semibold text-amber-brand">Mostafij Emon</span>
          <span className="mx-2 text-white/20">·</span>
          {new Date().getFullYear()}
        </p>

        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center gap-1.5 font-sans text-[13px] text-chalk-faint transition-colors duration-300 hover:text-chalk"
        >
          <span aria-hidden>↑</span> Back to top
        </Link>
      </div>
    </footer>
  );
}
