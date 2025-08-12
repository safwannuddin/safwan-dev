'use client';

import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import AnimatedText from '@/components/AnimatedText';
// Using dynamic import to handle potential missing lucide-react
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

  return (
    <motion.div
      className="h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => controls.start({ rotateX: 0, rotateY: 0, transition: { duration: 0.5 } })}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="glass-card-hover h-full overflow-hidden"
        animate={controls}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="relative h-48 overflow-hidden group">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-8 h-8 rounded-full border-2 border-primary-500 border-t-transparent"
              />
            </div>
          ) : hasError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-gray-400">Image not available</div>
            </div>
          ) : (
            <Image
              src={project.imagePath}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              onLoad={() => setIsLoading(false)}
              onError={() => setHasError(true)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
            <div className="flex gap-3">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost p-2 rounded-full"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github className="w-5 h-5" />
                </motion.a>
              )}
              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost p-2 rounded-full"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ExternalLink className="w-5 h-5" />
                </motion.a>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-2xl font-bold gradient-text">{project.title}</h3>
            <span className="text-sm text-gray-400">{project.date}</span>
          </div>
          <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-black/50 text-primary-400 rounded-full border border-primary-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-custom">
        <AnimatedText 
          text="Featured Projects" 
          className="text-5xl font-bold text-center mb-16 gradient-text"
        />

        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                  : 'bg-black/50 text-gray-400 hover:bg-black/70 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              custom={index}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-dots opacity-[0.05] pointer-events-none" />
    </section>
  );
};

export default Projects;
