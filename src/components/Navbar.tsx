'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
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
  const { scrollY } = useScroll();
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
          className={`relative transition-all duration-500 rounded-2xl ${
            isScrolled 
              ? 'px-6 py-3 bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl' 
              : 'px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl'
          }`}
          style={{
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            background: isScrolled 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(255, 255, 255, 0.05)',
            boxShadow: isScrolled
              ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              : '0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
          whileHover={{ 
            scale: 1.01,
            background: 'rgba(255, 255, 255, 0.15)'
          }}
          transition={{ duration: 0.3 }}
        >
          
          {/* Logo */}
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <motion.div 
                className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#00ff9d] to-[#00cc7a] flex items-center justify-center overflow-hidden"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <span className="text-black font-bold text-xl">MS</span>

              </motion.div>
              <div className="hidden sm:block">
                <motion.span 
                  className="text-2xl font-display font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  Mohd Safwan
                </motion.span>
                <motion.div
                  className="h-0.5 bg-gradient-to-r from-[#00ff9d] to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index + 0.3, duration: 0.6 }}
                >
                  <Link 
                    href={item.href}
                    className="relative group px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 rounded-xl overflow-hidden"
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
                      className="absolute inset-0 bg-gradient-to-r from-[#00ff9d]/10 to-[#0066ff]/10 opacity-0 group-hover:opacity-100"
                      initial={false}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Animated Border */}
                    <motion.div 
                      className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#00ff9d] to-[#0066ff] group-hover:w-full group-hover:left-0 transition-all duration-500"
                    />
                    
                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00ff9d]/20 to-[#0066ff]/20 opacity-0 group-hover:opacity-100 blur-sm"
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="hidden lg:block"
            >
              <motion.a
                href="#contact"
                className="relative px-6 py-3 bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] text-black font-semibold rounded-full overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
              >
                <span className="relative z-10">Let's Talk</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#00cc7a] to-[#009957]"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />

              </motion.a>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative z-10 p-3 rounded-xl hover:bg-white/10 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={isMenuOpen ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <FaTimes className="w-6 h-6 text-[#00ff9d]" />
                ) : (
                  <FaBars className="w-6 h-6 text-[#00ff9d]" />
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
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius: '12px',
                marginTop: '16px',
                padding: '24px 16px 16px 16px'
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
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <span className="relative z-10">{item.label}</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#00ff9d]/20 to-[#0066ff]/20 opacity-0 group-hover:opacity-100 rounded-xl"
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
                    className="block w-full text-center px-6 py-3 bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] text-black font-semibold rounded-full cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Let&apos;s Talk
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Animated Border with Glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
            }}
            animate={{
              borderColor: isScrolled ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.15)',
              boxShadow: isScrolled 
                ? '0 0 20px rgba(0, 255, 157, 0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
                : '0 0 10px rgba(0, 255, 157, 0.05), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Subtle Gradient Overlay */}
          <div 
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 255, 157, 0.03) 0%, rgba(0, 102, 255, 0.03) 100%)',
              opacity: isScrolled ? 1 : 0.5,
              transition: 'opacity 0.5s ease'
            }}
          />
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;