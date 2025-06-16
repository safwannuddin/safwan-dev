'use client';

import { motion } from 'framer-motion';
import AnimatedText from '@/components/AnimatedText';
import Image from 'next/image';
import { FaGraduationCap, FaLaptopCode, FaRocket, FaAward, FaBrain, FaGlobe } from 'react-icons/fa';

const achievements = [
  {
    icon: <FaGraduationCap className="text-blue-400 text-3xl" />,
    title: "Education",
    description: "3rd-year Computer Science student with a strong foundation in algorithms, networks, and AI."
  },
  {
    icon: <FaLaptopCode className="text-blue-400 text-3xl" />,
    title: "Development",
    description: "Full-stack web developer using Next.js, TailwindCSS, Supabase, and FastAPI."
  },
  {
    icon: <FaRocket className="text-blue-400 text-3xl" />,
    title: "Hackathon Achievements",
    description: "Finalist in TechHack 3 and UI Hackathon; currently building NeuroNav for Bolt Hackathon 2025."
  },
  {
    icon: <FaBrain className="text-blue-400 text-3xl" />,
    title: "AI Projects",
    description: "Working on AI-driven tools like NeuroNav — a 3D brain health visualizer using CNNs and 3D modeling."
  },
  {
    icon: <FaAward className="text-blue-400 text-3xl" />,
    title: "Certificates",
    description: "Certified in Machine Learning, Data Science, Cybersecurity, and Full-Stack Development."
  },
  {
    icon: <FaGlobe className="text-blue-400 text-3xl" />,
    title: "Open Source",
    description: "Active contributor on GitHub with a focus on building public tech solutions and sharing projects."
  }
];

export default function About() {
  return (
    <motion.section 
      id="about" 
      className="py-20 bg-[#030712] relative overflow-hidden"
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedText 
          text="About Me" 
          className="text-5xl font-bold text-center mb-16"
        />

        <div className="grid md:grid-cols-2 gap-12 items-center glass-card p-8 rounded-2xl border border-blue-800/40 shadow-lg bg-blue-950/20">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -70, y: 0 }}
            whileInView={{ opacity: 1, x: 0, y: [0, -15, 0] }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden shadow-xl border border-blue-800/40 group"
          >
            <div className="aspect-square relative rounded-2xl overflow-hidden">
              <Image
                src="/projects/3.png"
                alt="Developer Illustration"
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
                priority
              />

              <motion.div 
                className="absolute inset-0 bg-gradient-radial from-blue-400/40 via-transparent to-transparent"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.15, 1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400 rounded-full"
                    animate={{
                      y: [0, -50, 0],
                      x: [0, i % 2 === 0 ? 40 : -40, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 2, 0]
                    }}
                    transition={{
                      duration: 5 + i,
                      repeat: Infinity,
                      delay: i * 0.7,
                      ease: "easeInOut"
                    }}
                    style={{
                      left: `${15 + i * 15}%`,
                      top: `${30 + (i % 2) * 30}%`
                    }}
                  />
                ))}
              </div>

              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <motion.div
                  className="w-3/4 h-3/4 rounded-full bg-blue-400/15 blur-3xl"
                  animate={{
                    scale: [0.6, 1.2, 0.6],
                    opacity: [0.5, 0.7, 0.5]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </div>

            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(#60a5fa_1px,transparent_1px)] bg-[length:25px_25px] opacity-15" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400/15 to-transparent"
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  x: ["-200%", "200%"]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
          </motion.div>

          {/* Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, staggerChildren: 0.2, delayChildren: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold mb-4 text-blue-400"
              >
                Passionate Full-Stack Developer
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-blue-200 leading-relaxed mb-6"
              >
                I&#39;m Mohd Safwan Uddin, a Computer Science undergrad and enthusiastic full-stack developer. I love blending user-centric design with AI-driven backends to build products that truly matter.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-blue-200 leading-relaxed"
              >
                I specialize in React, Next.js, and FastAPI with real-time deployments via Supabase. I&#39;m actively working on projects like NeuroNav and HeartMate—pushing boundaries in healthtech and mental wellness using cutting-edge AI models.
              </motion.p>
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
                  className="bg-blue-950/20 backdrop-blur-sm p-6 rounded-xl border border-blue-800/50 hover:bg-blue-950/40 hover:shadow-xl hover:scale-105 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="mb-4 relative z-10 transition-transform duration-300 group-hover:scale-110">{item.icon}</div>
                  <h4 className="text-xl font-semibold text-white mb-2 relative z-10">{item.title}</h4>
                  <p className="text-blue-300 text-sm relative z-10">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#60a5fa_0.7px,transparent_0.7px)] bg-[length:30px_30px] opacity-[0.07] pointer-events-none" />
      </div>
    </motion.section>
  );
}
