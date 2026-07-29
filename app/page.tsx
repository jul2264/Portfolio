import { DynamicBackground } from '@/components/canvas/DynamicBackground';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { Navbar } from '@/components/ui/Navbar';
import { HeroSection } from '@/sections/Hero';
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
      {/* Minimalist 2-3s System Loading Screen */}
      <LoadingScreen />

      {/* Interactive Mouse-Responsive Full-Page Canvas Background */}
      <DynamicBackground />

      {/* Sticky Navigation Header */}
      <Navbar />

      {/* Hero & About Me Section */}
      <HeroSection />

      {/* Technical Skills Section */}
      <SkillsSection />

      {/* Education Section */}
      <EducationSection />

      {/* Cybersecurity Experience */}
      <ExperienceSection />

      {/* Featured Projects */}
      <ProjectsSection />

      {/* Leadership & Creative Work */}
      <LeadershipSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
