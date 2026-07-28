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

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Particle Grid Nodes
    const gridSize = 45;
    const columns = Math.ceil(width / gridSize) + 2;
    const rows = Math.ceil(height / gridSize) + 2;

    const render = () => {
      // Smooth mouse interpolation (LERP)
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const isDark = theme !== 'light';
      const gridColor = isDark ? 'rgba(76, 183, 255, 0.07)' : 'rgba(2, 132, 199, 0.07)';
      const nodeColor = isDark ? 'rgba(168, 243, 109, 0.15)' : 'rgba(22, 163, 74, 0.15)';
      const spotlightColor = isDark
        ? 'rgba(76, 183, 255, 0.12)'
        : 'rgba(2, 132, 199, 0.08)';

      // Draw Cursor Radial Spotlight
      const gradient = ctx.createRadialGradient(
        mouseX,
        mouseY,
        0,
        mouseX,
        mouseY,
        450
      );
      gradient.addColorStop(0, spotlightColor);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw Interactive Grid Lines with Warp Offset
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;

      for (let i = 0; i < columns; i++) {
        const x = i * gridSize;
        ctx.beginPath();
        for (let j = 0; j < rows; j++) {
          const y = j * gridSize;

          // Distance from mouse to grid vertex
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 250;
          let warpX = x;
          let warpY = y;

          if (dist < maxDist) {
            const factor = (1 - dist / maxDist) * 12;
            warpX += (dx / (dist || 1)) * factor;
            warpY += (dy / (dist || 1)) * factor;
          }

          if (j === 0) {
            ctx.moveTo(warpX, warpY);
          } else {
            ctx.lineTo(warpX, warpY);
          }
        }
        ctx.stroke();
      }

      for (let j = 0; j < rows; j++) {
        const y = j * gridSize;
        ctx.beginPath();
        for (let i = 0; i < columns; i++) {
          const x = i * gridSize;

          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 250;
          let warpX = x;
          let warpY = y;

          if (dist < maxDist) {
            const factor = (1 - dist / maxDist) * 12;
            warpX += (dx / (dist || 1)) * factor;
            warpY += (dy / (dist || 1)) * factor;
          }

          if (i === 0) {
            ctx.moveTo(warpX, warpY);
          } else {
            ctx.lineTo(warpX, warpY);
          }
        }
        ctx.stroke();
      }

      // Draw Hover Nodes
      ctx.fillStyle = nodeColor;
      for (let i = 0; i < columns; i += 2) {
        for (let j = 0; j < rows; j += 2) {
          const x = i * gridSize;
          const y = j * gridSize;
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const size = (1 - dist / 180) * 3 + 1;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
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
