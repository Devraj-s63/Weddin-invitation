import React from 'react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';

export const triggerPetalShower = () => {
  // Rich Rajasthani wedding colors: marigold golden yellow, saffron orange, rose crimson, antique gold
  const colors = ['#C7A15A', '#E6C98A', '#E06D10', '#851424', '#D9381E', '#FFD700'];

  // Left spray
  confetti({
    particleCount: 40,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.7 },
    colors: colors,
    shapes: ['circle'],
    scalar: 1.2,
    gravity: 0.8,
    drift: 0.1
  });

  // Right spray
  confetti({
    particleCount: 40,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.7 },
    colors: colors,
    shapes: ['circle'],
    scalar: 1.2,
    gravity: 0.8,
    drift: -0.1
  });
};

export const PetalShowerButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <button
      onClick={triggerPetalShower}
      title="पुष्प वर्षा (Shower Flower Petals)"
      className={`group flex items-center space-x-2 px-3 py-2 rounded-full border border-antique-gold/60 bg-royal-maroon-deep/90 hover:bg-royal-maroon text-antique-gold text-xs shadow-lg backdrop-blur-md transition-all active:scale-95 ${className}`}
    >
      <Sparkles className="w-3.5 h-3.5 text-antique-gold-light animate-spin" style={{ animationDuration: '8s' }} />
      <span className="font-hindi tracking-wider font-medium text-antique-gold-lighter">पुष्प वर्षा</span>
    </button>
  );
};

