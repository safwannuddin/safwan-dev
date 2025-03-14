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
            className="relative w-full max-w-md mx-auto"
          >
            {/* Main Image Container */}
            <div className="aspect-square relative rounded-2xl overflow-hidden">
              <Image
                src="/projects/3.png"
                alt="Developer Illustration"
                fill
                className="object-contain hover:scale-105 transition-transform duration-500"
                priority
              />
              
              {/* Animated Glow Effects */}
              <motion.div 
                className="absolute inset-0 bg-gradient-radial from-[#00ff9d]/20 via-transparent to-transparent"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Enhanced Floating Particles */}
              <div className="absolute inset-0">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-[#00ff9d] rounded-full"
                    animate={{
                      y: [0, -30, 0],
                      x: [0, i % 2 === 0 ? 20 : -20, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1.2, 0]
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut"
                    }}
                    style={{
                      left: `${25 + i * 15}%`,
                      top: `${40 + (i % 2) * 20}%`
                    }}
                  />
                ))}
              </div>

              {/* Radial Glow Behind Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-3/4 h-3/4 rounded-full bg-[#00ff9d]/5 blur-2xl"
                  animate={{
                    scale: [0.8, 1, 0.8],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </div>

            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(#00ff9d_0.5px,transparent_0.5px)] bg-[length:16px_16px] opacity-20" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#00ff9d]/5 to-transparent"
                animate={{
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
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
