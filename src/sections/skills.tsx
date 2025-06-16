'use client';

import { motion } from 'framer-motion';
import { FaJs, FaReact, FaNodeJs, FaGit, FaGithub, FaFigma, FaDocker } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiExpress, SiMysql, SiPostgresql, SiTailwindcss, SiNestjs, SiMongodb, SiSass, SiPostman, SiVercel, SiPrisma, SiClerk, SiRadixui, SiMetabase, SiSupabase } from 'react-icons/si';
import { TbBrandFramer } from 'react-icons/tb';
import AnimatedText from '@/components/AnimatedText';

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
    <section id="skills" className="section-padding relative">
      <div className="container-custom">
        <AnimatedText 
          text="Technical Expertise" 
          className="text-5xl font-bold text-center mb-16 gradient-text"
        />

        <motion.div 
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map(({ category, description, items }) => (
            <motion.div
              key={category}
              variants={itemVariants}
              className="glass-card p-8"
            >
              <div className="mb-8">
                <h3 className="text-3xl font-bold gradient-text mb-3">{category}</h3>
                <p className="text-gray-400 text-lg">{description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="glass-card-hover p-6 flex items-center gap-4"
                    whileHover={{ 
                      scale: 1.02,
                      y: -5,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="text-4xl"
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
                    <div>
                      <span className="text-white text-lg font-medium">{skill.name}</span>
                      <div className="h-1 w-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mt-2" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skill Level Visualization */}
        <motion.div 
          className="mt-16 glass-card p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-bold gradient-text mb-8">Skill Proficiency</h3>
          <div className="space-y-6">
            {['Frontend Development', 'Backend Development', 'Database Management', 'DevOps & Tools'].map((category) => (
              <div key={category} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">{category}</span>
                  <span className="text-primary-400">Advanced</span>
                </div>
                <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: "90%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-dots opacity-[0.05] pointer-events-none" />
    </section>
  );
}
