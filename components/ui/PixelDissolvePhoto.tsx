'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

interface PixelDissolvePhotoProps {
  src: string;
  alt: string;
  className?: string;
  gridCols?: number;
  gridRows?: number;
}

export function PixelDissolvePhoto({
  src,
  alt,
  className = '',
  gridCols = 12,
  gridRows = 12,
}: PixelDissolvePhotoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger un-pixelating animation when loader curtain finishes fading out
    const handleLoaded = () => {
      // Small 150ms delay after hero section becomes 100% visible
      setTimeout(() => setIsLoaded(true), 150);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('portfolio-loaded', handleLoaded);
    }

    // Fallback timer at 3.5s to ensure it triggers if event was missed
    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 3500);

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('portfolio-loaded', handleLoaded);
      }
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Generate mixed pixel block tiles (transparent, glass, dark pixel blocks)
  const [pixelTiles, setPixelTiles] = useState<
    {
      id: number;
      delay: number;
      offsetX: number;
      offsetY: number;
      rotate: number;
      type: 'glass' | 'dark' | 'accent';
    }[]
  >([]);

  useEffect(() => {
    const total = gridCols * gridRows;
    const types: ('glass' | 'dark' | 'accent')[] = ['dark', 'glass', 'dark', 'accent', 'glass'];

    const tiles = Array.from({ length: total }, (_, i) => ({
      id: i,
      delay: Math.random() * 0.75, // Staggered over 0.75s for a smooth organic wave
      offsetX: (Math.random() - 0.5) * 60,
      offsetY: (Math.random() - 0.5) * 60,
      rotate: (Math.random() - 0.5) * 70,
      type: types[i % types.length],
    }));
    setPixelTiles(tiles);
  }, [gridCols, gridRows]);

  const shouldReveal = isLoaded && isInView;

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* 100% Crisp High-Res Original Photo Base */}
      <motion.div
        className="relative w-full h-full"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={shouldReveal ? { opacity: 1, scale: 1 } : { opacity: 0.2, scale: 1.04 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-cover object-top"
        />
      </motion.div>

      {/* Mixed Transparent & Pixelated Block Overlay Matrix */}
      <div
        className="absolute inset-0 grid pointer-events-none z-10"
        style={{
          gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`,
        }}
      >
        {pixelTiles.map((tile) => {
          let bgClass = 'bg-bgPrimary/95 border border-borderSubtle/40';
          if (tile.type === 'glass') {
            bgClass = 'bg-surface/80 backdrop-blur-xs border border-accentBlue/20';
          } else if (tile.type === 'accent') {
            bgClass = 'bg-accentBlue/20 border border-accentBlue/30';
          }

          return (
            <motion.div
              key={tile.id}
              initial={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
              animate={
                shouldReveal
                  ? { opacity: 0, scale: 0, x: tile.offsetX, y: tile.offsetY, rotate: tile.rotate }
                  : { opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }
              }
              transition={{
                duration: 1.1, // Slower 1.1s smooth unpixelating transition
                delay: tile.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`${bgClass} rounded-xs`}
            />
          );
        })}
      </div>
    </div>
  );
}
