import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from './Button';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {text}
    </motion.div>
  );
};

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#050816] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050816] pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xl text-gray-400 mb-4">
              👋 Hi There! I&apos;m
            </h2>
            
            <AnimatedText 
              text="Mohd Safwan Uddin"
              className="text-5xl md:text-6xl font-bold mb-4"
            />
            
            <AnimatedText 
              text="A Frontend Engineer"
              className="text-3xl md:text-4xl font-bold mb-6 neon-text"
            />
            
            <p className="text-gray-400 text-lg mb-8">
              I help startups <span className="neon-text">launch</span> and{' '}
              <span className="neon-text">grow</span> their products with modern web technologies
              and clean, efficient code.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                href="#projects"
                variant="primary"
                size="lg"
              >
                View My Work
              </Button>
              
              <Button 
                href="#contact"
                variant="outline"
                size="lg"
              >
                Contact Me
              </Button>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative lg:h-[600px] order-first lg:order-last"
          >
            <Image
              src="/developer-illustration.svg"
              alt="Developer Illustration"
              width={500}
              height={500}
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
