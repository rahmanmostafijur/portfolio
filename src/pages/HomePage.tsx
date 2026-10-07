import { profile } from '@/data/profile';

export default function HomePage() {
  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="mx-auto w-full max-w-6xl px-4 pt-32 pb-20 sm:px-6"
    >
      <h1 id="home-heading" className="font-display text-5xl font-bold tracking-tight">
        {profile.name}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{profile.tagline}</p>
    </section>
  );
}
