'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import Image from 'next/image';

interface CanvasPixelDissolvePhotoProps {
  src: string;
  alt: string;
  className?: string;
}

export function CanvasPixelDissolvePhoto({
  src,
  alt,
  className = '',
}: CanvasPixelDissolvePhotoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(containerRef, { amount: 0.25 });

  const animRef = useRef<number | null>(null);
  const currentPixelSize = useRef<number>(24); // Fast snappy initial pixelated block size
  const targetPixelSize = useRef<number>(24);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new window.Image();
    img.src = src;

    let isLoaded = img.complete;

    img.onload = () => {
      isLoaded = true;
      render();
    };

    const render = () => {
      if (!canvas || !ctx) return;

      const rect = containerRef.current?.getBoundingClientRect();
      const width = rect?.width || 300;
      const height = rect?.height || 350;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      targetPixelSize.current = isInView ? 1 : 24;
      // Fast lerp rate of 0.18 for instant zero-delay response
      currentPixelSize.current += (targetPixelSize.current - currentPixelSize.current) * 0.18;

      const pxSize = Math.max(1, Math.round(currentPixelSize.current));

      ctx.clearRect(0, 0, width, height);

      if (isLoaded) {
        if (pxSize <= 1) {
          ctx.imageSmoothingEnabled = true;
          ctx.drawImage(img, 0, 0, width, height);
        } else {
          ctx.imageSmoothingEnabled = false;
          const wScaled = Math.max(1, Math.floor(width / pxSize));
          const hScaled = Math.max(1, Math.floor(height / pxSize));

          const offscreen = document.createElement('canvas');
          offscreen.width = wScaled;
          offscreen.height = hScaled;
          const offCtx = offscreen.getContext('2d');

          if (offCtx) {
            offCtx.imageSmoothingEnabled = false;
            offCtx.drawImage(img, 0, 0, wScaled, hScaled);
            ctx.drawImage(offscreen, 0, 0, wScaled, hScaled, 0, 0, width, height);
          }
        }
      }

      if (Math.abs(currentPixelSize.current - targetPixelSize.current) > 0.1) {
        animRef.current = requestAnimationFrame(render);
      }
    };

    if (img.complete) {
      render();
    }

    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(render);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isInView, src]);

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Base Preloaded Image for Instant Zero-Delay Layout Fill */}
      <Image
        src={src}
        alt={alt}
        fill
        priority
        className="object-cover object-top"
      />

      {/* Canvas Pixel Shader Overlay */}
      <canvas
        ref={canvasRef}
        aria-label={alt}
        className="absolute inset-0 w-full h-full object-cover object-top block z-10"
      />
    </div>
  );
}
