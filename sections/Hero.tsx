'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { resumeData } from '@/lib/data';
import { trackResumeDownload, trackContactClick } from '@/lib/gtag';
import {
  Download,
  Mail,
  Phone,
  Shield,
  Server,
  Cpu,
  Cloud,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons';
import { SkillChain } from '@/components/ui/SkillChain';
import { TypewriterText } from '@/components/ui/TypewriterText';
import { PixelDissolvePhoto } from '@/components/ui/PixelDissolvePhoto';

const summaryParagraphs = [
  "I'm a Computer Science undergraduate at SRM University with hands-on experience across full-stack development and cyber security. I've architected real-time, geo-spatial systems at scale — including a social platform built on Go, Next.js, PostgreSQL/PostGIS, and Redis with horizontal WebSocket scaling — alongside projects integrating sandboxed code execution, async task pipelines, and modern auth/search infrastructure (Django, Celery, Clerk, Meilisearch).",
  "My security background includes a Cyber Security internship at Talenciaglobal, where I performed vulnerability assessment, OWASP mapping, reverse engineering, and traffic analysis using tools like Radare2, Wireshark, and SQLMap. I combine strong systems-design instincts with a security-conscious mindset, and I'm passionate about building scalable, well-architected products end to end.",
];

const expertiseList = [
  { name: 'Cybersecurity', icon: Shield, color: 'text-accentGreen' },
  { name: 'System Design', icon: Server, color: 'text-accentBlue' },
  { name: 'Product Engineering', icon: Cpu, color: 'text-accentGreen' },
  { name: 'Cloud Architecture', icon: Cloud, color: 'text-accentBlue' },
];

export function HeroSection() {
  return (
    <section
      id="about"
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 max-w-7xl mx-auto z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full bg-surface/70 backdrop-blur-2xl border border-borderSubtle rounded-none p-4 sm:p-5 lg:p-6 shadow-2xl relative overflow-hidden"
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-accentBlue/15 rounded-none blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-center relative z-10">
          {/* LEFT COLUMN: Julian Real Photo & Skill Chain Below */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            {/* Photo Container Frame */}
            <div className="relative w-full max-w-[250px] sm:max-w-[280px] lg:max-w-full aspect-[4/4.2] rounded-none overflow-hidden border-2 border-borderSubtle bg-surface/90 shadow-xl group">
              <PixelDissolvePhoto
                src="/julian_photo.jpg"
                alt="Julian Steve Anban"
                className="w-full h-full group-hover:scale-105 transition-transform duration-700"
              />

              {/* Bottom Name Box - Only Julian Steve Anban */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2 rounded-none bg-surface/90 backdrop-blur-md border border-borderSubtle/80 flex items-center justify-center">
                <h3 className="text-xs sm:text-sm font-bold text-textPrimary text-center">
                  Julian Steve Anban
                </h3>
              </div>
            </div>

            {/* SKILL CHAIN (Aligned directly BELOW the photo image) */}
            <SkillChain />
          </div>

          {/* RIGHT COLUMN: About Me Text with Typewriter Typing Animation */}
          <div className="lg:col-span-8 flex flex-col justify-center gap-3">
            {/* Header: About me (No Colon) */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-textPrimary tracking-tight">
                About me
              </h1>
            </div>

            {/* Typewriter Animated Summary Paragraphs - Compact & Fast */}
            <TypewriterText
              paragraphs={summaryParagraphs}
              speed={1}
              className="text-textMuted text-[11px] sm:text-[12px] lg:text-[12.5px]"
            />

            {/* EXPERTISE SECTION: Single Row with Meaningful Icons */}
            <div className="space-y-1.5">
              <h4 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-textPrimary font-bold">
                EXPERTISE
              </h4>
              <div className="flex flex-row items-center gap-2 overflow-x-auto sm:overflow-visible pb-0.5 no-scrollbar">
                {expertiseList.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.name}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-surface/90 border border-borderSubtle text-[11.5px] sm:text-xs font-mono font-semibold text-textPrimary shrink-0 hover:border-accentBlue transition-colors shadow-xs"
                    >
                      <IconComponent className={`w-3.5 h-3.5 ${item.color}`} />
                      <span>{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* GET IN TOUCH SECTION: Larger Official Icons & Green Hover Resumé Button */}
            <div className="space-y-1.5 pt-0.5">
              <h4 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-textPrimary font-bold">
                GET IN TOUCH
              </h4>

              <div className="flex flex-wrap items-center gap-2.5">
                {/* 1. Mail */}
                <a
                  href={`mailto:${resumeData.personal.email}`}
                  onClick={() => trackContactClick('Hero Mail')}
                  className="p-2.5 rounded-none bg-surface/90 border border-borderSubtle hover:border-accentBlue text-textMuted hover:text-accentBlue transition-all shadow-xs hover:scale-105 flex items-center justify-center"
                  title="Direct Mail (juliansteve.anban@gmail.com)"
                >
                  <Mail className="w-5 h-5 text-accentBlue" />
                </a>

                {/* 2. LinkedIn */}
                <a
                  href={resumeData.personal.linkedin}
                  onClick={() => trackContactClick('Hero LinkedIn')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-none bg-surface/90 border border-borderSubtle hover:border-accentBlue text-textMuted hover:text-accentBlue transition-all shadow-xs hover:scale-105 flex items-center justify-center"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>

                {/* 3. GitHub */}
                <a
                  href={resumeData.personal.github}
                  onClick={() => trackContactClick('Hero GitHub')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-none bg-surface/90 border border-borderSubtle hover:border-accentGreen text-textMuted hover:text-accentGreen transition-all shadow-xs hover:scale-105 flex items-center justify-center"
                  title="GitHub Profile"
                >
                  <GithubIcon className="w-5 h-5 text-accentGreen" />
                </a>

                {/* 4. Telephone */}
                <a
                  href={`tel:${resumeData.personal.phone}`}
                  onClick={() => trackContactClick('Hero Telephone')}
                  className="p-2.5 rounded-none bg-surface/90 border border-borderSubtle hover:border-accentBlue text-textMuted hover:text-accentBlue transition-all shadow-xs hover:scale-105 flex items-center justify-center"
                  title="Phone (+91 8217288418)"
                >
                  <Phone className="w-5 h-5 text-accentBlue" />
                </a>

                {/* Resumé CTA Button (Turns Green on Hover) */}
                <a
                  href="/Julian_Steve_A_Extended.pdf"
                  download="Julian_Steve_A_Extended.pdf"
                  onClick={trackResumeDownload}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-accentBlue/10 border border-accentBlue/40 text-accentBlue hover:bg-accentGreen/20 hover:border-accentGreen hover:text-accentGreen font-bold transition-all shadow-sm hover:scale-105 text-xs cursor-pointer ml-auto backdrop-blur-md group"
                >
                  <Download className="w-4 h-4 text-accentBlue group-hover:text-accentGreen transition-colors" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
