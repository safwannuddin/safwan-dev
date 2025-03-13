'use client';

import { motion } from 'framer-motion';
import AnimatedText from '@/components/AnimatedText';

const skills = [
  "React/Next.js", "TypeScript", "Node.js",
  "Tailwind CSS", "MongoDB", "REST APIs",
  "Git/GitHub", "AWS", "Firebase"
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-[#050816]/50 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedText 
          text="About Me" 
          className="text-4xl font-bold text-center mb-12"
        />
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Bio */}
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
              A passionate Frontend Engineer with expertise in building modern web applications.
              I specialize in creating responsive, performant, and user-friendly interfaces
              using cutting-edge technologies.
            </p>
            <p className="text-gray-400 leading-relaxed">
              With a strong foundation in both design and development, I bridge the gap
              between aesthetics and functionality to deliver exceptional digital experiences.
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6 neon-text">
              Skills & Technologies
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  className="px-4 py-2 bg-gray-800/50 rounded-full text-gray-300 backdrop-blur-sm
                           border border-gray-700 hover:border-[#00ff9d] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}