'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let gridOffset = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const gridSize = 50;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth subtle grid motion drift
      gridOffset = (gridOffset + 0.3) % gridSize;

      const isDarkMode = theme !== 'light';
      const gridColor = isDarkMode ? 'rgba(76, 183, 255, 0.05)' : 'rgba(2, 132, 199, 0.05)';

      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;

      // Vertical Grid Lines
      for (let x = gridOffset; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal Grid Lines
      for (let y = gridOffset; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
    />
  );
}
