'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '@/lib/data';
import { GithubIcon } from '@/components/ui/SocialIcons';
import { Code2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop & Tablet Viewports: Pin section and scrub horizontal track
      mm.add('(min-width: 640px)', () => {
        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 80);

        gsap.to(track, {
          x: getScrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${track.scrollWidth - window.innerWidth + window.innerHeight * 1.25}`,
            scrub: true,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="playground-section relative w-full overflow-hidden z-10 py-12 px-4 sm:px-6 max-w-7xl mx-auto"
    >
      <div className="mb-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 border-b border-borderSubtle/60 pb-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-textPrimary tracking-tight">
            Projects
          </h2>
        </div>
      </div>

      {/* Horizontal GSAP Pinned Track with Generous Start/End Horizontal Padding */}
      <div
        ref={trackRef}
        className="playground-track flex flex-nowrap gap-6 sm:gap-8 w-max pb-4 px-6 sm:px-12 lg:px-20"
      >
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="card w-[88vw] sm:w-[540px] lg:w-[640px] shrink-0 relative rounded-none bg-surface/90 backdrop-blur-xl border border-white/20 overflow-hidden p-5 sm:p-7 shadow-xl hover:border-white/60 transition-colors duration-300 flex flex-col justify-between group"
          >
            {/* Thin White Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] rounded-none bg-white/40 opacity-90" />

            <div className="space-y-4">
              {/* TOP ROW: Project Title (Green Text) & Github Repo Link */}
              <div className="flex items-center justify-between gap-3">
                {/* Project Name: GREEN text */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-accentGreen font-mono">
                  {project.title}
                </h3>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-none bg-bgPrimary/80 border border-borderSubtle/80 hover:border-accentBlue text-textPrimary hover:text-accentBlue transition-all flex items-center gap-1.5 text-xs font-mono font-bold hover:scale-105 shrink-0"
                >
                  <GithubIcon className="w-3.5 h-3.5" /> Github Repo
                </a>
              </div>

              {/* MIDDLE ROW: Tech Stack (Pills) */}
              <div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono text-textMuted font-bold mr-1 flex items-center gap-1">
                    <Code2 className="w-3 h-3 text-accentBlue" /> Tech Stack:
                  </span>
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-none bg-bgPrimary/70 border border-borderSubtle/60 text-accentBlue text-[11px] font-mono font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* HORIZONTAL DIVIDER LINE (Matching Handwritten Sketch) */}
              <div className="h-px bg-borderSubtle/60 w-full my-2.5" />

              {/* BOTTOM ROW: Description About Project */}
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-textPrimary font-semibold leading-relaxed">
                  {project.summary}
                </p>
                <div className="space-y-1.5 pt-0.5">
                  {(project.keyFeatures || []).map((feat, i) => (
                    <p
                      key={i}
                      className="text-[11.5px] sm:text-xs text-textMuted leading-relaxed pl-2.5 border-l-2 border-accentGreen/30"
                    >
                      {feat}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
