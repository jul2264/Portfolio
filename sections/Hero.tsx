'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '@/lib/data';
import { trackResumeDownload, trackContactClick } from '@/lib/gtag';
import { Download, ArrowDown, Mail, Shield, Code, Server } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons';
import Image from 'next/image';

const titles = [
  'Computer Science Student',
  'Cybersecurity Enthusiast',
  'Full Stack Developer',
  'Product Engineer'
];

export function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-4xl mx-auto text-center flex flex-col items-center z-10"
      >
        {/* Profile Picture with Ambient Neon Glow Ring */}
        <div className="relative mb-6 group cursor-pointer">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-accentBlue via-secondaryBlue to-accentGreen opacity-75 blur-lg group-hover:opacity-100 transition duration-500 animate-pulse" />
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-borderSubtle bg-surface p-1 shadow-2xl">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-surface via-surface/80 to-accentBlue/20 flex items-center justify-center text-accentBlue font-bold text-4xl sm:text-5xl border border-accentBlue/30">
              JSA
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/80 border border-borderSubtle backdrop-blur-md mb-4 text-xs sm:text-sm font-medium text-textMuted"
        >
          <span className="w-2 h-2 rounded-full bg-accentGreen animate-ping" />
          <span>Available for Engineering & Security Roles</span>
        </motion.div>

        {/* Full Name */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-textPrimary mb-3">
          Julian Steve <span className="text-transparent bg-clip-text bg-gradient-to-r from-accentBlue to-accentGreen">Anban</span>
        </h1>

        {/* Dynamic Typewriter Title */}
        <div className="h-10 sm:h-12 flex items-center justify-center mb-6">
          <motion.p
            key={titleIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="text-lg sm:text-2xl font-semibold text-textMuted flex items-center gap-2"
          >
            <Code className="w-5 h-5 text-accentBlue inline-block" />
            {titles[titleIndex]}
          </motion.p>
        </div>

        {/* Specialization Badges */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
          {resumeData.personal.specializations.map((spec) => (
            <span
              key={spec}
              className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-surface/90 border border-borderSubtle text-accentBlue"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Main CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <a
            href="#projects"
            className="px-6 py-3 rounded-xl font-semibold text-bgPrimary bg-gradient-to-r from-accentBlue to-secondaryBlue hover:opacity-90 transition-all shadow-[0_0_20px_rgba(76,183,255,0.3)] hover:scale-105"
          >
            Explore Projects
          </a>
          <a
            href="/Julian_Steve_A_Extended.pdf"
            download="Julian_Steve_A_Extended.pdf"
            onClick={trackResumeDownload}
            className="px-6 py-3 rounded-xl font-semibold text-textPrimary bg-surface/80 border border-borderSubtle hover:border-accentGreen hover:text-accentGreen transition-all backdrop-blur-md flex items-center gap-2 hover:scale-105"
          >
            <Download className="w-4 h-4" /> Download Resume
          </a>
        </div>

        {/* Direct Action Icons */}
        <div className="flex items-center gap-4 text-textMuted">
          <a
            href={`mailto:${resumeData.personal.email}`}
            onClick={() => trackContactClick('Hero Email')}
            className="p-3 rounded-xl bg-surface/60 border border-borderSubtle hover:border-accentBlue hover:text-accentBlue transition-all hover:-translate-y-1"
            title="Direct Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href={resumeData.personal.linkedin}
            onClick={() => trackContactClick('Hero LinkedIn')}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-surface/60 border border-borderSubtle hover:border-accentBlue hover:text-accentBlue transition-all hover:-translate-y-1"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
          <a
            href={resumeData.personal.github}
            onClick={() => trackContactClick('Hero GitHub')}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-surface/60 border border-borderSubtle hover:border-accentGreen hover:text-accentGreen transition-all hover:-translate-y-1"
            title="GitHub Profile"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
        </div>
      </motion.div>

      {/* Scroll Down Bounce Prompt */}
      <motion.a
        href="#about"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 flex flex-col items-center gap-1 text-xs font-mono text-textMuted hover:text-accentBlue transition-colors z-10"
      >
        <span>Scroll to Explore</span>
        <ArrowDown className="w-4 h-4 text-accentBlue" />
      </motion.a>
    </section>
  );
}
