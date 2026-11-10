import { GoogleAnalytics } from '@next/third-parties/google';
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
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <EducationSection />
        <LeadershipSection />
        <ContactSection />
      </main>
      <Footer />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || 'G-QTBMWHEKPR'} />
    </>
  );
}
