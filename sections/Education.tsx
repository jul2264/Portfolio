'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/lib/data';
import { Calendar, MapPin, Award } from 'lucide-react';

const accentColors = [
  { border: 'border-accentGreen/70', bar: 'bg-accentGreen', text: 'text-accentGreen' },
  { border: 'border-accentBlue/70', bar: 'bg-accentBlue', text: 'text-accentBlue' },
  { border: 'border-accentBlue/50', bar: 'bg-accentBlue', text: 'text-accentBlue' },
];

export function EducationSection() {
  const educationList = resumeData.education;

  return (
    <section id="education" className="pt-4 pb-12 px-4 max-w-5xl mx-auto z-10 relative">
      <div className="space-y-4">
        {/* Section Heading with Bi-Directional Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between border-b border-borderSubtle/60 pb-2 mb-4"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-textPrimary tracking-tight">
            Education
          </h2>
        </motion.div>

        {/* Bi-Directional Animated Cards (Smooth Forwards & Backwards Scroll) */}
        <div className="space-y-4">
          {educationList.map((item, idx) => {
            const colors = accentColors[idx] ?? accentColors[1];
            return (
              <motion.div
                key={item.institution}
                initial={{ opacity: 0, y: 32, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{
                  duration: 0.65,
                  delay: idx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface/80 backdrop-blur-xl border ${colors.border} rounded-2xl p-5 sm:p-6 group hover:bg-surface transition-colors duration-300 shadow-md`}
              >
                {/* Bi-Directional Left Accent Bar */}
                <motion.div
                  className={`absolute left-0 top-4 bottom-4 w-[3.5px] rounded-full ${colors.bar}`}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 + 0.15, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: 'top' }}
                />

                {/* LEFT: Institution, Degree, Location */}
                <div className="space-y-1 pl-3">
                  <h3 className={`text-xl sm:text-2xl font-extrabold text-textPrimary group-hover:${colors.text} transition-colors duration-200`}>
                    {item.institution}
                  </h3>
                  <p className="text-xs sm:text-sm text-textMuted font-mono flex flex-wrap items-center gap-2">
                    <span className="text-textPrimary font-semibold">{item.degree}</span>
                    {item.syllabus && (
                      <>
                        <span className="text-borderSubtle">•</span>
                        <span className={colors.text}>{item.syllabus}</span>
                      </>
                    )}
                  </p>
                  <p className="text-xs sm:text-sm text-textMuted font-mono flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-accentGreen shrink-0" />
                    <span>{item.location}</span>
                  </p>
                </div>

                {/* RIGHT: Year & Grade */}
                <div className="sm:text-right space-y-1 shrink-0 border-t sm:border-t-0 border-borderSubtle/40 pt-2 sm:pt-0 pl-3 sm:pl-0">
                  <div className="text-sm font-extrabold font-mono text-textPrimary flex sm:justify-end items-center gap-2">
                    <Calendar className="w-4 h-4 text-accentBlue" />
                    <span>{item.year}</span>
                  </div>
                  <div className={`text-sm font-extrabold font-mono ${colors.text} flex sm:justify-end items-center gap-2`}>
                    <Award className={`w-4 h-4 ${colors.text}`} />
                    <span>Grade : {item.grade}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
