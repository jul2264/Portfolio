'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { resumeData } from '@/lib/data';
import { trackContactClick } from '@/lib/gtag';
import { Mail, Send, Sparkles, Phone, Copy, Check, ExternalLink, RefreshCw } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/SocialIcons';
import confetti from 'canvas-confetti';

export function ContactSection() {
  const { theme } = useTheme();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const targetEmail = resumeData.personal.email || 'juliansteve.anban@gmail.com';

  const buttonThemeClasses = theme === 'light'
    ? 'text-white bg-black hover:bg-neutral-800'
    : 'text-black bg-white hover:bg-slate-200';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(targetEmail);
    setCopiedEmail(true);
    trackContactClick('Copy Email');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(formState.subject.trim() || 'Direct Inquiry from Portfolio');
    const body = encodeURIComponent(
      `Hi Julian,\n\n${formState.message.trim()}\n\n---\nSender Details:\nName: ${formState.name.trim()}\nEmail: ${formState.email.trim()}`
    );
    return `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  };

  const getGmailWebUrl = () => {
    const subject = encodeURIComponent(formState.subject.trim() || 'Direct Inquiry from Portfolio');
    const body = encodeURIComponent(
      `Hi Julian,\n\n${formState.message.trim()}\n\n---\nSender Details:\nName: ${formState.name.trim()}\nEmail: ${formState.email.trim()}`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${subject}&body=${body}`;
  };

  const handleCopyFormattedMessage = () => {
    const formatted = `To: ${targetEmail}\nSubject: ${formState.subject}\n\nHi Julian,\n\n${formState.message}\n\n---\nSender Details:\nName: ${formState.name}\nEmail: ${formState.email}`;
    navigator.clipboard.writeText(formatted);
    setCopiedMessage(true);
    trackContactClick('Copy Formatted Message');
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    trackContactClick('Form Submit Mailto');

    // Trigger native mail app with prefilled details
    const mailtoUrl = getMailtoUrl();
    window.location.href = mailtoUrl;

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const contactCards = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Mail',
      value: targetEmail,
      href: `mailto:${targetEmail}`,
      onClick: () => trackContactClick('Direct Mailto Link'),
      accent: 'green' as const,
      extra: (
        <button
          onClick={(e) => { e.preventDefault(); handleCopyEmail(); }}
          className="absolute top-2 right-2 p-1 rounded-none bg-surface/80 border border-borderSubtle text-textMuted hover:text-accentGreen hover:border-accentGreen transition-colors flex items-center gap-1 text-[9px] font-mono"
          title="Copy Email"
        >
          {copiedEmail ? <Check className="w-2.5 h-2.5 text-accentGreen" /> : <Copy className="w-2.5 h-2.5" />}
          {copiedEmail ? 'Copied!' : 'Copy'}
        </button>
      ),
    },
    {
      icon: <LinkedinIcon className="w-6 h-6" />,
      label: 'LinkedIn',
      value: 'juliansteve',
      href: resumeData.personal.linkedin,
      onClick: () => trackContactClick('Direct LinkedIn Card'),
      accent: 'blue' as const,
    },
    {
      icon: <GithubIcon className="w-6 h-6" />,
      label: 'GitHub',
      value: 'jul2264',
      href: resumeData.personal.github,
      onClick: () => trackContactClick('Direct GitHub Card'),
      accent: 'blue' as const,
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: 'Phone No.',
      value: `+91 ${resumeData.personal.phone}`,
      href: `tel:+91${resumeData.personal.phone}`,
      onClick: () => trackContactClick('Phone Link'),
      accent: 'green' as const,
    },
  ];

  const accentStyles = {
    green: {
      iconBg: 'bg-accentGreen/10 text-accentGreen border-accentGreen/20 group-hover:bg-accentGreen/20',
      hoverBorder: 'hover:border-accentGreen/60',
      valueColor: 'text-accentGreen',
      topLine: 'bg-accentGreen/30',
    },
    blue: {
      iconBg: 'bg-accentBlue/10 text-accentBlue border-accentBlue/20 group-hover:bg-accentBlue/20',
      hoverBorder: 'hover:border-accentBlue/60',
      valueColor: 'text-accentBlue',
      topLine: 'bg-white/30',
    },
  };

  return (
    <section id="contact" className="py-12 px-4 sm:px-6 max-w-7xl mx-auto z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-3 mb-6 border-b border-borderSubtle/60 pb-3">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl font-extrabold text-textPrimary tracking-tight"
          >
            Let&apos;s Collaborate!
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-textMuted text-sm sm:text-base font-light mb-6"
        >
          Send a direct message prefilled to <span className="font-mono text-accentGreen font-medium">{targetEmail}</span> or reach out on socials.
        </motion.p>

        {/* ─── Two-Column Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 items-start">

          {/* LEFT: 2×2 Contact Icon Grid */}
          <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
            {contactCards.map((card, idx) => {
              const styles = accentStyles[card.accent];
              return (
                <motion.a
                  key={card.label}
                  href={card.href}
                  target={card.label !== 'Mail' && card.label !== 'Phone No.' ? '_blank' : undefined}
                  rel={card.label !== 'Mail' && card.label !== 'Phone No.' ? 'noopener noreferrer' : undefined}
                  onClick={card.onClick}
                  initial={{ opacity: 0, y: 16, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: idx * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className={`relative w-[145px] h-[115px] sm:w-[165px] sm:h-[130px] rounded-none bg-surface/85 backdrop-blur-xl border border-white/20 overflow-hidden p-4 shadow-lg ${styles.hoverBorder} transition-all duration-300 flex flex-col justify-between group cursor-pointer`}
                >
                  {/* Top Accent Line */}
                  <div className={`absolute top-0 left-0 right-0 h-[1px] ${styles.topLine}`} />

                  {/* Icon */}
                  <div className={`p-3 rounded-none border w-fit ${styles.iconBg} transition-colors`}>
                    {card.icon}
                  </div>

                  {/* Label & Value */}
                  <div>
                    <p className="text-xs font-bold text-textPrimary mb-0.5">{card.label}</p>
                    <p className={`text-[9px] sm:text-[10px] font-mono ${styles.valueColor} truncate`}>{card.value}</p>
                  </div>

                  {/* Extra (e.g. copy button) */}
                  {card.extra}
                </motion.a>
              );
            })}
          </div>

          {/* RIGHT: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-none bg-surface/85 backdrop-blur-xl border border-accentGreen/20 overflow-hidden p-5 sm:p-6 shadow-xl hover:border-accentGreen/50 transition-colors duration-300"
          >
            {/* Top Green Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-accentGreen/30" />

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 flex flex-col items-center text-center gap-4"
              >
                <div className="p-3 rounded-none bg-accentGreen/10 border border-accentGreen/30 text-accentGreen">
                  <Sparkles className="w-8 h-8 animate-bounce" />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-textPrimary mb-1">Email Draft Created!</h3>
                  <p className="text-textMuted text-xs max-w-md">
                    Launching your default mail client with recipient <span className="text-accentGreen font-mono font-semibold">{targetEmail}</span>, subject, and message prefilled.
                  </p>
                </div>

                {/* Option Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-md pt-2">
                  <a
                    href={getMailtoUrl()}
                    className="px-4 py-2.5 text-xs font-mono font-bold bg-accentGreen/20 hover:bg-accentGreen/30 border border-accentGreen/40 text-accentGreen flex items-center justify-center gap-2 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" /> Re-open Mail App
                  </a>

                  <a
                    href={getGmailWebUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 text-xs font-mono font-bold bg-accentBlue/20 hover:bg-accentBlue/30 border border-accentBlue/40 text-accentBlue flex items-center justify-center gap-2 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Open in Gmail Web
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyFormattedMessage}
                    className="px-4 py-2.5 text-xs font-mono font-bold bg-surface border border-borderSubtle hover:border-textPrimary text-textPrimary flex items-center justify-center gap-2 transition-colors"
                  >
                    {copiedMessage ? <Check className="w-3.5 h-3.5 text-accentGreen" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedMessage ? 'Copied to Clipboard!' : 'Copy Formatted Text'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-4 py-2.5 text-xs font-mono font-bold bg-surface border border-borderSubtle hover:border-textPrimary text-textMuted hover:text-textPrimary flex items-center justify-center gap-2 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Send Another Message
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name + Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <label className="block text-[10px] font-mono uppercase text-textMuted mb-1.5 tracking-wider">
                      Your Name <span className="text-accentGreen">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3 py-2.5 rounded-none bg-surface/90 border border-borderSubtle focus:border-accentGreen text-textPrimary text-xs placeholder:text-textMuted/50 focus:outline-none transition-colors"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                  >
                    <label className="block text-[10px] font-mono uppercase text-textMuted mb-1.5 tracking-wider">
                      Your Email <span className="text-accentGreen">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-3 py-2.5 rounded-none bg-surface/90 border border-borderSubtle focus:border-accentGreen text-textPrimary text-xs placeholder:text-textMuted/50 focus:outline-none transition-colors"
                    />
                  </motion.div>
                </div>

                {/* Subject */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <label className="block text-[10px] font-mono uppercase text-textMuted mb-1.5 tracking-wider">
                    Subject <span className="text-accentGreen">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="Software Engineering Inquiry / Collaboration"
                    className="w-full px-3 py-2.5 rounded-none bg-surface/90 border border-borderSubtle focus:border-accentGreen text-textPrimary text-xs placeholder:text-textMuted/50 focus:outline-none transition-colors"
                  />
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                >
                  <label className="block text-[10px] font-mono uppercase text-textMuted mb-1.5 tracking-wider">
                    Message <span className="text-accentGreen">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Hi Julian, I'd like to discuss an engineering role or security collaboration project..."
                    className="w-full px-3 py-2.5 rounded-none bg-surface/90 border border-borderSubtle focus:border-accentGreen text-textPrimary text-xs placeholder:text-textMuted/50 focus:outline-none transition-colors resize-none"
                  />
                </motion.div>

                {/* Helper notice */}
                <p className="text-[10px] font-mono text-textMuted/70 flex items-center gap-1">
                  <Mail className="w-3 h-3 text-accentGreen inline" /> Submitting will launch your email client with message prefilled to <span className="text-accentGreen font-semibold">{targetEmail}</span>.
                </p>

                {/* Send Button */}
                <motion.button
                  type="submit"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-none font-bold transition-all shadow-lg flex items-center justify-center gap-2 text-xs ${buttonThemeClasses}`}
                >
                  <Send className="w-3.5 h-3.5" /> Send Message via Email
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

