'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/lib/data';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export function EducationSection() {
  // Chronological timeline order (Ryan International 2021 -> Euroschool 2023 -> SRM University 2024)
  const timelineData = [...resumeData.education].reverse();

  return (
    <section id="education" className="py-20 px-4 max-w-5xl mx-auto z-10 relative">
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        {/* Section Heading */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-accentGreen text-sm font-semibold">02.</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-textPrimary">Education History</h2>
          <div className="h-px bg-borderSubtle flex-1 max-w-xs" />
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-borderSubtle/60 space-y-10">
          {timelineData.map((item, idx) => (
            <motion.div
              key={item.institution}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.4 }}
              className="relative group"
            >
              {/* Animated Glowing Node Marker */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-surface border-2 border-accentBlue group-hover:border-accentGreen group-hover:scale-125 transition-all duration-300 flex items-center justify-center shadow-[0_0_10px_rgba(76,183,255,0.4)]">
                <div className="w-2 h-2 rounded-full bg-accentBlue group-hover:bg-accentGreen transition-colors" />
              </div>

              {/* Card Container */}
              <GlassCard
                accent={idx % 2 === 0 ? 'blue' : 'green'}
                className="p-6 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accentBlue/10 border border-accentBlue/30 text-accentBlue text-xs font-mono font-semibold">
                    <Calendar className="w-3.5 h-3.5" /> {item.year}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-textMuted font-mono">
                    <MapPin className="w-3.5 h-3.5 text-accentGreen" /> {item.location}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-textPrimary flex items-center gap-2 mb-1">
                  <GraduationCap className="w-5 h-5 text-accentBlue" />
                  {item.institution}
                </h3>
                <p className="text-sm font-semibold text-textMuted mb-2">{item.degree}</p>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface/80 border border-borderSubtle text-xs font-mono text-accentGreen">
                  <Award className="w-3.5 h-3.5" /> Grade: {item.grade}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
