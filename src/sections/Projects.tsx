'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useClientMount } from '@/hooks/useClientMount';

interface Project {
  title: string;
  description: string;
  imagePath: string;
  tags: string[];
  link: string;
  github?: string;
  date: string;
  category: string;
  color: string;
}

const projects: Project[] = [
  {
    title: "AuthNexus",
    description: "Next-generation blockchain authentication platform with AI-powered security features and seamless Web3 integration.",
    imagePath: "/projects/4.png",
    tags: ["Next.js", "Blockchain", "AI", "Zustand", "Web3"],
    link: "https://authnexus-v.vercel.app",
    github: "https://github.com/safwannuddin/authnexus",
    date: "May 2025",
    category: "Blockchain Innovation",
    color: "from-orange-500 to-red-500"
  },
  {
    title: "FinOva Capital Flow",
    description: "Comprehensive financial management platform with real-time analytics, portfolio tracking, and investment insights.",
    imagePath: "/projects/5.png",
    tags: ["Next.js", "Tailwind", "Framer Motion", "Finance", "Charts"],
    link: "https://capital-flow.vercel.app",
    github: "https://github.com/safwannuddin/finova",
    date: "March 2025",
    category: "FinTech Solution",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "NeuroNav",
    description: "AI-powered 3D brain health visualizer using advanced CNNs for medical diagnostics and neurological insights.",
    imagePath: "/projects/6.png",
    tags: ["Next.js", "TypeScript", "AI/ML", "3D", "TensorFlow"],
    link: "#",
    github: "https://github.com/safwannuddin/neuronav",
    date: "April 2025",
    category: "AI Healthcare",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "HeartMate",
    description: "Comprehensive health monitoring mobile app with real-time vitals tracking and personalized wellness recommendations.",
    imagePath: "/projects/7.png",
    tags: ["React Native", "HealthKit", "Firebase", "ML"],
    link: "#",
    github: "https://github.com/safwannuddin/heartmate",
    date: "February 2025",
    category: "Mobile Health",
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Portfolio Website",
    description: "Modern, responsive portfolio website showcasing projects and skills with smooth animations and interactive elements.",
    imagePath: "/projects/1.jpeg",
    tags: ["Next.js", "Framer Motion", "TailwindCSS", "TypeScript"],
    link: "#",
    github: "https://github.com/safwannuddin/portfolio",
    date: "January 2025",
    category: "Web Design",
    color: "from-teal-500 to-blue-500"
  },
  {
    title: "AI Chat Assistant",
    description: "Intelligent conversational AI with natural language processing, context awareness, and multi-modal capabilities.",
    imagePath: "/projects/2.png",
    tags: ["Python", "FastAPI", "AI/ML", "WebSocket", "OpenAI"],
    link: "#",
    github: "https://github.com/safwannuddin/ai-chat",
    date: "March 2025",
    category: "AI Application",
    color: "from-yellow-500 to-orange-500"
  }
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="glass-card group hover:scale-105 transition-all duration-500"
    >
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden rounded-t-2xl">
        <Image
          src={project.imagePath}
          alt={project.title}
          fill
          className={`object-cover transition-all duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${project.color} text-white`}>
            {project.category}
          </span>
        </div>

        {/* Links */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub className="w-4 h-4" />
            </motion.a>
          )}
          
          {project.link && project.link !== '#' && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaExternalLinkAlt className="w-4 h-4" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold transition-colors duration-300 group-hover:gradient-text-primary" style={{ color: 'var(--text-primary)' }}>
            {project.title}
          </h3>
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{project.date}</span>
        </div>
        
        <p className="mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, tagIndex) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + tagIndex * 0.05, duration: 0.3 }}
              className="px-3 py-1 rounded-full text-sm border"
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                borderColor: 'rgba(59, 130, 246, 0.3)',
                color: 'var(--text-primary)'
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const isMounted = useClientMount();

  if (!isMounted) {
    return (
      <section id="projects" className="min-h-screen py-20 bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-16 bg-gray-700 rounded mx-auto mb-16 animate-pulse max-w-md" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card h-96 animate-pulse">
                <div className="h-64 bg-gray-800" />
                <div className="p-6">
                  <div className="h-6 bg-gray-700 rounded mb-3" />
                  <div className="h-4 bg-gray-700 rounded mb-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="min-h-screen py-20 relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a]">
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
          const leftPos = (i * 25) % 100;
          const topPos = (i * 30 + 10) % 100;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl"
              style={{
                background: `radial-gradient(circle, ${colors[i]}15 0%, transparent 70%)`,
                width: `${150 + i * 30}px`,
                height: `${150 + i * 30}px`,
                left: `${leftPos}%`,
                top: `${topPos}%`,
              }}
              animate={{
                x: [0, 100, -50, 0],
                y: [0, -50, 30, 0],
                scale: [1, 1.2, 0.8, 1],
                opacity: [0.3, 0.5, 0.2, 0.3],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2,
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
          <h2 className="text-6xl font-bold gradient-text mb-4">
            Featured Projects
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            A showcase of my latest work in web development, AI/ML, blockchain, and mobile applications. 
            Each project represents a unique challenge solved with modern technologies and innovative approaches.
          </p>
          <div 
            className="w-24 h-1 mx-auto rounded-full mt-6"
            style={{
              background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)'
            }}
          />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
            Interested in seeing more of my work or collaborating on a project?
          </p>
          <motion.a
            href="https://github.com/safwannuddin"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary inline-flex items-center gap-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub className="w-5 h-5" />
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}