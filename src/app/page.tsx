import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Projects from '@/sections/Projects';
import Contact from '@/sections/Contact';
import Skills from '@/sections/skills';
import Experience from '@/sections/Experience';
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
        <Experience />
        <Projects />
        <Certificates />
        <Contact />
        
        {/* Footer */}
        <footer className="py-8 border-t border-white/10 mt-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-gray-400 text-lg">
              Built with <span className="text-red-500 text-xl animate-pulse">❤️</span> by{' '}
              <span className="text-white font-semibold">Safwan Uddin</span>
            </p>
            <p className="text-gray-500 text-sm mt-2">
              © 2026 All rights reserved
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}