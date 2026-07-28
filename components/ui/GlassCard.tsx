'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  accent?: 'blue' | 'green' | 'none';
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({
  children,
  accent = 'none',
  className = '',
  hoverEffect = true,
  ...props
}: GlassCardProps) {
  const accentGlowClass =
    accent === 'blue'
      ? 'hover:border-accentBlue/50 hover:shadow-[0_0_25px_rgba(76,183,255,0.18)]'
      : accent === 'green'
      ? 'hover:border-accentGreen/50 hover:shadow-[0_0_25px_rgba(168,243,109,0.18)]'
      : 'hover:border-accentBlue/30';

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`relative rounded-2xl bg-surface/75 backdrop-blur-xl border border-borderSubtle transition-all duration-300 shadow-lg p-6 ${accentGlowClass} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
