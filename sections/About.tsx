'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { resumeData } from '@/lib/data';
import { trackResumeDownload } from '@/lib/gtag';
import { Download, CheckCircle2, Shield, Layers, Cpu, Server } from 'lucide-react';

const specializationsWithDetails = [
  {
    title: 'Full Stack',
    icon: Layers,
    description: 'Building reactive frontends with Next.js & React paired with Go and Django REST microservices.'
  },
  {
    title: 'Security',
    icon: Shield,
    description: 'Performing binary reverse engineering, OWASP vulnerability assessments, Wireshark & SQLMap analysis.'
  },
  {
    title: 'System Design',
    icon: Server,
    description: 'Architecting geo-spatial PostGIS layers, quantized Redis caching, and real-time WebSocket replicas.'
  },
  {
    title: 'Product Engineering',
    icon: Cpu,
    description: 'Creating end-to-end user-centric applications from code execution engines to AI audit pipelines.'
  }
];

export function AboutSection() {
  return (
    <section id="about" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto z-10 relative">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        {/* Section Heading */}
        <div className="flex items-center gap-3 mb-6 border-b border-borderSubtle/60 pb-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-textPrimary tracking-tight">About Me</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Bio Description */}
          <div className="lg:col-span-7 flex flex-col gap-5 text-textMuted leading-relaxed">
            <p className="text-lg text-textPrimary font-medium">
              Hello! I'm <span className="text-accentBlue font-bold">Julian Steve Anban</span>, a Computer Science Engineering student passionate about building resilient full-stack systems and exploring offensive & defensive cybersecurity analysis.
            </p>
            <p>
              I specialize in designing scalable web architectures (using Go, Next.js, Redis, PostgreSQL) and conducting security audits mapped to OWASP standards. Whether architecting real-time geo-spatial social engines like <span className="text-accentGreen font-semibold">Flock</span> or building multi-language code execution platforms like <span className="text-accentBlue font-semibold">AlgoNext</span>, I focus on clean code, system performance, and user privacy.
            </p>
            <p>
              When I'm not coding or performing packet-level analysis with Wireshark and Radare2, I lead creative design initiatives for campus organizations such as <span className="text-textPrimary font-semibold">L’Atelier Français</span> and <span className="text-textPrimary font-semibold">Placvs</span>.
            </p>

            <div className="pt-2">
              <a
                href="/Julian_Steve_A_Extended.pdf"
                download="Julian_Steve_A_Extended.pdf"
                onClick={trackResumeDownload}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface/90 border border-borderSubtle text-textPrimary hover:border-accentBlue hover:text-accentBlue transition-all shadow-md font-semibold text-sm hover:scale-105"
              >
                <Download className="w-4 h-4 text-accentBlue" /> Download Full Resume (PDF)
              </a>
            </div>
          </div>

          {/* Specialization Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {specializationsWithDetails.map((spec, idx) => {
              const IconComp = spec.icon;
              return (
                <GlassCard
                  key={spec.title}
                  accent={idx % 2 === 0 ? 'blue' : 'green'}
                  className="p-5 flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2 text-accentBlue">
                    <IconComp className="w-5 h-5" />
                    <h3 className="font-bold text-textPrimary">{spec.title}</h3>
                  </div>
                  <p className="text-xs text-textMuted leading-relaxed">{spec.description}</p>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
