'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { FaRocket } from 'react-icons/fa';
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
            {/* About Me Content */}
            <div className="space-y-8">
              <h3 className="text-4xl font-bold text-white text-center mb-8">
                Turning ideas into real, usable systems
              </h3>

              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-xl text-center mb-8">
                  Hi, I&apos;m <span className="text-white font-semibold">Mohd Safwan Uddin</span> — a developer who enjoys building things that actually work in the real world.
                </p>

                <p className="text-lg">
                  I&apos;m driven by curiosity and a strong belief that good technology should feel intuitive, even when the systems behind it are complex. Over time, that mindset has pushed me to work across AI, backend systems, and product-focused development — always starting with the problem before jumping to solutions.
                </p>

                <p className="text-lg">
                  I enjoy building AI-powered tools, automations, and data-driven systems that solve practical problems for real users. Whether it&apos;s working on machine learning pipelines, backend APIs, or refining the user flow of a product, I care deeply about clarity, structure, and usability.
                </p>

                <p className="text-lg">
                  I&apos;ve learned that the best results come from slowing down enough to understand why a problem exists, not just how to code a solution. That&apos;s why I like combining modern technologies like AI and ML with strong fundamentals in system design and user experience.
                </p>

                <p className="text-lg">
                  Right now, I&apos;m focused on learning deeply, building intentionally, and collaborating with people who care about craftsmanship and long-term impact.
                </p>
              </div>

              {/* Quote */}
              <motion.div
                className="relative p-8 glass-card rounded-2xl border-l-4 border-white mt-12"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xl italic text-gray-300 leading-relaxed text-center">
                  &quot;Clarity comes before speed. Build with intention, and the rest follows.&quot;
                </p>
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