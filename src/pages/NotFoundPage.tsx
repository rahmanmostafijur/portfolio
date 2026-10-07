import { Link } from 'react-router-dom';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function NotFoundPage() {
  usePageMeta({ title: 'Page not found', noIndex: true });

  return (
    <section
      aria-labelledby="not-found-heading"
      className="mx-auto w-full max-w-7xl px-6 pt-44 pb-24 text-center"
    >
      <p className="text-sm font-semibold text-muted-foreground">404</p>
      <h1
        id="not-found-heading"
        className="mt-2 text-4xl font-bold tracking-tight md:text-5xl"
      >
        Page not <span className="text-gradient-primary">found</span>
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
