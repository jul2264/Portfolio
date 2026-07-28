'use client';

import { motion } from 'framer-motion';
import { skillsData } from '@/lib/data';
import { SkillBox } from '@/components/ui/SkillBox';
import { Code2, Layers, Cpu, ShieldCheck } from 'lucide-react';

const categories = [
  { title: 'Languages', data: skillsData.languages, icon: Code2 },
  { title: 'Frameworks', data: skillsData.frameworks, icon: Layers },
  { title: 'Developer Tools', data: skillsData.developerTools, icon: Cpu },
  { title: 'Security Tools', data: skillsData.securityTools, icon: ShieldCheck },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4 max-w-7xl mx-auto z-10 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        {/* Section Heading */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-accentBlue text-sm font-semibold">05.</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-textPrimary">Technical Skills</h2>
          <div className="h-px bg-borderSubtle flex-1 max-w-xs" />
        </div>

        {/* Categorized Skill Box Grids */}
        <div className="space-y-12">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <div key={cat.title}>
                <div className="flex items-center gap-2 mb-5">
                  <div className="p-1.5 rounded-lg bg-accentBlue/10 text-accentBlue">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-textPrimary">{cat.title}</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {cat.data.map((skill, idx) => (
                    <SkillBox key={skill.name} skill={skill} index={idx} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
