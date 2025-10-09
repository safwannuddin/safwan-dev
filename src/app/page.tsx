import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Projects from '@/sections/Projects';
import Contact from '@/sections/Contact';
import Skills from '@/sections/skills';
import Certificates from '@/sections/Certificates';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* Clean Black Background */}
      <div className="fixed inset-0 bg-black" />
      
      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </div>
    </main>
  );
}