'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full top-0 z-50 bg-[#050816]/80 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl">
            SK
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
              <span className="block w-6 h-0.5 bg-white mb-1.5"></span>
              <span className="block w-6 h-0.5 bg-white mb-1.5"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="#about" className="hover:text-blue-500 transition-colors">
              About
            </Link>
            <Link href="#projects" className="hover:text-blue-500 transition-colors">
              Projects
            </Link>
            <Link href="#contact" className="hover:text-blue-500 transition-colors">
              Contact
            </Link>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-[#050816]/95 backdrop-blur-sm">
              <div className="flex flex-col items-center py-4 space-y-4">
                <Link href="#about" className="hover:text-blue-500 transition-colors">
                  About
                </Link>
                <Link href="#projects" className="hover:text-blue-500 transition-colors">
                  Projects
                </Link>
                <Link href="#contact" className="hover:text-blue-500 transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;