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
        className="text-white"
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
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
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
              className="text-5xl md:text-7xl font-bold leading-tight text-white"
            >
              <span className="text-white">
                Mohd Safwan
              </span>
              <br />
              <span className="text-white">
                Uddin
              </span>
            </motion.h1>

            {/* Typing Animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-2xl md:text-3xl font-semibold text-white"
            >
              <TypingText 
                texts={[
                  "Full-Stack Developer",
                  "AI Platform Engineer", 
                  "Blockchain Developer",
                  "System Architect"
                ]}
              />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-lg leading-relaxed max-w-2xl text-gray-300"
            >
              Experienced full-stack developer specializing in building scalable, robust systems from 
              <span className="text-white font-semibold"> high-throughput data pipelines</span> to 
              <span className="text-white font-semibold"> production-grade React applications</span>. 
              Expert in Next.js, Python, Node.js, and AI-powered automation platforms.
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
                className="btn btn-primary flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaRocket />
                View My Work
              </motion.a>

              <motion.a
                href="/resume.pdf"
                download
                className="btn btn-secondary flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload />
                Download CV
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
                  className="group relative p-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full hover:border-white/50 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  title={link.label}
                >
                  <span className="text-2xl text-gray-400 group-hover:text-white transition-colors duration-300">
                    {link.icon}
                  </span>
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white/10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Simple Clean Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative hidden lg:block"
            style={{ y: y1 }}
          >
            <div className="relative w-full h-[600px] flex items-center justify-center">
              <div className="w-80 h-80 border-2 border-white/20 rounded-full flex items-center justify-center">
                <div className="w-60 h-60 border border-white/10 rounded-full flex items-center justify-center">
                  <div className="text-6xl text-white font-mono">{'{ }'}</div>
                </div>
              </div>
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
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}