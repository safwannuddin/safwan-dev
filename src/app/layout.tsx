import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';  // This points to src/styles/globals.css
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Safwan Khan | Frontend Engineer',
  description: 'Portfolio website showcasing modern web development expertise',
  icons: {
    icon: '/favicon.ico',
  },
  themeColor: '#00ff9d'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
