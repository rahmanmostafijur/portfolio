import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import Career from '@/components/sections/Career';
import Education from '@/components/sections/Education';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Career />
      <Education />
      <Skills />
      <Contact />
    </>
  );
}
