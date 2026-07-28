import { DynamicBackground } from '@/components/canvas/DynamicBackground';
import { Navbar } from '@/components/ui/Navbar';
import { HeroSection } from '@/sections/Hero';
import { AboutSection } from '@/sections/About';
import { EducationSection } from '@/sections/Education';
import { ExperienceSection } from '@/sections/Experience';
import { ProjectsSection } from '@/sections/Projects';
import { SkillsSection } from '@/sections/Skills';
import { LeadershipSection } from '@/sections/Leadership';
import { ContactSection } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bgPrimary text-textPrimary selection:bg-accentBlue selection:text-bgPrimary overflow-x-hidden">
      {/* Interactive Mouse-Responsive Full-Page Canvas Background */}
      <DynamicBackground />

      {/* Sticky Navigation Header */}
      <Navbar />

      {/* Page Sections */}
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <LeadershipSection />
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
