'use client';

import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaCode, FaRocket, FaBrain, FaMobile } from 'react-icons/fa';

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
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "AuthNexus",
    description: "A decentralized AI-powered document verification system that uses blockchain for tamper-proof validation and smart contract integration.",
    imagePath: "/projects/4.png",
    tags: ["Next.js", "Blockchain", "AI", "Zustand", "Web3"],
    link: "https://authnexus-v.vercel.app/",
    github: "https://github.com/safwannuddin/authnexus",
    date: "May 2025",
    category: "blockchain",
    featured: true
  },
  {
    title: "Finova",
    description: "A modern and interactive financial portfolio dashboard UI with real-time data visualization and advanced analytics.",
    imagePath: "/projects/finova.png",
    tags: ["Next.js", "Tailwind", "Framer Motion", "Finance", "Charts"],
    link: "https://capital-flow.vercel.app/",
    github: "https://github.com/safwannuddin/finova",
    date: "March 2025",
    category: "web",
    featured: true
  },
  {
    title: "NeuroNav",
    description: "AI-powered neurohealth platform for brain MRI analysis with 3D visualization and machine learning diagnostics.",
    imagePath: "/projects/NeuroNav.png",
    tags: ["Next.js", "TypeScript", "AI/ML", "3D", "TensorFlow"],
    link: "#",
    github: "https://github.com/safwannuddin/neuronav",
    date: "April 2025",
    category: "ai",
    featured: true
  },
  {
    title: "HeartMate",
    description: "Health monitoring app with real-time heart rate tracking, analysis, and personalized health insights.",
    imagePath: "/projects/HeartMate.png",
    tags: ["React Native", "HealthKit", "Firebase", "ML"],
    link: "#",
    github: "https://github.com/safwannuddin/heartmate",
    date: "February 2025",
    category: "mobile"
  },
  {
    title: "Portfolio Website",
    description: "Modern, responsive portfolio website with smooth animations, professional design, and optimized performance.",
    imagePath: "/projects/1.jpeg",
    tags: ["Next.js", "Framer Motion", "TailwindCSS", "TypeScript"],
    link: "#",
    github: "https://github.com/safwannuddin/portfolio",
    date: "January 2025",
    category: "web"
  },
  {
    title: "AI Chat Assistant",
    description: "Intelligent chat assistant powered by modern AI models with real-time responses and context awareness.",
    imagePath: "/projects/2.png",
    tags: ["Python", "FastAPI", "AI/ML", "WebSocket", "OpenAI"],
    link: "#",
    github: "https://github.com/safwannuddin/ai-chat",
    date: "March 2025",
    category: "ai"
  }
];

interface Category {
  id: ProjectCategory | 'all';
  label: string;
  icon: React.ReactNode;
  color: string;
}

const categories: Category[] = [
  { id: 'all', label: 'All Projects', icon: <FaCode />, color: 'from-[#00ff9d] to-[#00cc7a]' },
  { id: 'web', label: 'Web Apps', icon: <FaCode />, color: 'from-blue-500 to-cyan-500' },
  { id: 'ai', label: 'AI/ML', icon: <FaBrain />, color: 'from-purple-500 to-pink-500' },
  { id: 'blockchain', label: 'Blockchain', icon: <FaRocket />, color: 'from-orange-500 to-red-500' },
  { id: 'mobile', label: 'Mobile', icon: <FaMobile />, color: 'from-green-500 to-emerald-500' },
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
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    controls.start({
      rotateX: -rotateX,
      rotateY: rotateY,
      scale: 1.02,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    });
  };

  const handleMouseLeave = () => {
    if (!isMounted) return;
    
    controls.start({ 
      rotateX: 0, 
      rotateY: 0, 
      scale: 1,
      transition: { duration: 0.5 } 
    });
  };

  if (!isMounted) {
    return (
      <div className="glass-card overflow-hidden">
        <div className="relative h-64 bg-gray-800 animate-pulse" />
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
      className={`relative ${project.featured ? 'md:col-span-2' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <motion.div
        className="glass-card overflow-hidden group h-full"
        animate={controls}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 z-20">
            <div className="px-3 py-1 bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] text-black text-xs font-bold rounded-full">
              FEATURED
            </div>
          </div>
        )}

        <div className={`relative ${project.featured ? 'h-80' : 'h-64'} overflow-hidden`}>
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
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#00ff9d] to-[#0066ff] rounded-2xl flex items-center justify-center">
                  <FaCode className="w-8 h-8 text-white" />
                </div>
                <span className="text-gray-400 text-sm">Project Preview</span>
              </div>
            </div>
          ) : (
            <Image
              src={project.imagePath}
              alt={project.title}
              fill
              className={`object-cover transition-all duration-700 group-hover:scale-110 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setHasError(true);
                setIsLoading(false);
              }}
            />
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          {/* Action Buttons */}
          <div className="absolute bottom-6 left-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            {project.github && project.github !== '#' && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-card rounded-full hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
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
                className="p-3 glass-card rounded-full hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaExternalLinkAlt className="w-5 h-5 text-white" />
              </motion.a>
            )}
          </div>

          {/* Shine Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#00ff9d] to-[#0066ff] bg-clip-text text-transparent mb-2">
                {project.title}
              </h3>
              <span className="text-sm text-gray-400 font-medium">{project.date}</span>
            </div>
            <div className="px-3 py-1 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full">
              <span className="text-xs text-gray-300 uppercase tracking-wider">
                {project.category}
              </span>
            </div>
          </div>
          
          <p className="text-gray-400 mb-6 leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, tagIndex) => (
              <motion.span
                key={tag}
                className="px-3 py-1 text-sm bg-gradient-to-r from-[#00ff9d]/20 to-[#0066ff]/20 text-[#00ff9d] rounded-full border border-[#00ff9d]/30 font-medium"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: tagIndex * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -2 }}
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
      <section id="projects" className="min-h-screen py-20 relative">
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
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${['#00ff9d', '#0066ff', '#9333ea', '#ff6b35'][i]}15 0%, transparent 70%)`,
              width: `${150 + i * 50}px`,
              height: `${150 + i * 50}px`,
              left: `${(i * 25) % 100}%`,
              top: `${(i * 20 + 10) % 100}%`,
            }}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -50, 30, 0],
              scale: [1, 1.2, 0.8, 1],
              opacity: [0.3, 0.5, 0.2, 0.3],
            }}
            transition={{
              duration: 12 + i * 3,
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
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A showcase of my latest work in web development, AI, blockchain, and mobile applications. 
            Each project represents innovation, creativity, and technical excellence.
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
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'glass-card text-gray-400 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
            >
              {category.icon}
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr"
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
          className="text-center mt-20"
        >
          <div className="glass-card p-8 rounded-3xl max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-[#00ff9d] to-[#0066ff] bg-clip-text text-transparent mb-4">
              Let's Build Something Amazing Together
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Have an exciting project in mind? I'm always interested in collaborating on innovative solutions 
              that push the boundaries of technology.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,255,157,0.5)] transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaRocket className="w-5 h-5" />
              <span>Start a Project</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;