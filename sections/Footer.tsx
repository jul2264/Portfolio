'use client';

import { ArrowUp, Heart, Terminal } from 'lucide-react';
import { resumeData } from '@/lib/data';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 border-t border-borderSubtle bg-surface/50 backdrop-blur-md relative z-10 text-xs font-mono text-textMuted">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Built With Stack Details */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2 font-bold text-textPrimary text-sm">
            <Terminal className="w-4 h-4 text-accentBlue" /> Julian Steve Anban
          </div>
          <span className="hidden sm:inline text-borderSubtle">•</span>
          <span>
            Built using <span className="text-accentBlue">Next.js</span>, <span className="text-accentBlue">TypeScript</span>, <span className="text-accentBlue">Tailwind</span>, <span className="text-accentGreen">Framer Motion</span> & <span className="text-accentGreen">Three.js</span>
          </span>
        </div>

        {/* Hosting & Version Control */}
        <div className="flex items-center gap-4">
          <span>Hosted on <span className="text-textPrimary font-semibold">Vercel</span></span>
          <span className="text-borderSubtle">•</span>
          <a
            href={resumeData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-textMuted hover:text-accentGreen transition-colors"
          >
            GitHub Version Control
          </a>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-none bg-surface border border-borderSubtle text-accentBlue hover:border-accentBlue hover:scale-110 transition-all ml-2"
            aria-label="Back to Top"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
