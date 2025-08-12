'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaDownload, FaRocket } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useClientMount } from '@/hooks/useClientMount';

const socialLinks = [
  { icon: <FaGithub />, url: "https://github.com/safwannuddin", label: "GitHub" },
  { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/mohd-safwan-uddin-299602257/", label: "LinkedIn" }
];

const TypingText = ({ texts, className }: { texts: string[]; className?: string }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[currentTextIndex];
      
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts]);

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="text-[#00ff9d]"
      >
        |
      </motion.span>
    </span>
  );
};

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const isMounted = useClientMount();

  if (!isMounted) {
    return (
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a]">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="h-8 bg-gray-700 rounded animate-pulse" />
              <div className="h-16 bg-gray-700 rounded animate-pulse" />
              <div className="h-12 bg-gray-700 rounded animate-pulse" />
              <div className="h-6 bg-gray-700 rounded animate-pulse" />
              <div className="flex gap-4">
                <div className="h-12 w-32 bg-gray-700 rounded-full animate-pulse" />
                <div className="h-12 w-32 bg-gray-700 rounded-full animate-pulse" />
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-full h-[600px] bg-gray-800 rounded-3xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a]">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <motion.div 
          className="absolute inset-0 bg-[linear-gradient(rgba(0,255,157,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,157,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00ff9d]/5 via-transparent to-[#0066ff]/5" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        
        {/* Floating Orbs */}
        {[...Array(6)].map((_, i) => {
          const colors = ['#00ff9d', '#0066ff', '#ff6b35'];
          const leftPos = (i * 16.67) % 100;
          const topPos = (i * 13.33) % 100;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl"
              style={{
                background: `radial-gradient(circle, ${colors[i % 3]}20 0%, transparent 70%)`,
                width: `${200 + i * 50}px`,
                height: `${200 + i * 50}px`,
                left: `${leftPos}%`,
                top: `${topPos}%`,
              }}
              animate={{
                x: [0, 100, -50, 0],
                y: [0, -100, 50, 0],
                scale: [1, 1.2, 0.8, 1],
                opacity: [0.3, 0.6, 0.2, 0.3],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2,
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center gap-3"
            >
              <motion.span 
                className="text-3xl"
                animate={{ 
                  rotate: [0, 20, -20, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                👋
              </motion.span>
              <span className="text-xl text-gray-400 font-medium">
                Hello, I&apos;m
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold leading-tight"
            >
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Mohd Safwan
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#00ff9d] via-[#00cc7a] to-[#009957] bg-clip-text text-transparent">
                Uddin
              </span>
            </motion.h1>

            {/* Typing Animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-2xl md:text-3xl font-semibold text-gray-300"
            >
              <TypingText 
                texts={[
                  "Full-Stack Developer",
                  "AI Enthusiast", 
                  "Problem Solver",
                  "Tech Innovator"
                ]}
              />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-lg text-gray-400 leading-relaxed max-w-2xl"
            >
              Passionate about creating innovative digital solutions that bridge the gap between 
              <span className="text-[#00ff9d] font-semibold"> cutting-edge technology</span> and 
              <span className="text-[#00ff9d] font-semibold"> user-centric design</span>. 
              Specializing in modern web development with a focus on AI integration.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#projects"
                className="group relative px-8 py-4 bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,157,0.5)]"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FaRocket />
                  View My Work
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#00cc7a] to-[#009957]"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              <motion.a
                href="/resume.pdf"
                download
                className="group px-8 py-4 border-2 border-[#00ff9d] text-[#00ff9d] font-semibold rounded-full hover:bg-[#00ff9d] hover:text-black transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  <FaDownload />
                  Download CV
                </span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex gap-6"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:border-[#00ff9d]/50 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  title={link.label}
                >
                  <span className="text-2xl text-gray-400 group-hover:text-[#00ff9d] transition-colors duration-300">
                    {link.icon}
                  </span>
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#00ff9d]/10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* 3D Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative hidden lg:block"
            style={{ y: y1 }}
          >
            <div className="relative w-full h-[600px] flex items-center justify-center">
              {/* Rotating Rings */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute border border-[#00ff9d]/20 rounded-full"
                  style={{
                    width: `${300 + i * 80}px`,
                    height: `${300 + i * 80}px`,
                  }}
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: {
                      duration: 20 + i * 5,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    scale: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5,
                    },
                  }}
                />
              ))}

              {/* Central Glow */}
              <motion.div
                className="absolute w-40 h-40 bg-gradient-to-r from-[#00ff9d] to-[#0066ff] rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Floating Code Elements */}
              {['{ }', '</>', 'fn()', '[]'].map((symbol, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl font-mono text-[#00ff9d]/60"
                  style={{
                    left: `${30 + (i % 2) * 40}%`,
                    top: `${30 + Math.floor(i / 2) * 40}%`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                >
                  {symbol}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-[#00ff9d]/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-[#00ff9d] rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}