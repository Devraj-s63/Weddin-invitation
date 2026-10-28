import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { audioManager } from '../../utils/audioManager';

export const MusicController: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((playing, muted) => {
      setIsPlaying(playing);
      setIsMuted(muted);
    });
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    if (!isPlaying) {
      audioManager.startMusic();
    } else {
      audioManager.toggleMute();
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
      <button
        onClick={handleToggle}
        aria-label={isMuted || !isPlaying ? "शाही संगीत चालू करें" : "शाही संगीत म्यूट करें"}
        className={`group flex items-center space-x-2 px-3 py-2 rounded-full border transition-all duration-300 shadow-royal-glow active:scale-95 ${
          isPlaying && !isMuted
            ? 'bg-royal-maroon/90 border-antique-gold text-antique-gold-light'
            : 'bg-charcoal/80 border-antique-gold/40 text-sandstone/70 hover:text-antique-gold'
        } backdrop-blur-md`}
      >
        {isPlaying && !isMuted ? (
          <>
            {/* Animated Equalizer Wave Bars */}
            <div className="flex items-end space-x-0.5 h-3.5 w-4 mr-1">
              <span className="w-0.5 bg-antique-gold animate-[bounce_1s_infinite_100ms] h-full rounded-full" />
              <span className="w-0.5 bg-antique-gold animate-[bounce_1s_infinite_300ms] h-2/3 rounded-full" />
              <span className="w-0.5 bg-antique-gold animate-[bounce_1s_infinite_200ms] h-5/6 rounded-full" />
              <span className="w-0.5 bg-antique-gold animate-[bounce_1s_infinite_400ms] h-1/2 rounded-full" />
            </div>
            <Volume2 className="w-4 h-4 text-antique-gold" />
            <span className="text-xs font-hindi hidden sm:inline tracking-wider">संगीत चालू</span>
          </>
        ) : (
          <>
            {isMuted && isPlaying ? (
              <VolumeX className="w-4 h-4 text-sandstone/70" />
            ) : (
              <Music className="w-4 h-4 text-sandstone/70" />
            )}
            <span className="text-xs font-hindi hidden sm:inline tracking-wider">
              {isPlaying ? 'म्यूट' : 'संगीत'}
            </span>
          </>
        )}
      </button>
    </div>
  );
};

