'use client';

import { motion } from 'framer-motion';
import { getBrandIconConfig } from '@/lib/brandIcons';

const skillChainList = [
  { name: 'Python', icon: 'python' },
  { name: 'Go', icon: 'go' },
  { name: 'Java', icon: 'java' },
  { name: 'React', icon: 'react' },
  { name: 'Docker', icon: 'docker' },
  { name: 'Linux', icon: 'linux' },
  { name: 'Meilisearch', icon: 'search' },
  { name: 'Clerk', icon: 'shield-check' },
  { name: 'Wireshark', icon: 'network' },
  { name: 'Ghidra', icon: 'binary' },
  { name: 'SQLMap', icon: 'database' },
  { name: 'Radare2', icon: 'terminal' },
];

export function SkillChain() {
  return (
    <div className="w-full mt-3 overflow-hidden">
      <div className="w-full bg-surface/85 backdrop-blur-xl border border-accentBlue/30 rounded-none py-1.5 px-2 flex items-center shadow-md overflow-hidden">
        {/* Infinite Marquee Track */}
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 24,
          }}
          className="flex items-center gap-2 whitespace-nowrap"
        >
          {/* Double array for seamless loop */}
          {[...skillChainList, ...skillChainList].map((skill, index) => {
            const brandConfig = getBrandIconConfig(skill.icon);

            return (
              <div
                key={`${skill.name}-${index}`}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-surface/90 border border-borderSubtle/80 shadow-xs shrink-0 hover:border-accentBlue transition-colors group cursor-pointer"
              >
                {/* Small Icon */}
                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                  {brandConfig.renderLeftLogo(true)}
                </div>

                {/* Skill Title */}
                <span className="text-[11px] font-semibold text-textPrimary font-mono group-hover:text-accentBlue transition-colors">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
