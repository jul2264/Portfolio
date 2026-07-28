'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '@/lib/data';
import { GlassCard } from '@/components/ui/GlassCard';
import { Briefcase, Calendar, MapPin, ShieldCheck, Terminal, Shield, Cpu, ChevronRight } from 'lucide-react';

export function ExperienceSection() {
  const exp = resumeData.experience[0]; // Cyber Security Intern @ Talenciaglobal
  const [activeTool, setActiveTool] = useState<string | null>('OWASP');

  return (
    <section id="experience" className="py-20 px-4 max-w-5xl mx-auto z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        {/* Section Heading */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-accentBlue text-sm font-semibold">03.</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-textPrimary">Work Experience</h2>
          <div className="h-px bg-borderSubtle flex-1 max-w-xs" />
        </div>

        {/* Experience Card */}
        <GlassCard accent="blue" className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6 pb-6 border-b border-borderSubtle">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accentGreen/10 border border-accentGreen/30 text-accentGreen text-xs font-mono font-semibold mb-2">
                <Briefcase className="w-3.5 h-3.5" /> Cyber Security Internship
              </span>
              <h3 className="text-2xl font-bold text-textPrimary">{exp.role}</h3>
              <p className="text-lg font-semibold text-accentBlue">{exp.company}</p>
            </div>

            <div className="flex flex-col text-right sm:items-end gap-1 font-mono text-xs text-textMuted">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-accentBlue" /> {exp.period}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-accentGreen" /> {exp.location}
              </span>
            </div>
          </div>

          {/* Sequential Experience Points */}
          <div className="space-y-4 mb-8">
            {exp.highlights.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.4 }}
                className="flex items-start gap-3"
              >
                <div className="mt-1 p-1 rounded-full bg-accentBlue/10 border border-accentBlue/30 text-accentBlue">
                  <ChevronRight className="w-4 h-4" />
                </div>
                <p className="text-textMuted text-sm sm:text-base leading-relaxed flex-1">
                  {point}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Tools & Standards Pills */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-textMuted mb-3">
              Tools & Security Standards Utilized:
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {exp.tools.map((tool) => (
                <button
                  key={tool}
                  onClick={() => setActiveTool(tool)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all border flex items-center gap-2 ${
                    activeTool === tool
                      ? 'bg-accentBlue text-bgPrimary border-accentBlue shadow-[0_0_15px_rgba(76,183,255,0.4)] scale-105'
                      : 'bg-surface/80 border-borderSubtle text-textMuted hover:border-accentBlue hover:text-accentBlue'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  {tool}
                </button>
              ))}
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}
