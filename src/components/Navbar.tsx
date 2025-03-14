'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const navItems = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full top-4 z-50 px-4 transition-all duration-300 ${
        isScrolled ? 'top-0' : 'top-4'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className={`relative px-6 py-3 rounded-full backdrop-blur-md border border-white/10 
          ${isScrolled ? 'bg-[#050816]/95' : 'bg-[#050816]/80'}`}
        >
          <div className="flex items-center justify-between md:justify-center h-12">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href}
                  className="relative group px-3 py-2 text-sm font-medium text-gray-300 transition-colors"
                >
                  <span className="relative z-10">{item.label}</span>
                  <motion.span
                    className="absolute inset-0 rounded-full bg-[#00ff9d]/10"
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00ff9d] scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative z-10 p-2 rounded-lg hover:bg-white/5"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col items-end space-y-1.5">
                <motion.span 
                  animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-0.5 bg-[#00ff9d] origin-center transition-transform"
                />
                <motion.span 
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block w-4 h-0.5 bg-[#00ff9d]"
                />
                <motion.span 
                  animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-0.5 bg-[#00ff9d] origin-center transition-transform"
                />
              </div>
            </button>

            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ 
                opacity: isMenuOpen ? 1 : 0,
                y: isMenuOpen ? 0 : -20 
              }}
              className={`${
                isMenuOpen ? 'block' : 'hidden'
              } md:hidden absolute top-full left-0 right-0 mt-2 py-4 rounded-2xl bg-[#050816]/95 backdrop-blur-md border border-white/10`}
            >
              <div className="flex flex-col items-center space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-8 py-2 text-gray-300 hover:text-[#00ff9d] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;