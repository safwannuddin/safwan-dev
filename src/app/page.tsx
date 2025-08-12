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
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a]">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#00ff9d]/5 via-transparent to-[#0066ff]/5" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full blur-3xl animate-pulse"
              style={{
                background: `radial-gradient(circle, ${['#00ff9d', '#0066ff', '#ff6b35'][i]}15 0%, transparent 70%)`,
                width: `${300 + i * 100}px`,
                height: `${300 + i * 100}px`,
                left: `${25 + i * 25}%`,
                top: `${20 + i * 30}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${6 + i * 2}s`,
              }}
            />
          ))}
        </div>
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