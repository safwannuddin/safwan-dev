'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useClientMount } from '@/hooks/useClientMount';
import { 
  SiJavascript, SiTypescript, SiPython, SiOpenjdk, SiC,
  SiHtml5, SiCss3, SiReact, SiNextdotjs, SiTailwindcss,
  SiNodedotjs, SiExpress, SiFastapi, SiMongodb, SiPostgresql, SiSupabase,
  SiTensorflow, SiPytorch, SiJupyter, SiDocker, SiGit
} from 'react-icons/si';
import { FaCode, FaPalette, FaDatabase, FaBrain } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';

const techStacks = [
  {
    category: "Programming Languages",
    color: "#ffffff",
    icon: FaCode,
    skills: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Java", icon: SiOpenjdk, color: "#ED8B00" },
      { name: "C", icon: SiC, color: "#00599C" }
    ]
  },
  {
    category: "Frontend Development",
    color: "#ffffff",
    icon: FaPalette,
    skills: [
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss3, color: "#1572B6" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38B2AC" }
    ]
  },
  {
    category: "Backend & Databases",
    color: "#ffffff",
    icon: FaDatabase,
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#000000" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" }
    ]
  },
  {
    category: "AI/ML & Development Tools",
    color: "#ffffff",
    icon: FaBrain,
    skills: [
      { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
      { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
      { name: "Jupyter", icon: SiJupyter, color: "#F37626" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "VS Code", icon: VscCode, color: "#007ACC" }
    ]
  }
];

const TypingAnimation = ({ text, color, className }: { text: string; color: string; className?: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting && currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else if (isDeleting && currentIndex > 0) {
        setDisplayText(text.slice(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      } else if (!isDeleting && currentIndex === text.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentIndex === 0) {
        setIsDeleting(false);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, text]);

  return (
    <span className={className} style={{ color }}>
      {displayText}
      <span className="animate-pulse text-white">|</span>
    </span>
  );
};

export default function Skills() {
  const isMounted = useClientMount();

  if (!isMounted) {
    return (
      <section id="skills" className="min-h-screen py-20 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="h-16 bg-gray-700 rounded mx-auto mb-16 animate-pulse max-w-md" />
          </div>
          <div className="space-y-16">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="relative">
                <div className="h-8 bg-gray-700 rounded mb-8 max-w-sm mx-auto animate-pulse" />
                <div className="h-32 bg-gray-800 rounded-2xl animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="min-h-screen py-20 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-bold text-white mb-4">
            Tech Stack & Skills
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-300">
            Building end-to-end systems with modern tech stack - from scalable backends to production-grade frontends, specializing in AI integration and decentralized applications
          </p>
        </motion.div>



        {/* Tech Stack Categories */}
        <div className="space-y-16">
          {techStacks.map((stack, index) => (
            <motion.div
              key={stack.category}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              {/* Category Header */}
              <div className="flex items-center justify-center mb-8">
                <stack.icon className="w-8 h-8 mr-4 text-white" />
                <TypingAnimation
                  text={stack.category}
                  color={stack.color}
                  className="text-2xl font-bold"
                />
                <stack.icon className="w-8 h-8 ml-4 text-white" />
              </div>

              {/* Skills Container */}
              <motion.div
                className="relative p-8 rounded-xl overflow-hidden bg-white/5 border border-white/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Skills Grid */}
                <div className="relative z-10 flex flex-wrap justify-center gap-6">
                  {stack.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.2 + skillIndex * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.3 }
                      }}
                      className="transform-gpu flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/20 hover:bg-white/10 transition-all duration-300"
                    >
                      <skill.icon 
                        className="w-12 h-12 mb-2" 
                        style={{ color: skill.color }}
                      />
                      <span className="text-sm font-medium text-white">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}