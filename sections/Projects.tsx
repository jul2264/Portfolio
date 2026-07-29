'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '@/lib/data';
import { GithubIcon } from '@/components/ui/SocialIcons';
import { Code2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Wheel Interception Hook: Intercept vertical wheel deltaY while over the section and scroll horizontally
  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const handleWheel = (e: WheelEvent) => {
      if (!e.deltaY) return;

      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      const maxScroll = container.scrollWidth - container.clientWidth;
      const currentScroll = container.scrollLeft;

      // Check if the container can scroll further in the current wheel scroll direction
      const canScrollRight = isScrollingDown && currentScroll < maxScroll - 4;
      const canScrollLeft = isScrollingUp && currentScroll > 4;

      if (canScrollRight || canScrollLeft) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;

        // Update active slide counter badge
        const newIdx = Math.round(container.scrollLeft / (container.clientWidth * 0.75));
        setActiveIndex(Math.min(Math.max(newIdx, 0), projectsData.length - 1));
      }
    };

    // passive: false is required to call e.preventDefault()
    section.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      section.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const scrollToSlide = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const scrollAmount = containerRef.current.clientWidth * 0.8;
    containerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, clientWidth } = containerRef.current;
    const newIdx = Math.round(scrollLeft / (clientWidth * 0.75));
    setActiveIndex(Math.min(Math.max(newIdx, 0), projectsData.length - 1));
  };

  return (
    <section ref={sectionRef} id="projects" className="py-12 px-4 max-w-6xl mx-auto z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Section Header with Playground Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-borderSubtle/60 pb-3 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-accentBlue/10 border border-accentBlue/30 text-accentBlue">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-textPrimary tracking-tight">
              Projects Playground
            </h2>
          </div>

          {/* Slide Indicator & Buttons */}
          <div className="flex items-center gap-3 font-mono text-xs text-textMuted">
            <span className="text-textPrimary font-bold bg-surface/90 px-3 py-1.5 rounded-lg border border-borderSubtle">
              0{activeIndex + 1} / 0{projectsData.length}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollToSlide('left')}
                className="p-2 rounded-xl bg-surface/90 border border-borderSubtle hover:border-accentBlue text-textMuted hover:text-accentBlue transition-all hover:scale-105"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToSlide('right')}
                className="p-2 rounded-xl bg-surface/90 border border-borderSubtle hover:border-accentBlue text-textMuted hover:text-accentBlue transition-all hover:scale-105"
                aria-label="Next Project"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Track Container with Mouse Wheel Interception */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="flex flex-nowrap gap-5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projectsData.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 60, scale: 0.98 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-[90%] sm:w-[540px] lg:w-[620px] shrink-0 snap-center relative rounded-2xl bg-surface/85 backdrop-blur-xl border border-borderSubtle p-5 sm:p-6 shadow-xl hover:border-accentGreen/50 transition-colors duration-300 flex flex-col justify-between group"
            >
              {/* Glowing Top Border Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-accentGreen via-accentBlue to-accentGreen opacity-85" />

              <div className="space-y-3.5">
                {/* TOP ROW: Project Title (Green Text) & Github Repo Button */}
                <div className="flex items-center justify-between gap-3">
                  {/* Project Name: GREEN text */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-accentGreen font-mono">
                    {project.title}
                  </h3>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-bgPrimary/80 border border-borderSubtle/80 hover:border-accentBlue text-textPrimary hover:text-accentBlue transition-all flex items-center gap-1.5 text-xs font-mono font-bold hover:scale-105 shrink-0"
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
                        className="px-2 py-0.5 rounded-md bg-bgPrimary/70 border border-borderSubtle/60 text-accentBlue text-[11px] font-mono font-semibold"
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
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
