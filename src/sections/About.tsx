'use client';

import { motion } from 'framer-motion';
import AnimatedText from '@/components/AnimatedText';

export default function About() {
  return (
    <section id="about" className="py-20 bg-[#050816] relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedText 
          text="About Me" 
          className="text-4xl font-bold text-center mb-12"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4 neon-text">
            My Journey
          </h3>
          <p className="text-gray-400 leading-relaxed mb-6">
            I am a Computer Science student passionate about Artificial Intelligence, Machine Learning, and Blockchain technology. With a strong foundation in full-stack development, I enjoy building innovative solutions that merge cutting-edge technologies with practical applications.
          </p>
          <p className="text-gray-400 leading-relaxed">
            My journey has been driven by curiosity and a desire to solve complex problems. I thrive in environments that challenge me to learn and grow, and I am committed to contributing to projects that make a meaningful impact.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
