'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { Mail, Menu, X, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { resumeData } from '@/lib/data';
import { trackContactClick } from '@/lib/gtag';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3.5 bg-surface/70 backdrop-blur-xl border-b border-borderSubtle transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 text-textPrimary font-bold text-lg tracking-tight group"
        >
          <div className="p-1.5 rounded-lg bg-accentBlue/10 border border-accentBlue/30 text-accentBlue group-hover:bg-accentBlue group-hover:text-bgPrimary transition-all duration-300">
            <Terminal className="w-5 h-5" />
          </div>
          <span className="group-hover:text-accentBlue transition-colors">
            Julian<span className="text-accentGreen">.dev</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-textMuted hover:text-accentBlue transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Direct Action Icons & Theme Toggle */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`mailto:${resumeData.personal.email}`}
            onClick={() => trackContactClick('Navbar Email')}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-textMuted hover:text-accentBlue hover:bg-surface/80 transition-all"
            aria-label="Direct Email"
            title="Send Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href={resumeData.personal.linkedin}
            onClick={() => trackContactClick('Navbar LinkedIn')}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-textMuted hover:text-accentBlue hover:bg-surface/80 transition-all"
            aria-label="LinkedIn Profile"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={resumeData.personal.github}
            onClick={() => trackContactClick('Navbar GitHub')}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full text-textMuted hover:text-accentGreen hover:bg-surface/80 transition-all"
            aria-label="GitHub Profile"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <div className="h-4 w-px bg-borderSubtle mx-1" />
          <ThemeToggle />
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-textPrimary hover:bg-surface/80"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden mt-3 pt-3 border-t border-borderSubtle bg-surface/90 rounded-2xl p-4 shadow-xl flex flex-col gap-3"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-textPrimary hover:text-accentBlue py-1 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="flex items-center gap-4 pt-2 border-t border-borderSubtle">
              <a
                href={`mailto:${resumeData.personal.email}`}
                className="flex items-center gap-2 text-sm text-textMuted hover:text-accentBlue"
              >
                <Mail className="w-4 h-4" /> Mail
              </a>
              <a
                href={resumeData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-textMuted hover:text-accentBlue"
              >
                <LinkedinIcon className="w-4 h-4" /> LinkedIn
              </a>
              <a
                href={resumeData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-textMuted hover:text-accentGreen"
              >
                <GithubIcon className="w-4 h-4" /> GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
