'use client';

import { motion } from 'framer-motion';
import Button from '@/components/Button';
import AnimatedText from '@/components/AnimatedText';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#050816] relative overflow-hidden grid-bg">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050816] pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xl text-gray-400 mb-4">👋 Hi There! I&apos;m</h2>
            <AnimatedText 
              text="Safwan Khan"
              className="text-5xl md:text-6xl font-bold mb-4"
            />
            <AnimatedText 
              text="A Frontend Engineer"
              className="text-3xl md:text-4xl font-bold mb-6 neon-text"
            />
            <p className="text-gray-400 text-lg mb-8">
              I help startups <span className="neon-text">launch</span> and{' '}
              <span className="neon-text">grow</span> their products with modern web technologies.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="#projects" variant="primary" size="lg">
                View My Work
              </Button>
              <Button href="#contact" variant="outline" size="lg">
                Contact Me
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative lg:h-[600px] order-first lg:order-last bg-gray-800/30 rounded-lg"
          />
        </div>
      </div>

      <motion.div className="card-hover glass-effect p-6">
        <h1 className="gradient-text">Your Text Here</h1>
        <Button className="btn btn-primary">Click Me</Button>
      </motion.div>
    </section>
  );
}