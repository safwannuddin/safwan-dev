'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'top-0 py-2' : 'top-4 py-0'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className={`relative glass-card transition-all duration-500 ${
          isScrolled 
            ? 'px-6 py-3 bg-dark-900/95 border-white/20' 
            : 'px-8 py-4 bg-dark-900/80 border-white/10'
        }`}>
          
          {/* Logo */}
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">MS</span>
              </div>
              <span className="hidden sm:block text-xl font-display font-bold gradient-text">
                Mohd Safwan
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <Link 
                    href={item.href}
                    className="relative group px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-all duration-300 rounded-lg"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100"
                      layoutId="navHover"
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div 
                      className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-secondary-400 group-hover:w-full group-hover:left-0 transition-all duration-300"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="hidden lg:block"
            >
              <Link 
                href="#contact"
                className="btn btn-primary text-sm px-6 py-2"
              >
                Let's Talk
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative z-10 p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col items-center justify-center w-6 h-6 space-y-1">
                <motion.span 
                  animate={isMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                  className="block w-full h-0.5 bg-gradient-to-r from-primary-400 to-secondary-400 rounded"
                />
                <motion.span 
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block w-full h-0.5 bg-gradient-to-r from-primary-400 to-secondary-400 rounded"
                />
                <motion.span 
                  animate={isMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                  className="block w-full h-0.5 bg-gradient-to-r from-primary-400 to-secondary-400 rounded"
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isMenuOpen ? 1 : 0,
              height: isMenuOpen ? 'auto' : 0
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <div className="pt-4 pb-2 border-t border-white/10 mt-4">
              <div className="flex flex-col space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: isMenuOpen ? 1 : 0,
                      x: isMenuOpen ? 0 : -20 
                    }}
                    transition={{ delay: isMenuOpen ? 0.1 * index : 0, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isMenuOpen ? 1 : 0,
                    x: isMenuOpen ? 0 : -20 
                  }}
                  transition={{ delay: isMenuOpen ? 0.1 * navItems.length : 0, duration: 0.3 }}
                  className="pt-2"
                >
                  <Link 
                    href="#contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn btn-primary w-full text-center"
                  >
                    Let's Talk
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
