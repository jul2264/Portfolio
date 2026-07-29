'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '@/lib/data';
import { GlassCard } from '@/components/ui/GlassCard';
import { trackContactClick, trackResumeDownload } from '@/lib/gtag';
import { Mail, FileText, MapPin, Copy, Check, Send, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons';
import confetti from 'canvas-confetti';

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(resumeData.personal.email);
    setCopiedEmail(true);
    trackContactClick('Copy Email');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    trackContactClick('Form Submit');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 px-4 max-w-6xl mx-auto z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Centered Heading Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-accentBlue text-sm font-semibold uppercase tracking-wider block mb-2">
            07. What's Next?
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-textPrimary mb-4">
            Let's Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-accentBlue to-accentGreen">Something Together</span>
          </h2>
          <p className="text-textMuted text-base sm:text-lg">
            I'm currently looking for full-stack engineering and cybersecurity opportunities. Whether you have a project idea, a question, or just want to connect, feel free to reach out!
          </p>
        </div>

        {/* Direct Action Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {/* Email Direct Option */}
          <GlassCard accent="blue" className="p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-accentBlue/10 text-accentBlue border border-accentBlue/30">
                <Mail className="w-5 h-5" />
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 rounded-lg bg-surface/90 border border-borderSubtle text-textMuted hover:text-accentBlue hover:border-accentBlue transition-colors flex items-center gap-1 text-xs font-mono"
                title="Copy Email Address"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-accentGreen" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedEmail ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div>
              <h3 className="font-bold text-textPrimary text-sm mb-1">Direct Email</h3>
              <a
                href={`mailto:${resumeData.personal.email}`}
                onClick={() => trackContactClick('Direct Mailto Link')}
                className="text-xs font-mono text-accentBlue hover:underline truncate block"
              >
                {resumeData.personal.email}
              </a>
            </div>
          </GlassCard>

          {/* LinkedIn Direct Option */}
          <GlassCard accent="green" className="p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-accentGreen/10 text-accentGreen border border-accentGreen/30">
                <LinkedinIcon className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-textPrimary text-sm mb-1">LinkedIn Profile</h3>
              <a
                href={resumeData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactClick('Direct LinkedIn Card')}
                className="text-xs font-mono text-accentGreen hover:underline block truncate"
              >
                linkedin.com/in/juliansteve
              </a>
            </div>
          </GlassCard>

          {/* GitHub Direct Option */}
          <GlassCard accent="blue" className="p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-accentBlue/10 text-accentBlue border border-accentBlue/30">
                <GithubIcon className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-textPrimary text-sm mb-1">GitHub Repositories</h3>
              <a
                href={resumeData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactClick('Direct GitHub Card')}
                className="text-xs font-mono text-accentBlue hover:underline block truncate"
              >
                github.com/jul2264
              </a>
            </div>
          </GlassCard>

          {/* Resume PDF Direct Download */}
          <GlassCard accent="green" className="p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-accentGreen/10 text-accentGreen border border-accentGreen/30">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-textPrimary text-sm mb-1">PDF Resume</h3>
              <a
                href="/Julian_Steve_A_Extended.pdf"
                download="Julian_Steve_A_Extended.pdf"
                onClick={trackResumeDownload}
                className="text-xs font-mono text-accentGreen hover:underline block"
              >
                Download PDF File ↓
              </a>
            </div>
          </GlassCard>
        </div>

        {/* Interactive Contact Form */}
        <GlassCard accent="blue" className="p-8 sm:p-10 max-w-3xl mx-auto">
          {submitted ? (
            <div className="text-center py-10 flex flex-col items-center gap-3">
              <Sparkles className="w-12 h-12 text-accentGreen animate-bounce" />
              <h3 className="text-2xl font-bold text-textPrimary">Message Sent Successfully!</h3>
              <p className="text-textMuted text-sm">Thank you for reaching out. I'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-textMuted mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl bg-surface/90 border border-borderSubtle focus:border-accentBlue text-textPrimary placeholder:text-textMuted/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-textMuted mb-2">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-surface/90 border border-borderSubtle focus:border-accentBlue text-textPrimary placeholder:text-textMuted/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-textMuted mb-2">Subject</label>
                <input
                  type="text"
                  required
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  placeholder="Software Engineering Inquiry"
                  className="w-full px-4 py-3 rounded-xl bg-surface/90 border border-borderSubtle focus:border-accentBlue text-textPrimary placeholder:text-textMuted/50 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-textMuted mb-2">Message</label>
                <textarea
                  rows={5}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Hi Julian, I'd like to discuss an engineering role..."
                  className="w-full px-4 py-3 rounded-xl bg-surface/90 border border-borderSubtle focus:border-accentBlue text-textPrimary placeholder:text-textMuted/50 focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-bold text-bgPrimary bg-gradient-to-r from-accentBlue to-accentGreen hover:opacity-90 transition-all shadow-[0_0_25px_rgba(76,183,255,0.3)] flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" /> Send Direct Message
              </button>
            </form>
          )}
        </GlassCard>
      </motion.div>
    </section>
  );
}
