'use client';

import { motion } from 'framer-motion';
import { SkillItem } from '@/lib/types';
import { getBrandIconData } from '@/lib/brandIcons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface SkillBoxProps {
  skill: SkillItem;
  index: number;
}

export function SkillBox({ skill, index }: SkillBoxProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || theme !== 'light';
  const brandData = getBrandIconData(skill.icon, isDark);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ y: -5, scale: 1.03 }}
      className="group relative p-4 rounded-xl bg-surface/80 backdrop-blur-md border border-borderSubtle hover:border-accentBlue/60 hover:shadow-[0_0_20px_rgba(76,183,255,0.18)] transition-all duration-300 overflow-hidden cursor-pointer flex items-center justify-between"
    >
      {/* Official Transparent Brand Icon + Skill Name */}
      <div className="flex items-center gap-3.5 relative z-10">
        {/* Official Company App Icon (Untinted Original Brand Color) */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0">
          <svg
            viewBox="0 0 24 24"
            className="w-full h-full transition-transform duration-300 group-hover:scale-110"
            style={{ fill: brandData.brandColor }}
          >
            <path d={brandData.path} />
          </svg>
        </div>

        {/* Skill Name */}
        <span className="font-semibold text-textPrimary text-sm sm:text-base group-hover:text-accentBlue transition-colors">
          {skill.name}
        </span>
      </div>

      {/* Transparent Background Watermark Icon */}
      <svg
        viewBox="0 0 24 24"
        className="absolute -right-3 -bottom-3 w-16 h-16 opacity-[0.07] group-hover:opacity-25 group-hover:scale-110 transition-all duration-300 pointer-events-none"
        style={{ fill: brandData.brandColor }}
      >
        <path d={brandData.path} />
      </svg>
    </motion.div>
  );
}
