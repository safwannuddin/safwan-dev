'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useClientMount } from '@/hooks/useClientMount';

const techStacks = [
  {
    category: "Programming Languages",
    color: "#ffffff",
    icon: "https://user-images.githubusercontent.com/74038190/212257454-16e3712e-945a-4ca2-b238-408ad0bf87e6.gif",
    skills: [
      { name: "JavaScript", badge: "https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black&labelColor=F7DF1E" },
      { name: "TypeScript", badge: "https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=3178C6" },
      { name: "Python", badge: "https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white&labelColor=3776AB" },
      { name: "Java", badge: "https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white&labelColor=ED8B00" },
      { name: "C", badge: "https://img.shields.io/badge/C-00599C?style=for-the-badge&logo=c&logoColor=white&labelColor=00599C" }
    ]
  },
  {
    category: "Frontend Development",
    color: "#ffffff",
    icon: "https://user-images.githubusercontent.com/74038190/212257467-871d32b7-e401-42e8-a166-fcfd7baa4c6b.gif",
    skills: [
      { name: "HTML5", badge: "https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white&labelColor=E34F26" },
      { name: "CSS3", badge: "https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white&labelColor=1572B6" },
      { name: "React", badge: "https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black&labelColor=61DAFB" },
      { name: "Next.js", badge: "https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white&labelColor=000000" },
      { name: "Tailwind CSS", badge: "https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white&labelColor=38B2AC" }
    ]
  },
  {
    category: "Backend & Databases",
    color: "#ffffff",
    icon: "https://user-images.githubusercontent.com/74038190/212257460-738ff738-247f-4445-a718-cdd0ca76e2db.gif",
    skills: [
      { name: "Node.js", badge: "https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white&labelColor=339933" },
      { name: "Express.js", badge: "https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white&labelColor=000000" },
      { name: "FastAPI", badge: "https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white&labelColor=009688" },
      { name: "MongoDB", badge: "https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white&labelColor=47A248" },
      { name: "PostgreSQL", badge: "https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white&labelColor=4169E1" },
      { name: "Supabase", badge: "https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white&labelColor=3ECF8E" },
      { name: "Neon", badge: "https://img.shields.io/badge/Neon-00E599?style=for-the-badge&logo=neon&logoColor=white&labelColor=00E599" }
    ]
  },
  {
    category: "AI/ML & Development Tools",
    color: "#ffffff",
    icon: "https://user-images.githubusercontent.com/74038190/212257465-7ce8d493-cac5-494e-982a-5a9deb852c4b.gif",
    skills: [
      { name: "TensorFlow", badge: "https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white&labelColor=FF6F00" },
      { name: "PyTorch", badge: "https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white&labelColor=EE4C2C" },
      { name: "Jupyter", badge: "https://img.shields.io/badge/Jupyter-F37626?style=for-the-badge&logo=jupyter&logoColor=white&labelColor=F37626" },
      { name: "Docker", badge: "https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white&labelColor=2496ED" },
      { name: "Git", badge: "https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white&labelColor=F05032" },
      { name: "VS Code", badge: "https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white&labelColor=007ACC" }
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

        {/* GitHub Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <div className="glass-card p-6 rounded-xl border border-white/20">
            <img
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=safwannuddin&layout=donut&theme=dark&hide_border=true&bg_color=000000&title_color=FFFFFF&text_color=FFFFFF&icon_color=FFFFFF"
              alt="Most Used Languages"
              width={400}
              height={200}
              className="rounded-lg"
            />
          </div>
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
                <img
                  src={stack.icon}
                  alt="Icon"
                  width={35}
                  height={35}
                  className="mr-4"
                />
                <TypingAnimation
                  text={stack.category}
                  color={stack.color}
                  className="text-2xl font-bold"
                />
                <img
                  src={stack.icon}
                  alt="Icon"
                  width={35}
                  height={35}
                  className="ml-4"
                />
              </div>

              {/* Skills Container */}
              <motion.div
                className="relative p-8 rounded-xl overflow-hidden bg-white/5 border border-white/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Skills Grid */}
                <div className="relative z-10 flex flex-wrap justify-center gap-4">
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
                      className="transform-gpu"
                    >
                      <img
                        src={skill.badge}
                        alt={skill.name}
                        width={120}
                        height={28}
                        className="rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300"
                      />
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