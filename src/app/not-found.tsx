'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaHome, FaArrowLeft, FaSearch, FaExclamationTriangle } from 'react-icons/fa';
import { useClientMount } from '@/hooks/useClientMount';

const NotFound = () => {
  const isMounted = useClientMount();

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center">
          <div className="w-32 h-32 bg-gray-800 rounded-full animate-pulse mx-auto mb-8" />
          <div className="h-8 bg-gray-800 rounded animate-pulse mb-4" />
          <div className="h-4 bg-gray-800 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid" />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-3xl opacity-10"
            style={{
              background: `radial-gradient(circle, ${['#3b82f6', '#06b6d4', '#8b5cf6'][i]}30 0%, transparent 70%)`,
              width: `${150 + i * 40}px`,
              height: `${150 + i * 40}px`,
              left: `${10 + i * 35}%`,
              top: `${15 + i * 30}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* 404 Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          {/* Large 404 Text */}
          <div className="relative mb-6">
            <motion.h1
              className="text-8xl md:text-9xl font-bold gradient-text opacity-20"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              404
            </motion.h1>
            
            {/* Warning Icon */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                  boxShadow: '0 8px 32px rgba(245, 158, 11, 0.3)'
                }}
              >
                <FaExclamationTriangle className="w-8 h-8 text-white" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Page Not Found
          </h2>
          
          <p className="text-lg mb-2" style={{ color: 'var(--text-secondary)' }}>
            Oops! The page you're looking for seems to have wandered off into the digital void.
          </p>
          
          <p className="text-base" style={{ color: 'var(--text-muted)' }}>
            Don't worry, even the best developers encounter 404s. Let's get you back on track!
          </p>
        </motion.div>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8"
        >
          <div 
            className="p-6 rounded-2xl border mb-6"
            style={{
              background: 'rgba(248, 250, 252, 0.02)',
              border: '1px solid rgba(248, 250, 252, 0.1)'
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Here's what you can try:
            </h3>
            
            <ul className="text-left space-y-2" style={{ color: 'var(--text-secondary)' }}>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                Check the URL for any typos or errors
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                Go back to the previous page
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                Visit the homepage and navigate from there
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                Contact me if you think this is a mistake
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Go Home Button */}
          <Link
            href="/"
            className="btn-primary flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-1"
          >
            <FaHome className="w-5 h-5" />
            <span>Go Home</span>
          </Link>

          {/* Go Back Button */}
          <button
            onClick={() => window.history.back()}
            className="btn-secondary flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-1"
          >
            <FaArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-12 pt-8 border-t"
          style={{ borderColor: 'rgba(248, 250, 252, 0.1)' }}
        >
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
            Or explore these sections:
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'About', href: '/#about' },
              { name: 'Skills', href: '/#skills' },
              { name: 'Projects', href: '/#projects' },
              { name: 'Contact', href: '/#contact' }
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                style={{
                  color: 'var(--text-secondary)',
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.2)'
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-40"
            style={{
              background: '#3b82f6',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, -30, -10],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NotFound;