'use client';

import { motion } from 'framer-motion';
import { SkillItem } from '@/lib/types';
import * as SimpleIcons from 'simple-icons';
import {
  Code2,
  Terminal,
  Database,
  Shield,
  Layers,
  Cpu,
  Globe,
  FileCode,
  Network,
  Binary,
  Search,
  CheckCircle2,
  Server,
  Box,
  Braces
} from 'lucide-react';

interface SkillBoxProps {
  skill: SkillItem;
  index: number;
}

// Fallback Lucide Icon Mapping for Security & Dev Tools
const iconMap: Record<string, React.ElementType> = {
  python: Code2,
  go: Terminal,
  java: Cpu,
  cplusplus: Braces,
  c: Code2,
  javascript: FileCode,
  typescript: FileCode,
  html5: Globe,
  css3: Layers,
  mysql: Database,
  react: Layers,
  nextjs: Globe,
  django: Server,
  nodejs: Server,
  redis: Database,
  docker: Box,
  git: Code2,
  linux: Terminal,
  vercel: Globe,
  search: Search,
  'shield-check': CheckCircle2,
  network: Network,
  'shield-alert': Shield,
  binary: Binary,
  database: Database,
  terminal: Terminal
};

// Helper to get SimpleIcon SVG path if available
function getSimpleIconSvg(iconSlug: string): string | null {
  const slugKey = ('si' + iconSlug.charAt(0).toUpperCase() + iconSlug.slice(1)).replace(/[^a-zA-Z0-9]/g, '');
  const iconObj = (SimpleIcons as unknown as Record<string, { path: string }>)[slugKey];
  return iconObj ? iconObj.path : null;
}

export function SkillBox({ skill, index }: SkillBoxProps) {
  const IconComponent = iconMap[skill.icon] || Code2;
  const svgPath = getSimpleIconSvg(skill.icon);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ y: -5, scale: 1.03 }}
      className="group relative p-4 rounded-xl bg-surface/80 backdrop-blur-md border border-borderSubtle hover:border-accentBlue/60 hover:shadow-[0_0_20px_rgba(76,183,255,0.2)] transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Transparent Watermark Background Icon */}
      {svgPath ? (
        <svg
          viewBox="0 0 24 24"
          className="absolute -right-3 -bottom-3 w-16 h-16 fill-current text-accentBlue opacity-[0.08] group-hover:opacity-25 group-hover:scale-110 transition-all duration-300 pointer-events-none"
        >
          <path d={svgPath} />
        </svg>
      ) : (
        <IconComponent className="absolute -right-3 -bottom-3 w-16 h-16 text-accentGreen opacity-[0.08] group-hover:opacity-25 group-hover:scale-110 transition-all duration-300 pointer-events-none" />
      )}

      {/* Front Content */}
      <div className="flex items-center gap-3 relative z-10">
        <div className="p-2 rounded-lg bg-surface/90 border border-borderSubtle text-accentBlue group-hover:text-accentGreen group-hover:border-accentGreen/40 transition-colors">
          <IconComponent className="w-5 h-5" />
        </div>
        <span className="font-semibold text-textPrimary text-sm sm:text-base group-hover:text-accentBlue transition-colors">
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
}
