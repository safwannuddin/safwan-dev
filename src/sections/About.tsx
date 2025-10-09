'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { FaRocket, FaHeart } from 'react-icons/fa';
import { useClientMount } from '@/hooks/useClientMount';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMounted = useClientMount();

  if (!isMounted) {
    return (
      <section id="about" className="min-h-screen py-20 relative overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="h-16 bg-gray-700 rounded mx-auto mb-4 animate-pulse max-w-md" />
            <div className="w-24 h-1 bg-gray-700 mx-auto rounded-full animate-pulse" />
          </div>
          <div className="space-y-8">
            <div className="h-12 bg-gray-700 rounded animate-pulse" />
            <div className="space-y-4">
              <div className="h-4 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="about"
      ref={containerRef}
      className="min-h-screen py-20 relative overflow-hidden bg-black"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-bold text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-white" />
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Motivational Story */}
            <div className="space-y-8">
              <h3 className="text-4xl font-bold text-white text-center mb-8">
                Turning Ideas Into Reality
              </h3>

              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-xl text-center mb-8">
                  Hey there! I&apos;m <span className="text-white font-semibold">Mohd Safwan Uddin</span> - a passionate developer who believes that 
                  <span className="text-white font-semibold"> code is poetry, and every line tells a story</span>.
                </p>

                <p className="text-lg">
                  My journey started with a simple curiosity: <span className="text-white font-semibold">What if we could make technology more human?</span> 
                  This question has driven me through countless late nights, failed attempts, and breakthrough moments that made it all worthwhile.
                </p>

                <p className="text-lg">
                  I don&apos;t just write code - I craft experiences. Whether it&apos;s building an AI-powered platform or creating a simple automation tool, 
                  I believe that <span className="text-white font-semibold">great software should feel like magic to the user, even when it&apos;s built on complex engineering underneath</span>.
                </p>

                <p className="text-lg">
                  Every project I take on is a chance to solve real problems for real people. From machine learning systems that predict user needs to 
                  intuitive interfaces that make complex tasks feel simple, I&apos;m always asking: 
                  <span className="text-white font-semibold">&quot;How can this make someone&apos;s day better?&quot;</span>
                </p>

                <p className="text-lg">
                  The tech world moves fast, but I&apos;ve learned that the best solutions come from taking time to truly understand the problem first. 
                  That&apos;s why I love combining cutting-edge technologies like AI and machine learning with timeless principles of good design and user experience.
                </p>
              </div>

              {/* Motivational Quote */}
              <motion.div
                className="relative p-8 glass-card rounded-2xl border-l-4 border-white mt-12"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-2xl italic text-white leading-relaxed text-center">
                  &quot;I don&apos;t just build applications - I build bridges between human dreams and digital reality. 
                  Every line of code is a step toward making the impossible, possible.&quot;
                </p>
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <FaHeart className="text-black text-xl" />
                </div>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="text-lg text-gray-300 mb-6">
                  Ready to turn your ideas into something amazing? Let&apos;s create something extraordinary together.
                </p>
                <motion.a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaRocket />
                  Let&apos;s Build Together
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}