'use client';

import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { FaAward, FaMedal, FaCertificate, FaTrophy, FaStar, FaGraduationCap } from 'react-icons/fa';
import { useClientMount } from '@/hooks/useClientMount';

interface Certificate {
  id: string;
  title: string;
  imagePath: string;
  issuer: string;
  date: string;
  type: 'certificate' | 'badge';
  category: 'development' | 'ai' | 'security' | 'design';
  featured?: boolean;
}

const certificates: Certificate[] = [
  {
    id: 'accenture',
    title: 'Accenture Professional Certification',
    imagePath: '/Accenture.png',
    issuer: 'Accenture',
    date: 'June 2025',
    type: 'certificate',
    category: 'development',
    featured: true
  },
  {
    id: 'genai',
    title: 'Generative AI Specialist',
    imagePath: '/GenAI.png',
    issuer: 'AI Foundation',
    date: 'June 2025',
    type: 'certificate',
    category: 'ai',
    featured: true
  },
  {
    id: 'iit-hackathon',
    title: 'IIT Hackathon Winner',
    imagePath: '/IIT-Hackathon.jpg',
    issuer: 'Indian Institute of Technology',
    date: 'May 2025',
    type: 'certificate',
    category: 'development',
    featured: true
  },
  {
    id: 'ai-batch',
    title: 'AI Training Excellence',
    imagePath: '/Ai batch.png',
    issuer: 'AI Academy',
    date: 'June 2025',
    type: 'badge',
    category: 'ai'
  },
  {
    id: 'performance-batch',
    title: 'Performance Optimization Expert',
    imagePath: '/Basic performance- batch.png',
    issuer: 'Tech Institute',
    date: 'June 2025',
    type: 'badge',
    category: 'development'
  },
  {
    id: 'postman-api',
    title: 'Postman API Expert',
    imagePath: '/Postman-Api.png',
    issuer: 'Postman',
    date: 'June 2025',
    type: 'certificate',
    category: 'development'
  },
  {
    id: 'web-dev',
    title: 'Full-Stack Web Development',
    imagePath: '/Web-Development.png',
    issuer: 'Tech Academy',
    date: 'June 2025',
    type: 'certificate',
    category: 'development'
  }
];

const categories = [
  { id: 'all', label: 'All Achievements', icon: <FaTrophy />, color: 'from-[#00ff9d] to-[#00cc7a]' },
  { id: 'development', label: 'Development', icon: <FaCertificate />, color: 'from-blue-500 to-cyan-500' },
  { id: 'ai', label: 'AI & ML', icon: <FaStar />, color: 'from-purple-500 to-pink-500' },
  { id: 'security', label: 'Security', icon: <FaAward />, color: 'from-red-500 to-orange-500' },
  { id: 'design', label: 'Design', icon: <FaMedal />, color: 'from-green-500 to-emerald-500' },
];

interface CertificateFrameProps {
  certificate: Certificate;
  index: number;
}

const CertificateFrame: React.FC<CertificateFrameProps> = ({ certificate, index }) => {
  const controls = useAnimation();
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current || !isMounted) return;
    
    const rect = frameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 10;
    const rotateX = ((centerY - y) / centerY) * 10;
    
    controls.start({
      rotateX,
      rotateY,
      scale: 1.05,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
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
    setIsHovered(false);
  };

  if (!isMounted) {
    return (
      <div className="glass-card aspect-[4/3] animate-pulse">
        <div className="h-full bg-gray-800 rounded-2xl" />
      </div>
    );
  }

  return (
    <motion.div
      ref={frameRef}
      className={`relative ${certificate.featured ? 'md:col-span-2' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={controls}
      style={{ 
        perspective: '1000px'
      }}
    >
      <div className={`
        relative overflow-hidden glass-card group cursor-pointer
        ${certificate.type === 'badge' ? 'aspect-square' : 'aspect-[4/3]'}
        ${certificate.featured ? 'ring-2 ring-[#00ff9d]/50' : ''}
      `}>
        
        {/* Featured Badge */}
        {certificate.featured && (
          <div className="absolute top-4 left-4 z-20">
            <div className="px-3 py-1 bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] text-black text-xs font-bold rounded-full flex items-center gap-1">
              <FaStar className="w-3 h-3" />
              FEATURED
            </div>
          </div>
        )}

        {/* Certificate Type Badge */}
        <div className="absolute top-4 right-4 z-20">
          <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
            certificate.type === 'badge' 
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
              : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
          }`}>
            {certificate.type === 'badge' ? <FaMedal className="w-3 h-3" /> : <FaCertificate className="w-3 h-3" />}
            {certificate.type === 'badge' ? 'Badge' : 'Certificate'}
          </div>
        </div>
        
        {/* Certificate image */}
        <div className="relative w-full h-full p-6">
          {isLoading && !hasError && (
            <div className="absolute inset-6 flex items-center justify-center glass-card rounded-2xl">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 rounded-full border-2 border-[#00ff9d] border-t-transparent"
              />
            </div>
          )}
          
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            {hasError ? (
              <div className="absolute inset-0 flex items-center justify-center glass-card text-gray-400">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#00ff9d] to-[#0066ff] rounded-2xl flex items-center justify-center">
                    <FaGraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-sm">Certificate Preview</span>
                </div>
              </div>
            ) : (
              <Image
                src={certificate.imagePath}
                alt={certificate.title}
                fill
                className={`object-cover transition-all duration-700 group-hover:scale-110 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setHasError(true);
                  setIsLoading(false);
                }}
              />
            )}
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Certificate info overlay */}
            <motion.div 
              className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-3">
                <h3 className="text-white font-bold text-xl leading-tight">{certificate.title}</h3>
                <p className="text-[#00ff9d] font-semibold">{certificate.issuer}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">{certificate.date}</span>
                  <div className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full">
                    <span className="text-xs text-white font-medium uppercase tracking-wider">
                      {certificate.category}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Shine effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Certificates = () => {
  const [filter, setFilter] = useState<'all' | 'development' | 'ai' | 'security' | 'design'>('all');
  const isMounted = useClientMount();

  const filteredCertificates = certificates.filter(cert => 
    filter === 'all' || cert.category === filter
  );

  if (!isMounted) {
    return (
      <section id="certificates" className="min-h-screen py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-16 bg-gray-700 rounded mx-auto mb-16 animate-pulse max-w-md" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card aspect-[4/3] animate-pulse">
                <div className="h-full bg-gray-800 rounded-2xl" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section id="certificates" className="min-h-screen py-20 relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a]">
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
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${['#00ff9d', '#0066ff', '#9333ea', '#ff6b35', '#10b981'][i]}15 0%, transparent 70%)`,
              width: `${120 + i * 40}px`,
              height: `${120 + i * 40}px`,
              left: `${(i * 20) % 100}%`,
              top: `${(i * 15 + 5) % 100}%`,
            }}
            animate={{
              x: [0, 80, -40, 0],
              y: [0, -40, 20, 0],
              scale: [1, 1.1, 0.9, 1],
              opacity: [0.3, 0.5, 0.2, 0.3],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
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
            Certificates & Achievements
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Professional certifications and achievements that showcase my expertise across various technical domains 
            and continuous learning journey in cutting-edge technologies.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00ff9d] to-[#0066ff] mx-auto rounded-full mt-6" />
        </motion.div>
        
        {/* Filter buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setFilter(category.id as any)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                filter === category.id 
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
              <span className="text-xs opacity-75">
                ({category.id === 'all' ? certificates.length : certificates.filter(c => c.category === category.id).length})
              </span>
            </motion.button>
          ))}
        </motion.div>
        
        {/* Certificate gallery */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {filteredCertificates.map((certificate, index) => (
            <CertificateFrame 
              key={certificate.id} 
              certificate={certificate} 
              index={index}
            />
          ))}
        </motion.div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="glass-card p-8 rounded-3xl">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-[#00ff9d] to-[#0066ff] bg-clip-text text-transparent text-center mb-8">
              Achievement Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Certificates', value: certificates.filter(c => c.type === 'certificate').length, icon: <FaCertificate /> },
                { label: 'Badges Earned', value: certificates.filter(c => c.type === 'badge').length, icon: <FaMedal /> },
                { label: 'Institutions', value: new Set(certificates.map(c => c.issuer)).size, icon: <FaGraduationCap /> },
                { label: 'This Year', value: certificates.filter(c => c.date.includes('2025')).length, icon: <FaTrophy /> }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="text-center p-6 glass-card rounded-2xl hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-4xl mb-3 text-[#00ff9d]">{stat.icon}</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#00ff9d] to-[#0066ff] bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;