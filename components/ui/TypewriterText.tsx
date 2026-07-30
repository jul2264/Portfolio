'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TypewriterTextProps {
  paragraphs: string[];
  speed?: number;
  className?: string;
}

export function TypewriterText({
  paragraphs,
  speed = 1,
  className = '',
}: TypewriterTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.25 });

  const fullText = paragraphs.join('\n\n');
  const [displayedLength, setDisplayedLength] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedLength((prev) => {
        if (isInView) {
          // Scroll in view: type FORWARDS character by character
          if (prev < fullText.length) {
            return Math.min(prev + 6, fullText.length);
          }
        } else {
          // Scroll out of view: untype BACKWARDS in reverse
          if (prev > 0) {
            return Math.max(prev - 10, 0);
          }
        }
        return prev;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isInView, fullText, speed]);

  const currentText = fullText.slice(0, displayedLength);
  const currentParagraphs = currentText.split('\n\n');

  // Highlight keywords dynamically while typing or untyping
  const highlightTerms = (text: string) => {
    const keywords = [
      'Go',
      'Next.js',
      'PostgreSQL/PostGIS',
      'Redis',
      'Django',
      'Celery',
      'Clerk',
      'Meilisearch',
      'Talenciaglobal',
      'Radare2',
      'Wireshark',
      'SQLMap',
      'SRM University',
    ];

    let parts: { text: string; isKeyword: boolean }[] = [{ text, isKeyword: false }];

    keywords.forEach((keyword) => {
      const newParts: { text: string; isKeyword: boolean }[] = [];
      parts.forEach((part) => {
        if (part.isKeyword) {
          newParts.push(part);
        } else {
          const split = part.text.split(keyword);
          split.forEach((sub, idx) => {
            if (sub) newParts.push({ text: sub, isKeyword: false });
            if (idx < split.length - 1) {
              newParts.push({ text: keyword, isKeyword: true });
            }
          });
        }
      });
      parts = newParts;
    });

    return parts.map((part, index) =>
      part.isKeyword ? (
        <span
          key={index}
          className={
            part.text === 'Talenciaglobal' || part.text === 'SRM University'
              ? 'text-textPrimary font-semibold'
              : 'text-accentBlue font-semibold'
          }
        >
          {part.text}
        </span>
      ) : (
        <span key={index}>{part.text}</span>
      )
    );
  };

  return (
    <div
      ref={containerRef}
      className={`min-h-[130px] sm:min-h-[145px] lg:min-h-[140px] flex flex-col justify-start overflow-hidden ${className}`}
    >
      {currentParagraphs.map((pText, i) => (
        <p key={i} className="mb-1.5 leading-relaxed">
          {highlightTerms(pText)}
          {i === currentParagraphs.length - 1 && displayedLength < fullText.length && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.3 }}
              className="inline-block w-1.5 h-3.5 ml-0.5 bg-accentBlue align-middle rounded-none"
            />
          )}
        </p>
      ))}
    </div>
  );
}
