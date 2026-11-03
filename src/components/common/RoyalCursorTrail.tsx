import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  vx: number;
  vy: number;
}

export const RoyalCursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Only run on desktop devices with fine pointer
    if (typeof window === 'undefined') return;
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isDesktop) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const maxParticles = 30;

    const handleMouseMove = (e: MouseEvent) => {
      // Add 2 small particles on each move
      for (let i = 0; i < 2; i++) {
        if (particles.length >= maxParticles) {
          particles.shift();
        }
        particles.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 3 + 1.5,
          alpha: 0.85,
          vx: (Math.random() - 0.5) * 0.8,
          vy: Math.random() * -1 - 0.5, // float upwards slightly
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.025; // fade out quickly

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Golden sparkle color
        ctx.fillStyle = `rgba(230, 201, 138, ${p.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(199, 161, 90, 0.8)';
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden="true"
    />
  );
};

