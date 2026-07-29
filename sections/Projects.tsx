'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '@/lib/data';
import { GlassCard } from '@/components/ui/GlassCard';
import { trackProjectView } from '@/lib/gtag';
import { GithubIcon } from '@/components/ui/SocialIcons';
import {
  ExternalLink,
  Layers,
  Cpu,
  CheckCircle2,
  GitBranch,
  Server,
  Database,
  Search,
  ShieldCheck,
  Terminal
} from 'lucide-react';

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<string>(projectsData[0]?.id || 'flock');

  return (
    <section id="projects" className="py-20 px-4 max-w-7xl mx-auto z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Section Heading */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-accentGreen text-sm font-semibold">04.</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-textPrimary">Featured Projects</h2>
          <div className="h-px bg-borderSubtle flex-1 max-w-xs" />
        </div>

        {/* Project Selector Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {projectsData.map((project) => (
            <button
              key={project.id || project.title}
              onClick={() => {
                const projId = project.id || '';
                setActiveProject(projId);
                trackProjectView(projId);
              }}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all border flex items-center gap-2 ${
                activeProject === (project.id || '')
                  ? project.accent === 'blue'
                    ? 'bg-accentBlue text-bgPrimary border-accentBlue shadow-[0_0_20px_rgba(76,183,255,0.3)] scale-105'
                    : 'bg-accentGreen text-bgPrimary border-accentGreen shadow-[0_0_20px_rgba(168,243,109,0.3)] scale-105'
                  : 'bg-surface/80 border-borderSubtle text-textMuted hover:border-accentBlue hover:text-textPrimary'
              }`}
            >
              <Cpu className="w-4 h-4" />
              {project.title}
            </button>
          ))}
        </div>

        {/* Active Mini-Page Display */}
        {projectsData
          .filter((p) => p.id === activeProject)
          .map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <GlassCard accent={project.accent} className="p-8 sm:p-10">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6 pb-6 border-b border-borderSubtle">
                  <div>
                    <span className="text-xs font-mono text-accentBlue font-semibold uppercase tracking-wider block mb-1">
                      Mini-Page Deep Dive • {project.period}
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-textPrimary mb-1">
                      {project.title}
                    </h3>
                    <p className="text-lg font-medium text-textMuted">{project.subtitle}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-surface/90 border border-borderSubtle hover:border-accentBlue text-textPrimary hover:text-accentBlue transition-all flex items-center gap-2 text-sm font-semibold"
                    >
                      <GithubIcon className="w-4 h-4" /> Repository
                    </a>
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="mb-8">
                  <h4 className="text-xs font-mono uppercase text-textMuted mb-3">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg bg-surface/90 border border-borderSubtle text-accentBlue text-xs font-mono font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Architecture Diagram Visualization Box */}
                <div className="mb-8 p-5 rounded-xl bg-bgPrimary/60 border border-borderSubtle">
                  <h4 className="text-xs font-mono uppercase text-accentGreen mb-3 flex items-center gap-2">
                    <GitBranch className="w-4 h-4" /> Architecture Pipeline:
                  </h4>
                  <div className="p-4 rounded-lg bg-surface/80 border border-borderSubtle font-mono text-xs sm:text-sm text-textPrimary flex items-center justify-center text-center leading-relaxed">
                    {project.architectureSummary}
                  </div>
                </div>

                {/* Key Features Checklist */}
                <div>
                  <h4 className="text-xs font-mono uppercase text-textMuted mb-4">
                    Engineering Highlights:
                  </h4>
                  <div className="space-y-3">
                    {(project.keyFeatures || []).map((feat, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accentGreen shrink-0 mt-0.5" />
                        <p className="text-textMuted text-sm sm:text-base leading-relaxed">{feat}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
      </motion.div>
    </section>
  );
}
