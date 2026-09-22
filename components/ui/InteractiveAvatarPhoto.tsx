'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, RotateCcw, Sparkles, MessageSquare, CornerUpLeft } from 'lucide-react';
import { Avatar3DCanvas } from '@/components/canvas/Avatar3DCanvas';
import { SpeechLipSyncEngine } from '@/lib/speechLipSync';

interface InteractiveAvatarPhotoProps {
  photoSrc?: string;
  avatarSrc?: string;
  alt?: string;
  className?: string;
}

const introSpeechText =
  "Hi! I'm Julian Steve Anban. I'm a Computer Science undergraduate at SRM University with a passion for cybersecurity, real-time distributed systems, and product engineering. Welcome to my portfolio!";

export function InteractiveAvatarPhoto({
  photoSrc = '/julian_photo.jpg',
  avatarSrc = '/julian_avatar.jpg',
  alt = 'Julian Steve Anban',
  className = '',
}: InteractiveAvatarPhotoProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const lipSyncEngineRef = useRef<SpeechLipSyncEngine | null>(null);

  // Initialize Speech Lip-Sync Engine
  if (!lipSyncEngineRef.current) {
    lipSyncEngineRef.current = new SpeechLipSyncEngine();
  }

  // Initial load animation trigger
  useEffect(() => {
    const handleLoaded = () => setTimeout(() => setIsLoaded(true), 150);
    if (typeof window !== 'undefined') {
      window.addEventListener('portfolio-loaded', handleLoaded);
    }
    const fallbackTimer = setTimeout(() => setIsLoaded(true), 2500);

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('portfolio-loaded', handleLoaded);
      }
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Stop any active speech synthesis
  const stopSpeech = useCallback(() => {
    lipSyncEngineRef.current?.stop();
    setIsSpeaking(false);
  }, []);

  // Play synthesized speech and phoneme-driven lip-sync
  const speakIntro = useCallback(() => {
    if (!lipSyncEngineRef.current) return;

    lipSyncEngineRef.current.setMuted(isMuted);
    lipSyncEngineRef.current.speak({
      text: introSpeechText,
      onStart: () => {
        setIsSpeaking(true);
      },
      onEnd: () => {
        setIsSpeaking(false);
      },
      onError: () => {
        setIsSpeaking(false);
      },
    });
  }, [isMuted]);

  // Synchronized typewriter effect when flipped
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isFlipped) {
      setDisplayedText('');
      let index = 0;
      const speed = 28; // ms per character

      timer = setInterval(() => {
        if (index < introSpeechText.length) {
          setDisplayedText(introSpeechText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, speed);

      // Trigger 3D avatar lip-sync & speech
      speakIntro();
    } else {
      stopSpeech();
      setDisplayedText('');
    }

    return () => {
      clearInterval(timer);
      stopSpeech();
    };
  }, [isFlipped, speakIntro, stopSpeech]);

  // Handle card flip toggle
  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopSpeech();
    setDisplayedText('');
    let index = 0;
    const speed = 28;
    const timer = setInterval(() => {
      if (index < introSpeechText.length) {
        setDisplayedText(introSpeechText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    speakIntro();
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMute = !isMuted;
    setIsMuted(newMute);
    lipSyncEngineRef.current?.setMuted(newMute);
  };

  return (
    <div className={`relative w-full max-w-[250px] sm:max-w-[280px] lg:max-w-full aspect-[4/4.2] ${className}`}>
      {/* 3D Perspective Card Container */}
      <div
        className="w-full h-full cursor-pointer select-none [perspective:1000px]"
        onClick={toggleFlip}
        title={isFlipped ? 'Click to flip back to photo' : 'Click to meet 3D AI Avatar'}
      >
        <motion.div
          className="relative w-full h-full [transform-style:preserve-3d] transition-all duration-700 ease-out"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* ================= FRONT SIDE: REAL PHOTO ================= */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-none overflow-hidden border-2 border-borderSubtle bg-surface/90 shadow-xl group">
            {/* Real Photograph */}
            <div className="relative w-full h-full">
              <img
                src={photoSrc}
                alt={alt}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Subtle Interactive Flip Badge */}
            <div className="absolute top-2.5 right-2.5 z-20 px-2 py-0.5 rounded-none bg-surface/90 backdrop-blur-md border border-accentBlue/40 text-[10px] sm:text-[11px] font-mono text-accentBlue flex items-center gap-1 shadow-md group-hover:border-accentBlue group-hover:bg-accentBlue/10 transition-all">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>Click for 3D Avatar</span>
            </div>

            {/* Bottom Name Box */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2 rounded-none bg-surface/90 backdrop-blur-md border border-borderSubtle/80 flex items-center justify-between z-20">
              <h3 className="text-xs sm:text-sm font-bold text-textPrimary">
                Julian Steve Anban
              </h3>
              <span className="text-[10px] font-mono text-textMuted flex items-center gap-1">
                <MessageSquare className="w-3 h-3 text-accentGreen" />
                <span>Talk</span>
              </span>
            </div>
          </div>

          {/* ================= BACK SIDE: 3D TALKING AVATAR ================= */}
          <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-none overflow-hidden border-2 border-accentBlue/50 bg-[#070b18] shadow-2xl flex flex-col justify-between">
            {/* 3D WebGL Avatar Canvas */}
            <div className="relative w-full h-full overflow-hidden">
              {lipSyncEngineRef.current && (
                <Avatar3DCanvas
                  lipSyncEngine={lipSyncEngineRef.current}
                  isActive={isFlipped}
                  isSpeaking={isSpeaking}
                  className="w-full h-full"
                />
              )}

              {/* Ambient Glowing Halo when speaking */}
              <AnimatePresence>
                {isSpeaking && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    exit={{ opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1.8 }}
                    className="absolute inset-0 bg-gradient-to-t from-accentBlue/25 via-transparent to-accentBlue/10 pointer-events-none"
                  />
                )}
              </AnimatePresence>

              {/* Top Bar: Flip-back indicator + Audio controls */}
              <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-30">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFlip();
                  }}
                  className="px-2 py-1 bg-surface/90 backdrop-blur-md border border-borderSubtle hover:border-accentBlue text-[10.5px] font-mono text-textPrimary flex items-center gap-1 transition-colors"
                  title="Flip back to photo"
                >
                  <CornerUpLeft className="w-3 h-3 text-accentBlue" />
                  <span>Photo</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleReplay}
                    className="p-1 bg-surface/90 backdrop-blur-md border border-borderSubtle hover:border-accentGreen text-textPrimary transition-colors"
                    title="Replay speech"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={handleToggleMute}
                    className={`p-1 bg-surface/90 backdrop-blur-md border border-borderSubtle transition-colors ${
                      isMuted ? 'text-textMuted border-red-500/40' : 'text-accentBlue border-accentBlue/50'
                    }`}
                    title={isMuted ? 'Unmute speech' : 'Mute speech'}
                  >
                    {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              {/* Live Animated Speech Dialogue Overlay */}
              <div className="absolute bottom-2 left-2 right-2 z-30 p-2.5 rounded-none bg-surface/95 backdrop-blur-lg border border-accentBlue/40 shadow-xl flex flex-col gap-1.5">
                {/* Header: AI Julian + Audio Waveform */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accentGreen animate-ping" />
                    <span className="text-[11px] font-mono font-bold text-accentBlue">
                      Julian (3D AI Avatar)
                    </span>
                  </div>

                  {/* Dynamic Audio Equalizer Bars */}
                  <div className="flex items-center gap-0.5 h-3">
                    {[1, 2, 3, 4, 5].map((bar) => (
                      <motion.span
                        key={bar}
                        className="w-0.5 bg-accentBlue rounded-full"
                        animate={
                          isSpeaking
                            ? {
                                height: ['20%', '100%', '40%', '80%', '20%'],
                              }
                            : { height: '20%' }
                        }
                        transition={
                          isSpeaking
                            ? {
                                repeat: Infinity,
                                duration: 0.6 + bar * 0.1,
                                ease: 'easeInOut',
                              }
                            : { duration: 0.2 }
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Subtitle Dialogue Text */}
                <p className="text-[10px] sm:text-[11px] font-mono text-textPrimary/90 leading-tight line-clamp-3">
                  {displayedText}
                  {displayedText.length < introSpeechText.length && (
                    <span className="inline-block w-1.5 h-3 bg-accentBlue ml-0.5 animate-pulse" />
                  )}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
