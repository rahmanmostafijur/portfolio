import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="mx-auto w-full max-w-6xl px-4 pt-40 pb-24 text-center sm:px-6"
    >
      <p className="text-sm font-semibold text-muted-foreground">404</p>
      <h1
        id="not-found-heading"
        className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl"
      >
        Page not <span className="text-gradient">found</span>
      </h1>
      <p className="mt-4 text-muted-foreground">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        Back home
      </Link>
    </section>
  );
}
