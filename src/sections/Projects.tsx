'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// Remove the ProjectAnimatedText component and use the shared AnimatedText component
import AnimatedText from '@/components/AnimatedText';

interface CardProps {
  title: string;
  description: string;
  imagePath: string;
  tags: string[];
  link: string;
}

const Card = ({ title, description, imagePath, tags, link }: CardProps) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700">
      <div className="relative h-[230px]">
        <Image
          src={imagePath}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm bg-gray-700/50 text-[#00ff9d] rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-[#00ff9d] hover:text-[#00ff9d]/80"
        >
          View Project
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

const projects = [
  {
    title: "Project One",
    description: "A modern web application built with Next.js and TypeScript",
    imagePath: "/projects/project1.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://project1.com"
  },
  {
    title: "Project Two",
    description: "Full-stack application with real-time features",
    imagePath: "/projects/project2.png",
    tags: ["React", "Node.js", "Socket.IO"],
    link: "https://project2.com"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-[#050816] relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedText 
          text="Featured Projects" 
          className="text-4xl font-bold text-center mb-12"
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card {...project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}