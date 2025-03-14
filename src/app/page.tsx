import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Projects from '@/sections/Projects';
import Contact from '@/sections/Contact';
import Skills from '@/sections/skills';

export default function Home() {
  return (
    <main className="relative">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:50px_50px]" />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}