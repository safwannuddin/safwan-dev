'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

import { FaCode, FaRocket, FaBrain, FaGraduationCap, FaAward, FaGlobe, FaLaptopCode, FaHeart } from 'react-icons/fa';
import { useClientMount } from '@/hooks/useClientMount';

const achievements = [
  {
    icon: <FaBrain className="text-3xl" />,
    title: "AI Multi-Agent Systems",
    description: "Architected Zenix - an AI-powered multi-agent UI engine for generating animated components with high emotional value",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <FaRocket className="text-3xl" />,
    title: "Startup Founder",
    description: "Selected as solo founder for Lovable Shipped SI program, focusing on rapid prototyping and lean architecture",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: <FaLaptopCode className="text-3xl" />,
    title: "Developer Tools & Automation",
    description: "Created productivity tools like Kindle to Notion sync and Obsidian automation, emphasizing user-centric design",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <FaGlobe className="text-3xl" />,
    title: "AI-Powered Applications",
    description: "Specialized in bridging complex AI capabilities with intuitive user experiences and seamless data synchronization",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: <FaAward className="text-3xl" />,
    title: "Iterative Development",
    description: "Guided by the 10% usage principle, building solutions that are functional and delightful to use",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: <FaGraduationCap className="text-3xl" />,
    title: "Multi-Hat Entrepreneur",
    description: "From conceptualizing AI architectures to designing interfaces and validating products with real users",
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
  const isMounted = useClientMount();

  if (!isMounted) {
    return (
      <section id="about" className="min-h-screen py-20 relative overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="h-16 bg-gray-700 rounded mx-auto mb-4 animate-pulse max-w-md" />
            <div className="w-24 h-1 bg-gray-700 mx-auto rounded-full animate-pulse" />
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="w-full max-w-md mx-auto aspect-square bg-gray-800 rounded-3xl animate-pulse" />
            <div className="space-y-8">
              <div className="h-12 bg-gray-700 rounded animate-pulse" />
              <div className="space-y-4">
                <div className="h-4 bg-gray-700 rounded animate-pulse" />
                <div className="h-4 bg-gray-700 rounded animate-pulse" />
                <div className="h-4 bg-gray-700 rounded animate-pulse" />
              </div>
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
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === tab.id
                  ? 'bg-white text-black shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
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
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Story Tab */}
            {activeTab === 'story' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-4xl font-bold text-white text-center mb-8">
                  AI-Focused Full-Stack Developer & Startup Founder
                </h3>

                <div className="space-y-6 text-gray-300 leading-relaxed text-left max-w-4xl">
                  <p className="text-lg text-center mb-6">
                    I'm <span className="text-white font-semibold">Mohd Safwan Uddin</span>, a passionate developer and entrepreneur with expertise in building AI-powered applications and scalable systems. My journey spans from architecting multi-agent AI platforms to developing practical productivity tools that solve real-world problems.
                  </p>

                  <p className="text-justify">
                    As a solo founder selected for the <span className="text-white font-semibold">Lovable Shipped SI program</span>, I conceptualized and launched <span className="text-white font-semibold">Zenix</span> - an AI-powered multi-agent UI engine for generating animated components. This experience honed my skills in rapid prototyping, lean architecture, and creating products with high emotional value.
                  </p>

                  <p className="text-justify">
                    I'm deeply passionate about <span className="text-white font-semibold">AI-powered automation</span> and <span className="text-white font-semibold">developer tools</span> that enhance productivity. My work focuses on bridging the gap between complex AI capabilities and intuitive user experiences, whether through multi-agent systems, intelligent automation, or seamless data synchronization.
                  </p>

                  <p className="text-justify">
                    My technical approach emphasizes <span className="text-white font-semibold">iterative development</span> and <span className="text-white font-semibold">user-centric design</span>, guided by principles like the "10% usage principle" from product development philosophy. I believe in building solutions that are not just functional but delightful to use.
                  </p>
                </div>

                {/* Quote */}
                <motion.div
                  className="relative p-8 glass-card rounded-2xl border-l-4 border-white mt-8"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xl italic text-gray-300 leading-relaxed text-center">
                    "Being selected as a solo founder for competitive programs has taught me to wear multiple hats - from conceptualizing AI architectures to designing intuitive interfaces and validating products with real users."
                  </p>
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-black font-bold">&quot;</span>
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
                <h3 className="text-4xl font-bold text-white text-center mb-8">
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
                        <span className="text-white font-bold">{skill.level}%</span>
                      </div>
                      <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-white rounded-full"
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
                        className="px-4 py-2 bg-white/10 border border-white/30 rounded-full text-sm font-medium text-white"
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
                <h3 className="text-4xl font-bold text-white text-center mb-8">
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