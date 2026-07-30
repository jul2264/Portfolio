'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { resumeData } from '@/lib/data';
import { Calendar, MapPin } from 'lucide-react';

function TypewriterDescription({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2 });
  const [displayedLength, setDisplayedLength] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedLength((prev) => {
        if (isInView) {
          if (prev < text.length) return Math.min(prev + 4, text.length);
        } else {
          if (prev > 0) return Math.max(prev - 6, 0);
        }
        return prev;
      });
    }, 15);

    return () => clearInterval(interval);
  }, [isInView, text]);

  const currentText = text.slice(0, displayedLength);

  // Highlight tools (OWASP, Radare2, Wireshark, SQLMap) strictly in GREEN text with NO boxes
  const highlightGreenTools = (str: string) => {
    const tools = ['OWASP', 'Radare2', 'Wireshark', 'SQLMap'];
    let parts: { text: string; isTool: boolean }[] = [{ text: str, isTool: false }];

    tools.forEach((tool) => {
      const newParts: { text: string; isTool: boolean }[] = [];
      parts.forEach((part) => {
        if (part.isTool) {
          newParts.push(part);
        } else {
          const split = part.text.split(tool);
          split.forEach((sub, idx) => {
            if (sub) newParts.push({ text: sub, isTool: false });
            if (idx < split.length - 1) {
              newParts.push({ text: tool, isTool: true });
            }
          });
        }
      });
      parts = newParts;
    });

    return parts.map((part, i) =>
      part.isTool ? (
        <span key={i} className="text-accentGreen font-mono font-bold">
          {part.text}
        </span>
      ) : (
        <span key={i}>{part.text}</span>
      )
    );
  };

  return (
    <div ref={containerRef} className="text-xs sm:text-sm text-textMuted leading-relaxed min-h-[60px]">
      {highlightGreenTools(currentText)}
      {displayedLength < text.length && (
        <span className="inline-block w-1 h-3.5 ml-0.5 bg-accentGreen align-middle animate-pulse" />
      )}
    </div>
  );
}

export function ExperienceSection() {
  const exp = resumeData.experience[0]; // Cyber Security Intern @ Talenciaglobal

  return (
    <section id="experience" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Section Heading */}
        <div className="flex items-center gap-3 mb-6 border-b border-borderSubtle/60 pb-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-textPrimary tracking-tight">
            Work Experience
          </h2>
        </div>

        {/* Compact Futuristic HUD Card */}
        <div className="relative rounded-none bg-surface/85 backdrop-blur-xl border border-accentBlue/30 p-5 sm:p-6 shadow-xl space-y-5 overflow-hidden group hover:border-accentBlue/70 transition-colors duration-300">
          {/* Subtle Glowing Top Border Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accentBlue via-secondaryBlue to-accentBlue opacity-85" />

          {/* Header Row: Role (White -> Blue on Hover), Company (Green) & Meta Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-borderSubtle/50">
            <div>
              {/* Cyber Security Intern: White by default, turns Blue on hover */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-textPrimary hover:text-accentBlue transition-colors duration-200 cursor-default">
                {exp.role}
              </h3>
              {/* Talenciaglobal: Green */}
              <p className="text-sm sm:text-base font-bold text-accentGreen font-mono">
                {exp.company}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-textMuted shrink-0">
              <span className="flex items-center gap-1.5 text-textPrimary font-semibold">
                <Calendar className="w-3.5 h-3.5 text-accentBlue shrink-0" />
                {exp.period}
              </span>
              <span className="text-borderSubtle">•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-accentGreen shrink-0" />
                {exp.location}
              </span>
            </div>
          </div>

          {/* 3-Column Node Grid containing strictly the resume descriptions without any subtitles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {exp.highlights.map((pointText, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="p-4 rounded-none bg-bgPrimary/60 border border-borderSubtle/60 hover:border-accentGreen/40 transition-all flex flex-col justify-center group/node"
              >
                {/* Typewriter Description Component — Contains exact resume text, nothing more, nothing less */}
                <TypewriterDescription text={pointText} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
