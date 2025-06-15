'use client';

import { motion } from 'framer-motion';
import { FaJs, FaReact, FaNodeJs, FaGit, FaGithub, FaFigma, FaDocker } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiExpress, SiMysql, SiPostgresql, SiTailwindcss, SiNestjs, SiMongodb, SiSass, SiPostman, SiVercel, SiPrisma, SiClerk, SiRadixui, SiMetabase, SiSupabase } from 'react-icons/si';
import { TbBrandFramer } from 'react-icons/tb';

const skills = [
  {
    category: "Frontend Development",
    description: "Building responsive and interactive user interfaces",
    items: [
      { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
      { name: "React", icon: <FaReact className="text-blue-400" /> },
      { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400" /> },
      { name: "Shadcn/ui", icon: <SiRadixui className="text-slate-200" /> },
      { name: "Framer Motion", icon: <TbBrandFramer className="text-red-400" /> },
      { name: "SASS", icon: <SiSass className="text-pink-400" /> },
    ]
  },
  {
    category: "Backend Development",
    description: "Creating robust server-side applications",
    items: [
      { name: "Node.js", icon: <FaNodeJs className="text-green-400" /> },
      { name: "Nest.js", icon: <SiNestjs className="text-red-500" /> },
      { name: "Express.js", icon: <SiExpress className="text-white" /> },
      { name: "Prisma", icon: <SiPrisma className="text-teal-500" /> },
    ]
  },  {
    category: "Database Management",
    description: "Working with modern database solutions",
    items: [
      { name: "MySQL", icon: <SiMysql className="text-blue-500" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-500" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
      { name: "Neon DB", icon: <SiMetabase className="text-cyan-400" /> },
      { name: "Supabase", icon: <SiSupabase className="text-emerald-500" /> },
    ]
  },
  {
    category: "Development Tools",
    description: "Essential tools for modern development workflow",
    items: [
      { name: "Git", icon: <FaGit className="text-orange-500" /> },
      { name: "GitHub", icon: <FaGithub className="text-white" /> },
      { name: "Docker", icon: <FaDocker className="text-blue-400" /> },
      { name: "Figma", icon: <FaFigma className="text-purple-400" /> },
      { name: "Postman", icon: <SiPostman className="text-orange-500" /> },
      { name: "Vercel", icon: <SiVercel className="text-white" /> },
      { name: "Clerk", icon: <SiClerk className="text-violet-500" /> },
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-[#050816] relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Technical <span className="text-[#00ff9d]">Expertise</span>
          </h2>
          <p className="text-gray-400 text-xl">Building modern web applications with cutting-edge technologies</p>
        </motion.div>

        <motion.div 
          className="space-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map(({ category, description, items }) => (
            <motion.div
              key={category}
              variants={itemVariants}
              className="bg-white/[0.02] backdrop-blur-sm rounded-2xl p-10 border border-white/10 hover:bg-white/[0.05] transition-colors duration-300"
            >
              <div className="mb-10">
                <h3 className="text-3xl md:text-4xl font-bold text-[#00ff9d] mb-3">{category}</h3>
                <p className="text-gray-400 text-lg">{description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-center gap-5 p-5 bg-white/[0.02] rounded-xl hover:bg-white/[0.08] transition-all duration-300 hover:shadow-lg hover:shadow-[#00ff9d]/10"
                    whileHover={{ 
                      scale: 1.05,
                      y: -5,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="text-6xl" // Increased icon size
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 3,
                        ease: "easeInOut"
                      }}
                    >
                      {skill.icon}
                    </motion.div>
                    <span className="text-white text-lg font-medium">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Enhanced Background Grid Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#00ff9d_0.5px,transparent_0.5px)] bg-[length:24px_24px] opacity-[0.05] pointer-events-none" />
    </section>
  );
}
