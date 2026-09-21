'use client';

import React, { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  accent?: 'blue' | 'green' | 'default';
}

export function SectionWrapper({
  children,
  id,
  className = '',
  accent = 'blue',
}: SectionWrapperProps) {
  const accentGlow =
    accent === 'green'
      ? 'hover:shadow-[0_20px_50px_rgba(255,255,255,0.06)] hover:border-white/20'
      : accent === 'blue'
      ? 'hover:shadow-[0_20px_50px_rgba(255,255,255,0.06)] hover:border-white/20'
      : 'hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-borderSubtle';

  return (
    <div
      id={id}
      className={`group/section relative transition-all duration-500 ease-out hover:-translate-y-1.5 hover:z-20 ${className}`}
    >
      {/* Clear Elevation Border & Shadow Effect - No backdrop-blur */}
      <div
        className={`pointer-events-none absolute -inset-2 sm:-inset-3 rounded-none border border-transparent opacity-0 group-hover/section:opacity-100 transition-all duration-500 ${accentGlow}`}
      />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
