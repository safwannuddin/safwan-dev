'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import AnimatedText from '@/components/AnimatedText';
import { useClientMount } from '@/hooks/useClientMount';

const socialLinks = [
  {
    name: 'GitHub',
    icon: <FaGithub className="w-6 h-6" />,
    url: 'https://github.com/yourusername',
    color: 'hover:text-[#333]'
  },
  {
    name: 'LinkedIn',
    icon: <FaLinkedin className="w-6 h-6" />,
    url: 'https://linkedin.com/in/yourusername',
    color: 'hover:text-[#0077b5]'
  },
  {
    name: 'Twitter',
    icon: <FaTwitter className="w-6 h-6" />,
    url: 'https://twitter.com/yourusername',
    color: 'hover:text-[#1da1f2]'
  },
  {
    name: 'Email',
    icon: <FaEnvelope className="w-6 h-6" />,
    url: 'mailto:your.email@example.com',
    color: 'hover:text-[#ea4335]'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const isMounted = useClientMount();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Add your form submission logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isMounted) {
    return (
      <section id="contact" className="section-padding relative">
        <div className="container-custom">
          <div className="h-16 bg-gray-700 rounded mx-auto mb-16 animate-pulse max-w-md" />
          <div className="grid md:grid-cols-2 gap-12">
            <div className="glass-card p-8 animate-pulse">
              <div className="h-8 bg-gray-700 rounded mb-6" />
              <div className="space-y-6">
                <div className="h-12 bg-gray-700 rounded" />
                <div className="h-12 bg-gray-700 rounded" />
                <div className="h-32 bg-gray-700 rounded" />
                <div className="h-12 bg-gray-700 rounded" />
              </div>
            </div>
            <div className="glass-card p-8 animate-pulse">
              <div className="h-8 bg-gray-700 rounded mb-6" />
              <div className="space-y-4">
                <div className="h-4 bg-gray-700 rounded" />
                <div className="h-4 bg-gray-700 rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-custom">
        <AnimatedText 
          text="Get In Touch" 
          className="text-5xl font-bold text-center mb-16 gradient-text"
        />
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <h3 className="text-3xl font-bold gradient-text mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2 font-medium">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="form-textarea"
                  placeholder="Your message here..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <motion.div
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  'Send Message'
                )}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-emerald-400 text-center"
                >
                  Message sent successfully!
                </motion.p>
              )}

              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-center"
                >
                  Failed to send message. Please try again.
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <h3 className="text-3xl font-bold gradient-text mb-6">Contact Information</h3>
            <p className="text-gray-400 mb-8">
              Feel free to reach out to me through any of the following channels. I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <div className="space-y-6">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 glass-card-hover rounded-xl group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`text-2xl transition-colors duration-300 ${link.color}`}>
                    {link.icon}
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    {link.name}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Location Info */}
            <div className="mt-12 p-6 glass-card-hover rounded-xl">
              <h4 className="text-xl font-semibold text-white mb-4">Location</h4>
              <p className="text-gray-400">
                Based in <span className="text-[#00ff9d]">Hyderabad, India</span>
              </p>
              <p className="text-gray-400 mt-2">
                Available for remote work and local opportunities
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-dots opacity-[0.05] pointer-events-none" />
    </section>
  );
}