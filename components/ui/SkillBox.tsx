'use client';

import { motion } from 'framer-motion';
import { SkillItem } from '@/lib/types';
import { getBrandIconConfig } from '@/lib/brandIcons';
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
  const brandConfig = getBrandIconConfig(skill.icon);
  const watermarkColor = brandConfig.getWatermarkColor(isDark);
  const viewBox = brandConfig.viewBox || '0 0 24 24';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group relative p-3.5 sm:p-4 rounded-2xl bg-surface/75 backdrop-blur-md border border-borderSubtle hover:border-accentBlue/60 hover:shadow-[0_0_20px_rgba(76,183,255,0.18)] transition-all duration-300 overflow-hidden cursor-pointer flex items-center justify-between"
    >
      {/* Left Small Container Box with Official Untinted App Logo */}
      <div className="flex items-center gap-3.5 relative z-10">
        {/* Small Container Box */}
        <div className="w-10 h-10 rounded-xl bg-surface/90 border border-borderSubtle/80 flex items-center justify-center p-2 shrink-0 shadow-sm group-hover:border-accentBlue/40 transition-colors">
          {brandConfig.renderLeftLogo(isDark)}
        </div>

        {/* Skill Name */}
        <span className="font-semibold text-textPrimary text-sm sm:text-base group-hover:text-accentBlue transition-colors">
          {skill.name}
        </span>
      </div>

      {/* Right Official Watermark Logo (Matches Official Application Brand Color Palette & ViewBox!) */}
      <svg
        viewBox={viewBox}
        className="absolute -right-3 -bottom-3 w-16 h-16 opacity-[0.10] group-hover:opacity-30 group-hover:scale-110 transition-all duration-300 pointer-events-none"
        style={{ fill: watermarkColor }}
      >
        <path d={brandConfig.watermarkPath} />
      </svg>
    </motion.div>
  );
}
