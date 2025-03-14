'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Button from '@/components/Button';
import AnimatedText from '@/components/AnimatedText';

const socialLinks = [
  { icon: <FaGithub />, url: "https://github.com/safwannuddin" },
  { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/mohd-safwan-uddin-299602257/" }
];

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#050816] relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#00ff9d10_1px,transparent_1px)] [background-size:32px_32px]" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050816]/50 to-[#050816]"
          animate={{
            backgroundPosition: ['0px 0px', '100px 100px', '0px 0px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 mb-4 flex items-center gap-2"
            >
              <span className="inline-block animate-wave">👋</span> Hi There! I&apos;m
            </motion.h2>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              <span className="text-[#00ff9d]">Mohd</span>{" "}
              <span className="text-white">Safwan</span>{" "}
              <span className="text-[#00ff9d]">Uddin</span>
            </motion.h1>

            <AnimatedText 
              text="A Full-Stack Developer"
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
            />
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gray-400 text-lg mb-8 leading-relaxed"
            >
              Transforming ideas into reality through code.{" "}
              <span className="text-[#00ff9d]">Computer Science</span> enthusiast specializing in{" "}
              <span className="text-[#00ff9d]">modern web development</span>, with a passion for{" "}
              <span className="text-[#00ff9d]">AI</span> and emerging technologies.
            </motion.p>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="relative mb-8 p-8 border-l-2 border-[#00ff9d] bg-gradient-to-r from-white/5 via-white/[0.02] to-transparent rounded-r-lg overflow-hidden group hover:from-white/10"
            >
              {/* Animated Background Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#00ff9d]/10 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Quote Content */}
              <motion.p 
                className="relative text-gray-300 italic text-xl leading-relaxed font-light"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                &ldquo;The only limits in life are the ones you make. Dream bigger, push harder, and transform your vision into reality.&rdquo;
              </motion.p>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#00ff9d]/5 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-4"
            >
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
            </motion.div>

            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8 flex gap-4"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-gray-400 hover:text-[#00ff9d] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Animated Decorative Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative lg:h-[600px] order-first lg:order-last hidden lg:block"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-72 h-72 border border-[#00ff9d]/20 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#00ff9d] rounded-full"
          animate={{
            y: [0, -30, 0],
            x: [0, i % 2 === 0 ? 20 : -20, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </section>
  );
}
