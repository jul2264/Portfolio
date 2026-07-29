'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { resumeData } from '@/lib/data';
import { Calendar, MapPin } from 'lucide-react';

function TypewriterLeadDescription({ text }: { text: string }) {
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

  return (
    <div ref={containerRef} className="text-xs sm:text-sm text-textMuted leading-relaxed min-h-[60px]">
      {currentText}
      {displayedLength < text.length && (
        <span className="inline-block w-1 h-3.5 ml-0.5 bg-accentGreen align-middle animate-pulse" />
      )}
    </div>
  );
}

export function LeadershipSection() {
  return (
    <section id="leadership" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Section Heading */}
        <div className="flex items-center gap-3 mb-6 border-b border-borderSubtle/60 pb-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-textPrimary tracking-tight">
            Leadership & Creative Direction
          </h2>
        </div>

        {/* 2-Column Futuristic HUD Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {resumeData.leadership.map((item, idx) => (
            <motion.div
              key={item.organization}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl bg-surface/85 backdrop-blur-xl border border-white/20 overflow-hidden p-5 sm:p-6 shadow-xl hover:border-white/60 transition-colors duration-300 flex flex-col justify-between group"
            >
              {/* Thin Blue Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] rounded-t-2xl bg-accentBlue/40 opacity-90" />

              <div className="space-y-4">
                {/* TOP ROW: Role (White -> Blue on Hover) & Organization (Green) */}
                <div className="flex flex-col justify-between gap-1 pb-3 border-b border-borderSubtle/50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-extrabold text-textPrimary hover:text-accentBlue transition-colors duration-200 cursor-default">
                      {item.role}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-accentGreen">
                      {item.organization}
                    </span>
                    <span className="flex items-center gap-1 text-textMuted">
                      <Calendar className="w-3.5 h-3.5 text-accentBlue" />
                      {item.period}
                    </span>
                  </div>
                </div>

                {/* BOTTOM ROW: Typewriter Animated Description */}
                <div className="pt-1">
                  {item.highlights.map((bullet, i) => (
                    <TypewriterLeadDescription key={i} text={bullet} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
