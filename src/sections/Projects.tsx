'use client';

import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import AnimatedText from '@/components/AnimatedText';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

type ProjectCategory = 'web' | 'ai' | 'blockchain' | 'mobile';

interface Project {
  title: string;
  description: string;
  imagePath: string;
  tags: string[];
  link: string;
  github?: string;
  date: string;
  category: ProjectCategory;
}

const projects: Project[] = [
  {
    title: "AuthNexus",
    description: "A decentralized AI-powered document verification system that uses blockchain for tamper-proof validation.",
    imagePath: "/projects/4.png",
    tags: ["Next.js", "Blockchain", "AI", "Zustand"],
    link: "https://authnexus-v.vercel.app/",
    github: "https://github.com/safwannuddin/authnexus",
    date: "May 2025",
    category: "blockchain"
  },
  {
    title: "Finova",
    description: "A modern and interactive financial portfolio dashboard UI with real-time data visualization.",
    imagePath: "/projects/finova.png",
    tags: ["Next.js", "Tailwind", "Framer Motion", "Finance"],
    link: "https://capital-flow.vercel.app/",
    github: "https://github.com/safwannuddin/finova",
    date: "March 2025",
    category: "web"
  },
  {
    title: "NeuroNav",
    description: "AI-powered neurohealth platform for brain MRI analysis with 3D visualization.",
    imagePath: "/projects/NeuroNav.png",
    tags: ["Next.js", "TypeScript", "AI/ML", "3D"],
    link: "#",
    github: "https://github.com/safwannuddin/neuronav",
    date: "April 2025",
    category: "ai"
  },
  {
    title: "HeartMate",
    description: "Health monitoring app with real-time heart rate tracking and analysis.",
    imagePath: "/projects/HeartMate.png",
    tags: ["React Native", "HealthKit", "Firebase"],
    link: "#",
    github: "https://github.com/safwannuddin/heartmate",
    date: "February 2025",
    category: "mobile"
  },
  {
    title: "Portfolio Website",
    description: "Modern, responsive portfolio website with smooth animations and professional design.",
    imagePath: "/projects/1.jpeg",
    tags: ["Next.js", "Framer Motion", "TailwindCSS", "TypeScript"],
    link: "#",
    github: "https://github.com/safwannuddin/portfolio",
    date: "January 2025",
    category: "web"
  },
  {
    title: "AI Chat Assistant",
    description: "Intelligent chat assistant powered by modern AI models with real-time responses.",
    imagePath: "/projects/2.png",
    tags: ["Python", "FastAPI", "AI/ML", "WebSocket"],
    link: "#",
    github: "https://github.com/safwannuddin/ai-chat",
    date: "March 2025",
    category: "ai"
  }
];

interface Category {
  id: ProjectCategory | 'all';
  label: string;
}

const categories: Category[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Apps' },
  { id: 'ai', label: 'AI/ML' },
  { id: 'blockchain', label: 'Blockchain' },
  { id: 'mobile', label: 'Mobile' },
];

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const controls = useAnimation();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMounted) return;
    
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    controls.start({
      rotateX: -rotateX,
      rotateY: rotateY,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    });
  };

  const handleMouseLeave = () => {
    if (!isMounted) return;
    
    controls.start({ 
      rotateX: 0, 
      rotateY: 0, 
      transition: { duration: 0.5 } 
    });
  };

  if (!isMounted) {
    return (
      <div className="h-full glass-card-hover overflow-hidden">
        <div className="relative h-48 bg-gray-800 animate-pulse" />
        <div className="p-6">
          <div className="h-6 bg-gray-700 rounded mb-3 animate-pulse" />
          <div className="h-4 bg-gray-700 rounded mb-4 animate-pulse" />
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-gray-700 rounded-full animate-pulse" />
            <div className="h-6 w-20 bg-gray-700 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        className="glass-card-hover h-full overflow-hidden group"
        animate={controls}
        style={{ transformStyle: 'preserve-3d' }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative h-48 overflow-hidden">
          {isLoading && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 rounded-full border-2 border-[#00ff9d] border-t-transparent"
              />
            </div>
          )}
          
          {hasError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-gray-700 rounded-lg flex items-center justify-center">
                  📁
                </div>
                <span className="text-gray-400 text-sm">Image not available</span>
              </div>
            </div>
          ) : (
            <Image
              src={project.imagePath}
              alt={project.title}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-110 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setHasError(true);
                setIsLoading(false);
              }}
            />
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
            <div className="flex gap-3">
              {project.github && project.github !== '#' && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors duration-300"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaGithub className="w-5 h-5 text-white" />
                </motion.a>
              )}
              {project.link && project.link !== '#' && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors duration-300"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaExternalLinkAlt className="w-5 h-5 text-white" />
                </motion.a>
              )}
            </div>
          </div>

          {/* Shine Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#00ff9d] to-[#0066ff] bg-clip-text text-transparent">
              {project.title}
            </h3>
            <span className="text-sm text-gray-400 font-medium">{project.date}</span>
          </div>
          
          <p className="text-gray-400 mb-4 leading-relaxed line-clamp-2">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                className="px-3 py-1 text-sm bg-gradient-to-r from-[#00ff9d]/20 to-[#0066ff]/20 text-[#00ff9d] rounded-full border border-[#00ff9d]/30 font-medium"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  if (!isMounted) {
    return (
      <section id="projects" className="section-padding relative">
        <div className="container-custom">
          <div className="h-16 bg-gray-700 rounded mx-auto mb-16 animate-pulse max-w-md" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card-hover h-96 animate-pulse">
                <div className="h-48 bg-gray-800" />
                <div className="p-6">
                  <div className="h-6 bg-gray-700 rounded mb-3" />
                  <div className="h-4 bg-gray-700 rounded mb-4" />
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-gray-700 rounded-full" />
                    <div className="h-6 w-20 bg-gray-700 rounded-full" />
                  </div>
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
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${['#00ff9d', '#0066ff', '#9333ea'][i]}15 0%, transparent 70%)`,
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: `${10 + i * 30}%`,
              top: `${20 + i * 30}%`,
            }}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -50, 30, 0],
              scale: [1, 1.2, 0.8, 1],
              opacity: [0.3, 0.5, 0.2, 0.3],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}
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
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A showcase of my latest work in web development, AI, and innovative digital solutions
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00ff9d] to-[#0066ff] mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] text-black shadow-lg shadow-[#00ff9d]/20'
                  : 'glass-card text-gray-400 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={`${project.title}-${activeCategory}`} 
              project={project} 
              index={index}
            />
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            Interested in working together or want to see more projects?
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,255,157,0.5)] transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Let's Connect</span>
            <FaExternalLinkAlt className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;