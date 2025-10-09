'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useClientMount } from '@/hooks/useClientMount';

const navItems = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isMounted = useClientMount();

  useEffect(() => {
    if (!isMounted) return;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for glassmorphism effect
      setIsScrolled(currentScrollY > 50);
      
      // Show/hide navbar based on scroll direction
      if (currentScrollY < 100) {
        // Always show navbar at the top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setIsVisible(false);
        setIsMenuOpen(false); // Close mobile menu when hiding
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted, lastScrollY]);

  if (!isMounted) {
    return (
      <nav className="fixed w-full z-50 top-4 py-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-card px-8 py-4 bg-black/70 border-white/10 backdrop-blur-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gray-700 animate-pulse" />
                <div className="hidden sm:block">
                  <div className="h-6 w-32 bg-gray-700 rounded animate-pulse" />
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-8 w-16 bg-gray-700 rounded animate-pulse" />
                ))}
              </div>
              <div className="hidden lg:block">
                <div className="h-10 w-24 bg-gray-700 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ 
        duration: 0.3, 
        ease: "easeInOut",
        type: "tween"
      }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'top-0 py-2' : 'top-4 py-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className={`relative transition-all duration-500 ${
            isScrolled 
              ? 'px-6 py-3 bg-black/90 backdrop-blur-lg border-b border-white/20' 
              : 'px-8 py-4 bg-black/80 backdrop-blur-lg border-b border-white/10'
          }`}
          style={{
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            background: isScrolled 
              ? 'rgba(0, 0, 0, 0.95)' 
              : 'rgba(0, 0, 0, 0.9)',
            boxShadow: isScrolled
              ? '0 2px 8px rgba(0, 0, 0, 0.3)'
              : '0 1px 4px rgba(0, 0, 0, 0.2)'
          }}
          whileHover={{ 
            scale: 1.0
          }}
          transition={{ duration: 0.3 }}
        >
          
          {/* Navigation Container */}
          <div className="flex items-center justify-center w-full">

            {/* Centered Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index + 0.3, duration: 0.6 }}
                >
                  <Link 
                    href={item.href}
                    className="relative group px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 rounded-lg overflow-hidden"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(item.href);
                      if (element) {
                        element.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'start'
                        });
                      }
                    }}
                  >
                    <span className="relative z-10">{item.label}</span>
                    
                    {/* Hover Background */}
                    <motion.div
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 bg-white/10"
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Animated Border */}
                    <motion.div 
                      className="absolute bottom-0 left-1/2 w-0 h-0.5 rounded-full bg-white group-hover:w-full group-hover:left-0 transition-all duration-500"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-xl hover:bg-white/10 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={isMenuOpen ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <FaTimes className="w-6 h-6 text-white" />
                ) : (
                  <FaBars className="w-6 h-6 text-white" />
                )}
              </motion.div>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isMenuOpen ? 1 : 0,
              height: isMenuOpen ? 'auto' : 0
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <motion.div 
              className="pt-6 pb-4 border-t border-white/20 mt-4"
              style={{
                background: 'rgba(0, 0, 0, 0.9)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius: '8px',
                marginTop: '16px',
                padding: '24px 16px 16px 16px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ 
                y: isMenuOpen ? 0 : -20,
                opacity: isMenuOpen ? 1 : 0
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex flex-col space-y-3">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: isMenuOpen ? 1 : 0,
                      x: isMenuOpen ? 0 : -20 
                    }}
                    transition={{ delay: isMenuOpen ? 0.1 * index + 0.2 : 0, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMenuOpen(false);
                        const element = document.querySelector(item.href);
                        if (element) {
                          element.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                          });
                        }
                      }}
                      className="group block px-4 py-3 text-gray-300 hover:text-white rounded-xl transition-all duration-300 relative overflow-hidden"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.15)'
                      }}
                    >
                      <span className="relative z-10">{item.label}</span>
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-xl"
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)'
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isMenuOpen ? 1 : 0,
                    x: isMenuOpen ? 0 : -20 
                  }}
                  transition={{ delay: isMenuOpen ? 0.1 * navItems.length + 0.2 : 0, duration: 0.3 }}
                  className="pt-3"
                >
                  <motion.a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuOpen(false);
                      const element = document.querySelector('#contact');
                      if (element) {
                        element.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'start'
                        });
                      }
                    }}
                    className="btn btn-primary w-full text-center cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Let&apos;s Talk
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>


        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;