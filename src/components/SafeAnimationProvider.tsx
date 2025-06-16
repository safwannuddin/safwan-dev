'use client';

import React, { ReactNode, useEffect } from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';

interface SafeAnimationProviderProps {
  children: ReactNode;
}

// Export m component to be used instead of motion
export { m };

export function SafeAnimationProvider({ children }: SafeAnimationProviderProps) {
  // Global error handler for Framer Motion
  useEffect(() => {
    const originalError = console.error;
    
    // Override console.error to catch and handle Framer Motion errors
    console.error = (...args: unknown[]) => {
      // Check if this is a Framer Motion error we want to suppress
      const errorMessage = args.map(arg => String(arg)).join(' ');
      
      if (
        errorMessage.includes('positionalValues') ||
        errorMessage.includes('Framer Motion') ||
        errorMessage.includes('AnimationFeature') ||
        errorMessage.includes('MotionValue')
      ) {
        // Log a more user-friendly message and return
        console.log('Animation error handled gracefully');
        return;
      }
      
      // For all other errors, use the original console.error
      originalError.apply(console, args);
    };
    
    // Cleanup function to restore the original console.error
    return () => {
      console.error = originalError;
    };
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

export default SafeAnimationProvider;
