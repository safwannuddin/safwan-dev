'use client';

import { motion } from 'framer-motion';
import AnimatedText from '@/components/AnimatedText';
import Image from 'next/image';
import { FaGraduationCap, FaLaptopCode, FaRocket } from 'react-icons/fa';

const achievements = [
  {
    icon: <FaGraduationCap className="text-[#00ff9d] text-3xl" />,
    title: "Education",
    description: "Computer Science Student with focus on modern web technologies and AI"
  },
  {
    icon: <FaLaptopCode className="text-[#00ff9d] text-3xl" />,
    title: "Development",
    description: "Full-stack developer specializing in Next.js, React, and Node.js"
  },
  {
    icon: <FaRocket className="text-[#00ff9d] text-3xl" />,
    title: "Passion",
    description: "Enthusiast in AI, Machine Learning, and Blockchain technology"
  }
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-[#050816] relative">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedText 
          text="About Me" 
          className="text-5xl font-bold text-center mb-16"
        />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square relative rounded-2xl overflow-hidden">
              <Image
                src="/projects/1.jpeg" // Updated path to your photo
                alt="Mohd Safwan Uddin"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#00ff9d]/20 to-transparent" />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(#00ff9d_0.5px,transparent_0.5px)] bg-[length:16px_16px] opacity-20" />
          </motion.div>

          {/* Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-4 text-[#00ff9d]">
                Passionate Full-Stack Developer
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                As a Computer Science student and full-stack developer, I blend creativity with technical expertise to build innovative web solutions. My journey in technology is driven by a passion for creating impactful digital experiences that solve real-world problems.
              </p>
              <p className="text-gray-400 leading-relaxed">
                I specialize in modern web technologies like Next.js, React, and Node.js, while maintaining a keen interest in emerging fields such as AI and Blockchain. My approach combines clean code practices with user-centric design principles.
              </p>
            </motion.div>

            {/* Achievements */}
            <div className="grid sm:grid-cols-3 gap-6 mt-12">
              {achievements.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="mb-4">{item.icon}</div>
                  <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#00ff9d_0.5px,transparent_0.5px)] bg-[length:24px_24px] opacity-[0.05] pointer-events-none" />
    </section>
  );
}
