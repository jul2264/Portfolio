'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING SYSTEMS...');

  useEffect(() => {
    // Global Preloading of heavy assets during the loading screen phase
    const preloadAssets = [
      '/julian_photo.jpg',
      '/Julian_Steve_A_Extended.pdf',
    ];

    preloadAssets.forEach((url) => {
      if (url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.webp')) {
        const img = new Image();
        img.src = url;
      } else {
        fetch(url, { mode: 'no-cors' }).catch(() => {});
      }
    });

    // 2.2s progress duration for clean 2-3s total loading window
    const duration = 2200;
    const intervalTime = 30;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 30 && next < 70) {
          setStatusText('LOADING DATA & PRELOADING ASSETS...');
        } else if (next >= 70 && next < 95) {
          setStatusText('VERIFYING SECURITY & PORTFOLIO MODULES...');
        } else if (next >= 95) {
          setStatusText('SYSTEM READY // WELCOME');
        }

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
            // Dispatch portfolio-loaded AFTER loader fade-out curtain completes (600ms transition)
            setTimeout(() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new Event('portfolio-loaded'));
              }
            }, 500);
          }, 300);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-bgPrimary text-textPrimary flex flex-col items-center justify-center p-6 selection:bg-accentBlue selection:text-bgPrimary pointer-events-auto"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute w-96 h-96 bg-accentBlue/10 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-sm flex flex-col items-center text-center z-10"
          >
            {/* Minimalist Terminal Icon Badge */}
            <div className="w-14 h-14 rounded-2xl bg-surface/90 border border-borderSubtle flex items-center justify-center text-accentBlue mb-6 shadow-2xl relative group">
              <div className="absolute inset-0 rounded-2xl bg-accentBlue/10 blur-sm pointer-events-none" />
              <Terminal className="w-6 h-6 text-accentBlue relative z-10" />
            </div>

            {/* Title / Name */}
            <h2 className="text-sm font-mono uppercase tracking-widest text-textMuted font-semibold mb-1">
              JULIAN STEVE ANBAN
            </h2>
            <p className="text-xs font-mono text-accentBlue font-bold tracking-wider mb-6">
              PORTFOLIO ARCHITECTURE
            </p>

            {/* Minimalist Progress Line */}
            <div className="w-full h-1.5 bg-surface border border-borderSubtle/60 rounded-full overflow-hidden relative mb-4 shadow-inner">
              <motion.div
                className="h-full bg-accentBlue rounded-full shadow-[0_0_12px_rgba(76,183,255,0.6)]"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>

            {/* Status & Counter Row */}
            <div className="w-full flex items-center justify-between font-mono text-[11px] text-textMuted">
              <span className="truncate pr-2">{statusText}</span>
              <span className="font-bold text-accentGreen shrink-0">{Math.round(progress)}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
