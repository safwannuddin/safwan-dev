'use client';

import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import AnimatedText from '@/components/AnimatedText';
// Using dynamic import to handle potential missing lucide-react
const Code2 = dynamic(() => import('lucide-react').then(mod => mod.Code2), { ssr: false });
const ExternalLink = dynamic(() => import('lucide-react').then(mod => mod.ExternalLink), { ssr: false });
const Github = dynamic(() => import('lucide-react').then(mod => mod.Github), { ssr: false });
import dynamic from 'next/dynamic';

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
    github: "https://github.com/yourusername/authnexus",
    date: "May 2025",
    category: "blockchain"
  },
  {
    title: "Finova",
    description: "A modern and interactive financial portfolio dashboard UI with real-time data visualization.",
    imagePath: "/projects/finova.png",
    tags: ["Next.js", "Tailwind", "Framer Motion", "Finance"],
    link: "https://capital-flow.vercel.app/",
    github: "https://github.com/yourusername/finova",
    date: "March 2025",
    category: "web"
  },
  {
    title: "NeuroNav",
    description: "AI-powered neurohealth platform for brain MRI analysis with 3D visualization.",
    imagePath: "/projects/NeuroNav.png",
    tags: ["Next.js", "TypeScript", "AI/ML", "3D"],
    link: "#",
    github: "#",
    date: "April 2025",
    category: "ai"
  },
  {
    title: "HeartMate",
    description: "Health monitoring app with real-time heart rate tracking and analysis.",
    imagePath: "/projects/HeartMate.png",
    tags: ["React Native", "HealthKit", "Firebase"],
    link: "#",
    github: "#",
    date: "February 2025",
    category: "mobile"
  },
  {
    title: "CodeCollab",
    description: "Real-time collaborative code editor with video calling and chat functionality.",
    imagePath: "/projects/codecollab.png",
    tags: ["React", "Node.js", "WebRTC", "Socket.IO"],
    link: "#",
    github: "#",
    date: "January 2025",
    category: "web"
  },
  {
    title: "EcoTrack",
    description: "Blockchain-based carbon footprint tracker with sustainability insights.",
    imagePath: "/projects/ecotrack.png",
    tags: ["Ethereum", "Solidity", "IPFS", "Next.js"],
    link: "#",
    github: "#",
    date: "March 2025",
    category: "blockchain"
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
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const controls = useAnimation();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
    controls.start({
      rotateX: 0,
      rotateY: 0,
      transition: { duration: 0.5 }
    });
  };

  const handleImageError = () => {
    setHasError(true);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <motion.div
      className="h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="h-full bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-[#00ff9d]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,157,0.1)]"
        animate={controls}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="relative h-48 overflow-hidden">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-8 h-8 rounded-full border-2 border-[#00ff9d] border-t-transparent"
              />
            </div>
          ) : hasError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
              <div className="text-gray-400">Image not available</div>
            </div>
          ) : (
            <Image
              src={project.imagePath}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <div className="flex gap-2">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-black/50 rounded-full hover:bg-[#00ff9d]/20 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github className="w-4 h-4 text-white" />
                </motion.a>
              )}
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-black/50 rounded-full hover:bg-[#00ff9d]/20 transition-colors"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink className="w-4 h-4 text-white" />
              </motion.a>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <motion.h3
              className="text-xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.title}
            </motion.h3>
            <span className="text-sm text-gray-400">{project.date}</span>
          </div>
          <motion.p
            className="text-gray-400 text-sm mb-4 line-clamp-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {project.description}
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-2 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs bg-gray-700/50 text-[#00ff9d] rounded-full"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2.5 py-1 text-xs bg-gray-800/70 text-gray-400 rounded-full">
                +{project.tags.length - 3}
              </span>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all');
  
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <motion.section
      id="projects"
      className="py-20 bg-[#050816] relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden opacity-20"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(0,255,157,0.1)_0%,transparent_50%)]"></div>
      </motion.div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <AnimatedText 
            text="Featured Projects" 
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#00ff9d]"
          />
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of my recent work and projects. Click on any project to learn more.
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-[#00ff9d] text-gray-900'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div key={`${project.title}-${index}`} className="h-full">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Code2 className="w-12 h-12 mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-medium text-gray-300">No projects found in this category</h3>
            <p className="text-gray-500 mt-2">Check back later for new projects!</p>
          </div>
        )}
        
        <div className="mt-12 text-center">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border-2 border-[#00ff9d] text-[#00ff9d] rounded-full font-medium hover:bg-[#00ff9d]/10 transition-colors"
          >
            <Github className="w-5 h-5 mr-2" />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
