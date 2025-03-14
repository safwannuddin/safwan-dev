'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/Button'; // Ensure this path is correct
import AnimatedText from '@/components/AnimatedText';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#050816] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050816] pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xl text-gray-400 mb-4">
              👋 Hi There!   I&apos;m
            </h2>
            
            {/* Animated Name with Gradient Effect */}
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              <span className="text-neon-green">Mohd</span> 
              <span className="text-white"> Safwan</span> 
              <span className="text-neon-green"> Uddin</span>
            </motion.h1>

            <AnimatedText 
              text="A Full-Stack Developer"
              className="text-3xl md:text-4xl font-bold mb-6 neon-text"
            />
            
            <p className="text-gray-400 text-lg mb-8">
              I&apos;m a <span className="neon-text">Computer Science</span> student passionate about 
              <span className="neon-text"> AI/ML</span> and <span className="neon-text">Blockchain</span>. 
              I specialize in building modern, scalable web applications with clean and efficient code.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                href="#projects"
                variant="primary"
                size="lg"
              >
                View My Work
              </Button>
              
              <Button 
                href="#contact"
                variant="outline"
                size="lg"
              >
                Contact Me
              </Button>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative lg:h-[600px] order-first lg:order-last"
          >
            <Image
              src="/developer-illustration.svg"
              alt="Developer Illustration"
              width={500}
              height={500}
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
