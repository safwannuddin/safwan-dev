'use client';

import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

interface Certificate {
  id: string;
  title: string;
  imagePath: string;
  issuer: string;
  date: string;
  type: 'certificate' | 'badge';
}

const certificates: Certificate[] = [
  {
    id: 'accenture',
    title: 'Accenture Certification',
    imagePath: '/Accenture.png',
    issuer: 'Accenture',
    date: 'June 2025',
    type: 'certificate'
  },
  {
    id: 'ai-batch',
    title: 'AI Training Batch',
    imagePath: '/Ai batch.png',
    issuer: 'AI Academy',
    date: 'June 2025',
    type: 'badge'
  },
  {
    id: 'performance-batch',
    title: 'Basic Performance Optimization',
    imagePath: '/Basic performance- batch.png',
    issuer: 'Tech Institute',
    date: 'June 2025',
    type: 'badge'
  },
  {
    id: 'genai',
    title: 'Generative AI Certificate',
    imagePath: '/GenAI.png',
    issuer: 'AI Foundation',
    date: 'June 2025',
    type: 'certificate'
  },
  {
    id: 'iit-hackathon',
    title: 'IIT Hackathon',
    imagePath: '/IIT-Hackathon.jpg',
    issuer: 'Indian Institute of Technology',
    date: 'May 2025',
    type: 'certificate'
  },
  {
    id: 'postman-api',
    title: 'Postman API Certification',
    imagePath: '/Postman-Api.png',
    issuer: 'Postman',
    date: 'June 2025',
    type: 'certificate'
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    imagePath: '/Web-Development.png',
    issuer: 'Tech Academy',
    date: 'June 2025',
    type: 'certificate'
  }
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
  const frameRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;
    
    const rect = frameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = ((centerY - y) / centerY) * 8;
    
    controls.start({
      rotateX,
      rotateY,
      scale: 1.02,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    });
  };

  const handleMouseLeave = () => {
    controls.start({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      transition: { duration: 0.5 }
    });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={frameRef}
      className="relative h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={controls}
      style={{ 
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <div className={`
        relative overflow-hidden glass-card-hover
        ${certificate.type === 'badge' ? 'aspect-square' : 'aspect-[4/3]'}
        group cursor-pointer
      `}>
        
        {/* Certificate image */}
        <div className="relative w-full h-full p-4">
          {isLoading && !hasError && (
            <div className="absolute inset-4 flex items-center justify-center glass-card rounded-lg">
              <div className="w-8 h-8 border-4 border-t-primary-500 border-r-transparent border-b-secondary-500 border-l-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <Image
              src={certificate.imagePath}
              alt={certificate.title}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-105 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setHasError(true);
                setIsLoading(false);
              }}
            />
            
            {hasError && (
              <div className="absolute inset-0 flex items-center justify-center glass-card text-slate-400">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 bg-slate-700 rounded-lg flex items-center justify-center">
                    📜
                  </div>
                  <span className="text-sm">Image not found</span>
                </div>
              </div>
            )}
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
        
        {/* Certificate info overlay */}
        <motion.div 
          className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-2">
            <h3 className="text-white font-bold text-lg md:text-xl leading-tight">{certificate.title}</h3>
            <p className="text-primary-300 font-medium">{certificate.issuer}</p>
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-slate-300">{certificate.date}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                certificate.type === 'badge' 
                  ? 'bg-secondary-500/20 text-secondary-300 border border-secondary-500/30' 
                  : 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
              }`}>
                {certificate.type === 'badge' ? '🏆 Badge' : '📜 Certificate'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </div>
    </motion.div>
  );
};

const Certificates = () => {
  const [filter, setFilter] = useState<'all' | 'certificate' | 'badge'>('all');
  const galleryRef = useRef<HTMLDivElement>(null);
  
  const filteredCertificates = certificates.filter(cert => 
    filter === 'all' || cert.type === filter
  );
  
  // Gallery scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      if (!galleryRef.current) return;
      
      const scrollY = window.scrollY;
      const galleryTop = galleryRef.current.getBoundingClientRect().top + scrollY;
      const offset = scrollY - galleryTop;
      
      if (offset > 0 && offset < 500) {
        // Subtle parallax effect
        galleryRef.current.style.transform = `translateY(${offset * 0.1}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <section id="certificates" className="section-padding relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"></div>
      
      {/* Content */}
      <div className="relative container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 gradient-text"
          >
            Certificates & Achievements
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Professional certifications and achievements that showcase my expertise across various technical domains and continuous learning journey.
          </motion.p>
        </div>
        
        {/* Filter buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center space-x-2 mb-16"
        >
          {[
            { id: 'all', label: 'All Achievements', count: certificates.length },
            { id: 'certificate', label: 'Certificates', count: certificates.filter(c => c.type === 'certificate').length },
            { id: 'badge', label: 'Badges', count: certificates.filter(c => c.type === 'badge').length }
          ].map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setFilter(category.id as 'all' | 'certificate' | 'badge')}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                filter === category.id 
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                  : 'glass-card hover:bg-white/5 text-slate-300 hover:text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {category.label}
              <span className="ml-2 text-xs opacity-75">({category.count})</span>
            </motion.button>
          ))}
        </motion.div>
        
        {/* Certificate gallery */}
        <motion.div 
          ref={galleryRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
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
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Total Certificates', value: certificates.filter(c => c.type === 'certificate').length },
            { label: 'Badges Earned', value: certificates.filter(c => c.type === 'badge').length },
            { label: 'Institutions', value: new Set(certificates.map(c => c.issuer)).size },
            { label: 'This Year', value: certificates.filter(c => c.date.includes('2025')).length }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="glass-card text-center p-6"
            >
              <div className="text-3xl font-bold gradient-text-blue mb-2">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;
