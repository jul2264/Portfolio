'use client';

export interface VisemeFrame {
  jawOpen: number;       // 0 to 1 (vertical mouth open)
  mouthSmile: number;    // 0 to 1 (smile / wide vowels)
  mouthPucker: number;   // 0 to 1 (rounded lips 'oo', 'w')
  mouthFunnel: number;   // 0 to 1 (open round 'o', 'ah')
  browInnerUp: number;   // 0 to 1 (eyebrow lift for emphasis)
  eyeBlink: number;      // 0 to 1 (blinking)
  headTiltX: number;     // subtle head nod/tilt
  headTiltY: number;     // subtle head turn
}

export interface SpeechLipSyncOptions {
  text: string;
  onTextUpdate?: (charIndex: number, currentWord: string) => void;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

// Phoneme mapping patterns for common English syllables
const PHONEME_MAP: { regex: RegExp; viseme: Partial<VisemeFrame>; duration: number }[] = [
  { regex: /[aeiouy]/i, viseme: { jawOpen: 0.65, mouthSmile: 0.35, mouthFunnel: 0.4 }, duration: 180 },
  { regex: /o|oo|u|w/i, viseme: { jawOpen: 0.45, mouthPucker: 0.75, mouthFunnel: 0.6 }, duration: 160 },
  { regex: /e|ee|i|ea/i, viseme: { jawOpen: 0.35, mouthSmile: 0.75 }, duration: 150 },
  { regex: /a|ah|ai/i, viseme: { jawOpen: 0.85, mouthSmile: 0.3, mouthFunnel: 0.5 }, duration: 190 },
  { regex: /m|b|p/i, viseme: { jawOpen: 0.05, mouthPucker: 0.2 }, duration: 120 },
  { regex: /f|v/i, viseme: { jawOpen: 0.2, mouthSmile: 0.25 }, duration: 140 },
  { regex: /s|z|c|t|d|n|l/i, viseme: { jawOpen: 0.3, mouthSmile: 0.4 }, duration: 130 },
  { regex: /r|er|ur/i, viseme: { jawOpen: 0.35, mouthPucker: 0.5 }, duration: 150 },
  { regex: /th|sh|ch/i, viseme: { jawOpen: 0.4, mouthPucker: 0.4, mouthSmile: 0.2 }, duration: 160 },
];

export class SpeechLipSyncEngine {
  private utterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking = false;
  private isMuted = false;
  private currentViseme: VisemeFrame = {
    jawOpen: 0,
    mouthSmile: 0.2,
    mouthPucker: 0,
    mouthFunnel: 0,
    browInnerUp: 0,
    eyeBlink: 0,
    headTiltX: 0,
    headTiltY: 0,
  };
  private targetViseme: VisemeFrame = { ...this.currentViseme };
  private blinkTimer = 0;
  private blinkDuration = 0.14;
  private nextBlinkInterval = 3.0;
  private timeSinceLastBlink = 0;
  private speechStartTime = 0;
  private words: string[] = [];
  private currentWordIndex = 0;
  private phonemeSequence: { viseme: Partial<VisemeFrame>; start: number; end: number }[] = [];

  constructor() {
    this.resetVisemes();
  }

  public resetVisemes() {
    this.currentViseme = {
      jawOpen: 0,
      mouthSmile: 0.25,
      mouthPucker: 0,
      mouthFunnel: 0,
      browInnerUp: 0.05,
      eyeBlink: 0,
      headTiltX: 0,
      headTiltY: 0,
    };
    this.targetViseme = { ...this.currentViseme };
  }

  public prepareSpeech(text: string): { viseme: Partial<VisemeFrame>; start: number; end: number }[] {
    this.words = text.split(/\s+/);
    const sequence: { viseme: Partial<VisemeFrame>; start: number; end: number }[] = [];
    let currentTime = 0;

    for (const word of this.words) {
      const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
      if (!cleanWord) {
        currentTime += 0.08;
        continue;
      }

      // Estimate syllables / phonemes per word
      const syllableDuration = 0.12 + Math.min(cleanWord.length * 0.035, 0.28);
      let matched = false;

      for (const pattern of PHONEME_MAP) {
        if (pattern.regex.test(cleanWord)) {
          sequence.push({
            viseme: pattern.viseme,
            start: currentTime,
            end: currentTime + syllableDuration,
          });
          matched = true;
          break;
        }
      }

      if (!matched) {
        sequence.push({
          viseme: { jawOpen: 0.5, mouthSmile: 0.3 },
          start: currentTime,
          end: currentTime + syllableDuration,
        });
      }

      currentTime += syllableDuration + 0.04; // small pause between words
    }

    this.phonemeSequence = sequence;
    return sequence;
  }

  public speak(options: SpeechLipSyncOptions) {
    if (typeof window === 'undefined') return;

    this.stop();
    this.prepareSpeech(options.text);
    this.speechStartTime = performance.now() / 1000;
    this.isSpeaking = true;

    if (!('speechSynthesis' in window) || this.isMuted) {
      options.onStart?.();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(options.text);
    this.utterance = utterance;

    utterance.rate = 0.98;
    utterance.pitch = 1.02;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) =>
        (v.name.includes('Google') && v.lang.startsWith('en')) ||
        (v.name.includes('Natural') && v.lang.startsWith('en')) ||
        v.lang === 'en-US' ||
        v.lang.startsWith('en')
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      this.speechStartTime = performance.now() / 1000;
      this.isSpeaking = true;
      options.onStart?.();
    };

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const charIdx = event.charIndex;
        const currentWord = options.text.slice(charIdx).split(/\s+/)[0] || '';
        options.onTextUpdate?.(charIdx, currentWord);
      }
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.resetVisemes();
      options.onEnd?.();
    };

    utterance.onerror = (err) => {
      this.isSpeaking = false;
      this.resetVisemes();
      options.onError?.(err);
    };

    window.speechSynthesis.speak(utterance);
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.resetVisemes();
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.isSpeaking) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  }

  /**
   * Updates and returns smooth interpolated blendshape weights for the current frame
   */
  public update(delta: number, mouseX = 0, mouseY = 0): VisemeFrame {
    const now = performance.now() / 1000;

    // 1. Procedural Natural Eye Blinking
    this.timeSinceLastBlink += delta;
    if (this.timeSinceLastBlink >= this.nextBlinkInterval) {
      this.blinkTimer = this.blinkDuration;
      this.timeSinceLastBlink = 0;
      this.nextBlinkInterval = 2.5 + Math.random() * 2.5; // Random interval between 2.5s and 5.0s
    }

    let blinkVal = 0;
    if (this.blinkTimer > 0) {
      this.blinkTimer -= delta;
      const progress = 1 - Math.max(0, this.blinkTimer) / this.blinkDuration;
      // Smooth sine curve for blink down and up
      blinkVal = Math.sin(progress * Math.PI);
    }

    // 2. Lip-Sync Phoneme Synthesis
    if (this.isSpeaking) {
      const elapsed = now - this.speechStartTime;
      const currentPhoneme = this.phonemeSequence.find((p) => elapsed >= p.start && elapsed <= p.end);

      if (currentPhoneme) {
        // Active syllable modulation with audio energy variation
        const syllableProgress = (elapsed - currentPhoneme.start) / (currentPhoneme.end - currentPhoneme.start);
        const intensity = Math.sin(syllableProgress * Math.PI); // Envelope curve

        this.targetViseme.jawOpen = (currentPhoneme.viseme.jawOpen ?? 0.5) * (0.6 + intensity * 0.4);
        this.targetViseme.mouthSmile = currentPhoneme.viseme.mouthSmile ?? 0.25;
        this.targetViseme.mouthPucker = (currentPhoneme.viseme.mouthPucker ?? 0) * intensity;
        this.targetViseme.mouthFunnel = (currentPhoneme.viseme.mouthFunnel ?? 0) * intensity;
        this.targetViseme.browInnerUp = 0.15 + intensity * 0.2; // Eyebrow lift on emphasis
      } else {
        // Natural small pauses between words / resting talking shape
        const breath = Math.sin(now * 8) * 0.08;
        this.targetViseme.jawOpen = Math.max(0, 0.08 + breath);
        this.targetViseme.mouthSmile = 0.3;
        this.targetViseme.mouthPucker = 0;
        this.targetViseme.mouthFunnel = 0;
        this.targetViseme.browInnerUp = 0.05;
      }
    } else {
      // Idle resting expression (friendly slight smile)
      const idleBreathing = Math.sin(now * 1.5) * 0.02;
      this.targetViseme.jawOpen = 0;
      this.targetViseme.mouthSmile = 0.28 + idleBreathing;
      this.targetViseme.mouthPucker = 0;
      this.targetViseme.mouthFunnel = 0;
      this.targetViseme.browInnerUp = 0.04;
    }

    // 3. Smooth Interpolation (Spring Lerp)
    const lerpSpeed = 18 * delta;
    this.currentViseme.jawOpen += (this.targetViseme.jawOpen - this.currentViseme.jawOpen) * Math.min(1, lerpSpeed);
    this.currentViseme.mouthSmile += (this.targetViseme.mouthSmile - this.currentViseme.mouthSmile) * Math.min(1, lerpSpeed);
    this.currentViseme.mouthPucker += (this.targetViseme.mouthPucker - this.currentViseme.mouthPucker) * Math.min(1, lerpSpeed);
    this.currentViseme.mouthFunnel += (this.targetViseme.mouthFunnel - this.currentViseme.mouthFunnel) * Math.min(1, lerpSpeed);
    this.currentViseme.browInnerUp += (this.targetViseme.browInnerUp - this.currentViseme.browInnerUp) * Math.min(1, lerpSpeed * 0.8);
    this.currentViseme.eyeBlink = blinkVal;

    // 4. Subtle Idle Head Sway & Cursor Tracking
    const idleHeadSwayX = Math.sin(now * 0.8) * 0.03;
    const idleHeadSwayY = Math.cos(now * 0.6) * 0.04;
    this.currentViseme.headTiltX = idleHeadSwayX + mouseY * 0.18;
    this.currentViseme.headTiltY = idleHeadSwayY + mouseX * 0.22;

    return this.currentViseme;
  }
}
