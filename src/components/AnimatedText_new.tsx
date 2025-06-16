'use client';

import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  variant?: 'default' | 'gradient' | 'glow';
  delay?: number;
}

export default function AnimatedText({ 
  text, 
  className = "",
  variant = 'default',
  delay = 0
}: AnimatedTextProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return 'gradient-text';
      case 'glow':
        return 'text-white drop-shadow-lg';
      default:
        return 'text-white';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`${getVariantClasses()} ${className}`}
    >
      {text}
    </motion.div>
  );
}
