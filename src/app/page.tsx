import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Projects from '@/sections/Projects';
import Contact from '@/sections/Contact';
import Skills from '@/sections/skills';
import Certificates from '@/sections/Certificates';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0 bg-dark-900">
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-secondary-900/20" />
      </div>
      
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