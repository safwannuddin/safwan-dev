'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

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
  const { scrollY } = useScroll();
  const navY = useTransform(scrollY, [0, 100], [0, -10]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{ y: navY }}
      className={`fixed w-full z-50 transition-all duration-700 ${
        isScrolled ? 'top-0 py-2' : 'top-4 py-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className={`relative glass-card transition-all duration-700 ${
            isScrolled 
              ? 'px-6 py-3 bg-black/90 border-white/20 shadow-2xl backdrop-blur-xl' 
              : 'px-8 py-4 bg-black/70 border-white/10 backdrop-blur-lg'
          }`}
          whileHover={{ scale: 1.01 }}
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
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
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
                className="relative px-6 py-3 bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] text-black font-semibold rounded-full overflow-hidden group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Let's Talk</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#00cc7a] to-[#009957]"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
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
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <motion.div 
              className="pt-6 pb-4 border-t border-white/10 mt-4"
              initial={{ y: -20 }}
              animate={{ y: isMenuOpen ? 0 : -20 }}
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
                      onClick={() => setIsMenuOpen(false)}
                      className="group block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 relative overflow-hidden"
                    >
                      <span className="relative z-10">{item.label}</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#00ff9d]/10 to-transparent opacity-0 group-hover:opacity-100"
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
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center px-6 py-3 bg-gradient-to-r from-[#00ff9d] to-[#00cc7a] text-black font-semibold rounded-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Let's Talk
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Animated Border */}
          <motion.div
            className="absolute inset-0 rounded-2xl border border-white/20"
            animate={{
              borderColor: isScrolled ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
            }}
            transition={{ duration: 0.7 }}
          />
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;