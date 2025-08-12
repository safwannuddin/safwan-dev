'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FallbackTransitionProps {
  isActive: boolean;
  progress: number;
}

export default function FallbackTransition({ isActive, progress }: FallbackTransitionProps) {
  const [supportsCanvas, setSupportsCanvas] = useState(true);

  useEffect(() => {
    // Check for Canvas support
    const canvas = document.createElement('canvas');
    const hasCanvas = !!(canvas.getContext && canvas.getContext('2d'));
    
    // Check for performance capabilities
    const hasGoodPerformance = window.devicePixelRatio <= 2 && 
                              !navigator.userAgent.includes('Mobile');
    
    setSupportsCanvas(hasCanvas && hasGoodPerformance);
  }, []);

  if (supportsCanvas || !isActive) return null;

  return (
    <motion.div
      className="absolute inset-0 z-10 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: progress > 0 ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Simple diagonal wipe effect as fallback */}
      <motion.div
        className="absolute inset-0 bg-black"
        style={{
          clipPath: `polygon(${100 - progress * 100}% 0%, 100% 0%, 100% 100%, ${100 - progress * 100 + 20}% 100%)`,
        }}
        transition={{ duration: 0.1 }}
      />
      
      {/* Add some visual interest with gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#00ff9d]/20 to-transparent"
        style={{
          clipPath: `polygon(${100 - progress * 100 - 5}% 0%, ${100 - progress * 100 + 5}% 0%, ${100 - progress * 100 + 25}% 100%, ${100 - progress * 100 + 15}% 100%)`,
        }}
        transition={{ duration: 0.1 }}
      />
    </motion.div>
  );
}