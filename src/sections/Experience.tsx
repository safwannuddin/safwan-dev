'use client';

import { motion } from 'framer-motion';
import { useClientMount } from '@/hooks/useClientMount';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaBuilding, FaRocket, FaLightbulb, FaBolt } from 'react-icons/fa';

const experiences = [
  {
    role: "Intern",
    company: "Mindalike",
    type: "Internship",
    duration: "Oct 2025 – Nov 2025 · 2 mos",
    location: "Hyderabad, India · On-site",
    description: "Worked on applied problem-solving and engineering tasks in a real-world internship environment, gaining hands-on exposure to professional development workflows.",
    icon: FaBuilding,
    color: "#3b82f6"
  },
  {
    role: "Incubatee",
    company: "SU Knowledge Hub Foundation",
    type: "Full-time",
    duration: "Jun 2025 – Oct 2025 · 5 mos",
    location: "Hyderabad, India · On-site",
    description: "Currently incubated at SU Knowledge Hub Foundation, focused on building and refining AI-powered products and early-stage startup ideas through structured mentorship and execution.",
    icon: FaRocket,
    color: "#8b5cf6"
  },
  {
    role: "Founder-Shipped S1",
    company: "Lovable",
    type: "Full-time",
    duration: "Jun 2025 – Aug 2025 · 3 mos",
    location: "Remote",
    description: "Selected as a solo founder into Lovable Shipped Season 1 to build and ship real startup MVPs. Worked end-to-end across ideation, product development, iteration, and shipping under tight timelines.",
    icon: FaLightbulb,
    color: "#f59e0b"
  },
  {
    role: "Core Team Member",
    company: "IEEE Signal Processing Society",
    type: "Volunteer",
    duration: "Jul 2024 – Apr 2025 · 10 mos",
    location: "Student Organization",
    description: "Contributed to organizing technical workshops and events, supporting knowledge-sharing and professional growth within the student and developer community.",
    icon: FaBolt,
    color: "#06b6d4"
  }
];

export default function Experience() {
  const isMounted = useClientMount();

  if (!isMounted) {
    return (
      <section id="experience" className="py-16 bg-black relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-700 rounded mx-auto mb-4 animate-pulse max-w-md" />
          </div>
          <div className="h-96 bg-gray-800 rounded-2xl animate-pulse" />
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-16 bg-black relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-2">Experience</h2>
        </motion.div>

        {/* Single Experience Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative p-8 rounded-2xl overflow-hidden bg-white/5 border border-white/20 backdrop-blur-sm">
            {/* Experience List */}
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 pb-6 border-b border-white/10 last:border-b-0 last:pb-0"
                >
                  {/* Company Logo/Icon */}
                  <div className="flex-shrink-0">
                    <div 
                      className="w-12 h-12 rounded-xl border border-white/20 flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${exp.color}20 0%, ${exp.color}10 100%)`,
                        borderColor: `${exp.color}30`
                      }}
                    >
                      <exp.icon className="w-5 h-5" style={{ color: exp.color }} />
                    </div>
                  </div>

                  {/* Experience Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                        <p className="text-gray-300">
                          {exp.company} · {exp.type}
                        </p>
                      </div>
                      <div className="text-sm text-gray-400 sm:text-right">
                        <p>{exp.duration}</p>
                        <p>{exp.location}</p>
                      </div>
                    </div>
                    
                    {/* Show description only for Lovable and IEEE */}
                    {(exp.company === "Lovable" || exp.company === "IEEE Signal Processing Society") && (
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}