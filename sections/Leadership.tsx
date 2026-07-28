'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/lib/data';
import { GlassCard } from '@/components/ui/GlassCard';
import { Palette, Calendar, MapPin, Award } from 'lucide-react';

export function LeadershipSection() {
  return (
    <section id="leadership" className="py-20 px-4 max-w-5xl mx-auto z-10 relative">
      <motion.div
        initial={{ opacity: 0, rotateX: 10 }}
        whileInView={{ opacity: 1, rotateX: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        {/* Section Heading */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-accentGreen text-sm font-semibold">06.</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-textPrimary">Leadership & Creative Work</h2>
          <div className="h-px bg-borderSubtle flex-1 max-w-xs" />
        </div>

        {/* Roles Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resumeData.leadership.map((item, idx) => (
            <GlassCard key={item.organization} accent={idx % 2 === 0 ? 'blue' : 'green'} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accentBlue/10 border border-accentBlue/30 text-accentBlue text-xs font-mono font-semibold">
                  <Palette className="w-3.5 h-3.5" /> Creative Role
                </span>
                <span className="text-xs text-textMuted font-mono flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-accentGreen" /> {item.period}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-textPrimary mb-1">{item.role}</h3>
              <p className="text-lg font-semibold text-accentGreen mb-4">{item.organization}</p>

              <div className="space-y-2 text-textMuted text-sm leading-relaxed">
                {item.highlights.map((bullet, i) => (
                  <p key={i}>• {bullet}</p>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
