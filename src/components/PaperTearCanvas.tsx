'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import FallbackTransition from './FallbackTransition';

interface PaperTearCanvasProps {
  isActive: boolean;
  tearProgress: number;
  onTearComplete?: () => void;
  tearSpeed?: number;
  jaggedness?: number;
}

export default function PaperTearCanvas({ 
  isActive, 
  tearProgress, 
  onTearComplete,
  tearSpeed = 1,
  jaggedness = 0.3 
}: PaperTearCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [supportsAdvancedEffects, setSupportsAdvancedEffects] = useState(true);

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    // Check for advanced effects support
    const checkSupport = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const hasCanvas = !!(ctx && canvas.getContext);
      const hasGoodPerformance = window.devicePixelRatio <= 2;
      const isNotMobile = !navigator.userAgent.includes('Mobile');
      
      setSupportsAdvancedEffects(hasCanvas && hasGoodPerformance && isNotMobile);
    };

    updateDimensions();
    checkSupport();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !isActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = dimensions.width * window.devicePixelRatio;
    canvas.height = dimensions.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const drawTear = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      if (tearProgress <= 0) return;

      // Create paper tear path
      const startX = dimensions.width;
      const startY = dimensions.height;
      const progress = Math.min(tearProgress, 1);
      
      // Calculate tear endpoint based on progress
      const endX = dimensions.width * (1 - progress);
      const endY = dimensions.height * (1 - progress);

      // Create jagged tear line
      ctx.beginPath();
      ctx.moveTo(startX, startY);

      // Generate jagged points along the tear
      const numPoints = Math.floor(progress * 20) + 5;
      const jaggedPoints: { x: number; y: number }[] = [];

      for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        const baseX = startX + (endX - startX) * t;
        const baseY = startY + (endY - startY) * t;
        
        // Add jaggedness
        const jagOffset = (Math.sin(t * Math.PI * 8) + Math.cos(t * Math.PI * 12)) * jaggedness * 20;
        const perpX = -(endY - startY) / Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
        const perpY = (endX - startX) / Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
        
        jaggedPoints.push({
          x: baseX + perpX * jagOffset,
          y: baseY + perpY * jagOffset
        });
      }

      // Draw the main tear line
      jaggedPoints.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });

      // Complete the torn area
      ctx.lineTo(dimensions.width, endY);
      ctx.lineTo(dimensions.width, dimensions.height);
      ctx.closePath();

      // Create gradient for torn edge shadow
      const gradient = ctx.createLinearGradient(
        dimensions.width - 50, 
        dimensions.height - 50, 
        dimensions.width, 
        dimensions.height
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');

      ctx.fillStyle = gradient;
      ctx.fill();

      // Add torn paper edge highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw curled paper effect
      if (progress > 0.3) {
        const curlProgress = Math.min((progress - 0.3) / 0.7, 1);
        drawCurledEdge(ctx, jaggedPoints, curlProgress);
      }
    };

    const drawCurledEdge = (ctx: CanvasRenderingContext2D, points: { x: number; y: number }[], curlProgress: number) => {
      if (points.length < 2) return;

      ctx.save();
      
      // Create curled paper shadow
      const shadowGradient = ctx.createRadialGradient(
        dimensions.width - 30, dimensions.height - 30, 0,
        dimensions.width - 30, dimensions.height - 30, 50
      );
      shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0.4)');
      shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.beginPath();
      points.forEach((point, index) => {
        const curlOffset = Math.sin(curlProgress * Math.PI) * 15;
        const adjustedX = point.x + curlOffset;
        const adjustedY = point.y + curlOffset;
        
        if (index === 0) {
          ctx.moveTo(adjustedX, adjustedY);
        } else {
          ctx.lineTo(adjustedX, adjustedY);
        }
      });

      ctx.fillStyle = shadowGradient;
      ctx.fill();
      
      ctx.restore();
    };

    const animate = () => {
      drawTear();
      
      if (tearProgress < 1 && isActive) {
        animationRef.current = requestAnimationFrame(animate);
      } else if (tearProgress >= 1 && onTearComplete) {
        onTearComplete();
      }
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, tearProgress, dimensions, jaggedness, onTearComplete]);

  return (
    <>
      {supportsAdvancedEffects ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      ) : (
        <FallbackTransition isActive={isActive} progress={tearProgress} />
      )}
    </>
  );
}