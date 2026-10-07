import Hero from '@/components/sections/Hero';
import TechMarquee from '@/components/sections/TechMarquee';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <About />
      <Services />
      <Projects />
    </>
  );
}
