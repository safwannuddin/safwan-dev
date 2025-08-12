import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mohd Safwan Uddin | Full-Stack Developer & AI Enthusiast',
  description: 'Passionate full-stack developer specializing in modern web technologies, AI integration, and innovative digital solutions. Building the future with cutting-edge tech.',
  keywords: 'Full-Stack Developer, AI, Machine Learning, React, Next.js, TypeScript, Python, Web Development',
  authors: [{ name: 'Mohd Safwan Uddin' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#00ff9d" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <main className="overflow-x-hidden">{children}</main>
      </body>
    </html>
  );
}
