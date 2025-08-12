export interface PaperTearConfig {
  // Animation speed settings
  tearSpeed: number;
  scrollSensitivity: number;
  
  // Visual settings
  jaggedness: number;
  shadowIntensity: number;
  curlEffect: boolean;
  
  // Performance settings
  enableAdvancedEffects: boolean;
  maxCanvasSize: number;
  frameRate: number;
  
  // Responsive settings
  mobileOptimizations: boolean;
  reducedMotion: boolean;
}

export const defaultPaperTearConfig: PaperTearConfig = {
  // Animation speed (0.1 = very slow, 2.0 = very fast)
  tearSpeed: 1.2,
  scrollSensitivity: 1.0,
  
  // Visual appearance (0.0 = smooth, 1.0 = very jagged)
  jaggedness: 0.4,
  shadowIntensity: 0.3,
  curlEffect: true,
  
  // Performance optimizations
  enableAdvancedEffects: true,
  maxCanvasSize: 2048,
  frameRate: 60,
  
  // Responsive behavior
  mobileOptimizations: true,
  reducedMotion: false,
};

export const getOptimizedConfig = (): PaperTearConfig => {
  const config = { ...defaultPaperTearConfig };
  
  // Detect device capabilities
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Apply optimizations
  if (isMobile || isLowEnd) {
    config.tearSpeed = 1.5; // Faster on mobile for better UX
    config.jaggedness = 0.2; // Less complex on mobile
    config.shadowIntensity = 0.1;
    config.curlEffect = false;
    config.frameRate = 30;
  }
  
  if (prefersReducedMotion) {
    config.reducedMotion = true;
    config.tearSpeed = 2.0; // Instant transitions
    config.curlEffect = false;
  }
  
  return config;
};