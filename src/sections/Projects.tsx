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
    imagePath: "/projects/finova.png",
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
    imagePath: "/projects/NeuroNav.png",
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
    imagePath: "/projects/HeartMate.png",
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
    imagePath: "/projects/portfolio.png",
    tags: ["Next.js", "Framer Motion", "TailwindCSS", "TypeScript"],
    link: "#",
    github: "https://github.com/safwannuddin/portfolio",
    date: "January 2025",
    category: "Web Design",
    color: "from-teal-500 to-blue-500"
  },
  {
    title: "Zenix",
    description: "AI-powered multi-agent UI engine for generating animated components. Ranked 28th in Asian region during Lovable Startup Accelerator program with complete backend and cloud infrastructure.",
    imagePath: "/projects/Zenix.png",
    tags: ["Python", "Cloud Architecture", "Backend", "Startup MVP", "Lean Development"],
    link: "#",
    github: "https://github.com/safwannuddin/zenix",
    date: "March 2025",
    category: "Startup Accelerator",
    color: "from-yellow-500 to-orange-500"
  }
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="glass-card group"
      whileHover={{ y: -8 }}
    >
      {/* Project Image */}
      <div className="relative h-72 overflow-hidden rounded-t-2xl bg-gray-800">
        {!imageError ? (
          <Image
            src={project.imagePath}
            alt={project.title}
            fill
            className={`object-contain transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center">
                <span className="text-2xl text-black">🚀</span>
              </div>
              <span className="text-sm text-gray-400">Project Preview</span>
            </div>
          </div>
        )}
        
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold text-black bg-white">
            {project.category}
          </span>
        </div>

        {/* Links */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors duration-200"
            >
              <FaGithub className="w-4 h-4" />
            </a>
          )}
          
          {project.link && project.link !== '#' && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors duration-200"
            >
              <FaExternalLinkAlt className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-white transition-colors duration-300">
            {project.title}
          </h3>
          <span className="text-sm text-gray-400">{project.date}</span>
        </div>
        
        <p className="mb-4 leading-relaxed text-gray-300">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-sm border border-white/30 bg-white/10 text-white transition-colors duration-200 hover:border-white/50 hover:bg-white/20"
            >
              {tag}
            </span>
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
      <section id="projects" className="min-h-screen py-20 bg-black">
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
    <section id="projects" className="min-h-screen py-20 relative overflow-hidden bg-black">


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
            Featured Projects
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-300">
            End-to-end systems built with React, Next.js, Python, and Node.js. From AI-powered automation platforms 
            to decentralized applications - each project showcases scalable architecture and production-ready solutions.
          </p>
          <div className="w-24 h-1 mx-auto rounded-full mt-6 bg-white" />
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
          <p className="mb-6 text-gray-300">
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