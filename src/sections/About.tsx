'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { FaCode, FaRocket, FaBrain, FaGraduationCap, FaAward, FaGlobe, FaLaptopCode, FaHeart } from 'react-icons/fa';

const achievements = [
  {
    icon: <FaGraduationCap className="text-3xl" />,
    title: "Computer Science Student",
    description: "3rd-year CS student with strong foundation in algorithms, data structures, and AI",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <FaLaptopCode className="text-3xl" />,
    title: "Full-Stack Developer",
    description: "Expert in React, Next.js, Node.js, Python, and modern web technologies",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: <FaRocket className="text-3xl" />,
    title: "Hackathon Finalist",
    description: "TechHack 3 & UI Hackathon finalist, currently building NeuroNav for Bolt 2025",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <FaBrain className="text-3xl" />,
    title: "AI Enthusiast",
    description: "Building AI-driven solutions like NeuroNav - 3D brain health visualizer",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: <FaAward className="text-3xl" />,
    title: "Certified Professional",
    description: "Multiple certifications in ML, Data Science, Cybersecurity & Development",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: <FaGlobe className="text-3xl" />,
    title: "Open Source Contributor",
    description: "Active GitHub contributor focused on public tech solutions",
    color: "from-teal-500 to-blue-500"
  }
];

const skills = [
  { name: "React/Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Python/AI", level: 85 },
  { name: "Node.js", level: 88 },
  { name: "UI/UX Design", level: 82 },
  { name: "Cloud/DevOps", level: 78 }
];

export default function About() {
  const [activeTab, setActiveTab] = useState<'story' | 'skills' | 'achievements'>('story');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="min-h-screen py-20 relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a]"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-[#00ff9d]/5 via-transparent to-[#0066ff]/5"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating Orbs */}
        {[...Array(4)].map((_, i) => {
          const colors = ['#00ff9d', '#0066ff', '#ff6b35', '#9333ea'];
          const leftPos = 20 + i * 20;
          const topPos = 10 + i * 25;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl"
              style={{
                background: `radial-gradient(circle, ${colors[i]}15 0%, transparent 70%)`,
                width: `${150 + i * 50}px`,
                height: `${150 + i * 50}px`,
                left: `${leftPos}%`,
                top: `${topPos}%`,
              }}
              animate={{
                x: [0, 50, -30, 0],
                y: [0, -30, 20, 0],
                scale: [1, 1.1, 0.9, 1],
                opacity: [0.3, 0.5, 0.2, 0.3],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.5,
              }}
            />
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00ff9d] to-[#0066ff] mx-auto rounded-full" />
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="glass-card p-2 rounded-2xl">
            {[
              { id: 'story', label: 'My Story', icon: <FaHeart /> },
              { id: 'skills', label: 'Skills', icon: <FaCode /> },
              { id: 'achievements', label: 'Achievements', icon: <FaRocket /> }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'story' | 'skills' | 'achievements')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] text-black shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.icon}
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative"
            style={{ y }}
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Rotating Border */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00ff9d] via-[#0066ff] to-[#00ff9d] p-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full rounded-3xl bg-black" />
              </motion.div>

              {/* Profile Image Container */}
              <motion.div
                className="relative aspect-square rounded-3xl overflow-hidden glass-card m-1"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/projects/3.png"
                  alt="Mohd Safwan Uddin"
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Overlay Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                />

                {/* Floating Elements */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-[#00ff9d] rounded-full"
                    animate={{
                      y: [0, -30, 0],
                      x: [0, (i % 2 === 0 ? 1 : -1) * 20, 0], // Deterministic x movement
                      opacity: [0.3, 0.8, 0.3],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut"
                    }}
                    style={{
                      left: `${15 + i * 12}%`,
                      top: `${20 + (i % 2) * 60}%`,
                    }}
                  />
                ))}
              </motion.div>

              {/* Status Indicator */}
              <motion.div
                className="absolute -bottom-2 -right-2 glass-card px-4 py-2 rounded-full"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#00ff9d] rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-white">Available for work</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
            style={{ opacity }}
          >
            {/* Story Tab */}
            {activeTab === 'story' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-4xl font-bold bg-gradient-to-r from-[#00ff9d] to-[#0066ff] bg-clip-text text-transparent">
                  Passionate Developer & AI Enthusiast
                </h3>
                
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p className="text-lg">
                    Hey there! I'm <span className="text-[#00ff9d] font-semibold">Mohd Safwan Uddin</span>, 
                    a Computer Science student and full-stack developer who's passionate about creating 
                    innovative digital solutions that make a real impact.
                  </p>
                  
                  <p>
                    My journey in tech started with curiosity and has evolved into a deep love for 
                    <span className="text-[#00ff9d] font-semibold"> modern web development</span> and 
                    <span className="text-[#0066ff] font-semibold"> artificial intelligence</span>. 
                    I specialize in React, Next.js, and Python, with a focus on building scalable, 
                    user-centric applications.
                  </p>
                  
                  <p>
                    Currently, I'm working on exciting projects like <span className="text-[#00ff9d] font-semibold">NeuroNav</span> - 
                    a 3D brain health visualizer using CNNs, and <span className="text-[#0066ff] font-semibold">HeartMate</span> - 
                    a health monitoring platform. I believe in using technology to solve real-world problems 
                    and improve people's lives.
                  </p>
                </div>

                {/* Quote */}
                <motion.div
                  className="relative p-6 glass-card rounded-2xl border-l-4 border-[#00ff9d]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xl italic text-gray-300 leading-relaxed">
                    "The only limits in life are the ones you make. Dream bigger, push harder, 
                    and transform your vision into reality."
                  </p>
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-[#00ff9d] rounded-full flex items-center justify-center">
                    <span className="text-black font-bold">"</span>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-4xl font-bold bg-gradient-to-r from-[#00ff9d] to-[#0066ff] bg-clip-text text-transparent">
                  Technical Expertise
                </h3>
                
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-white font-semibold">{skill.name}</span>
                        <span className="text-[#00ff9d] font-bold">{skill.level}%</span>
                      </div>
                      <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#00ff9d] to-[#0066ff] rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="mt-8 p-6 glass-card rounded-2xl">
                  <h4 className="text-xl font-bold text-white mb-4">Current Tech Stack</h4>
                  <div className="flex flex-wrap gap-3">
                    {['React', 'Next.js', 'TypeScript', 'Python', 'Node.js', 'TailwindCSS', 'Supabase', 'FastAPI'].map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="px-4 py-2 bg-gradient-to-r from-[#00ff9d]/20 to-[#0066ff]/20 border border-[#00ff9d]/30 rounded-full text-sm font-medium text-white"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-4xl font-bold bg-gradient-to-r from-[#00ff9d] to-[#0066ff] bg-clip-text text-transparent">
                  Key Achievements
                </h3>
                
                <div className="grid gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="glass-card p-6 rounded-2xl hover:scale-105 transition-all duration-300 group"
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${achievement.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-2">{achievement.title}</h4>
                          <p className="text-gray-400 leading-relaxed">{achievement.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}