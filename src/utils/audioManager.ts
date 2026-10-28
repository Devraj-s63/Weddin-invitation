// Comprehensive Audio Controller for Royal Rajputana Wedding Experience

class WeddingAudioManager {
  private audio: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private synthGainNode: GainNode | null = null;
  private synthOscillators: OscillatorNode[] = [];
  
  private isMuted: boolean = false;
  private isPlaying: boolean = false;
  private targetVolume: number = 0.30; // 30% restrained volume as requested
  private currentVolume: number = 0;
  private fadeInterval: number | null = null;
  private audioSources = [
    '/audio/wedding-music.mp3',
    '/audio/deep-prajwalan.mp3',
    '/audio/background.mp3',
    '/audio/shehnai.mp3'
  ];
  private subscribers: ((isPlaying: boolean, isMuted: boolean) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const savedMute = localStorage.getItem('royal_wedding_muted');
      if (savedMute !== null) {
        this.isMuted = savedMute === 'true';
      }

      // Page visibility listener
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          if (this.audio && !this.audio.paused) {
            this.audio.pause();
          }
          this.stopSynthesizer();
        } else {
          if (this.isPlaying && !this.isMuted) {
            if (this.audio) {
              this.audio.play().catch(() => {});
            } else {
              this.startSynthesizer();
            }
          }
        }
      });
    }
  }

  // Subscribe to playback changes for UI updates
  public subscribe(callback: (isPlaying: boolean, isMuted: boolean) => void) {
    this.subscribers.push(callback);
    callback(this.isPlaying, this.isMuted);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  private notify() {
    this.subscribers.forEach(cb => cb(this.isPlaying, this.isMuted));
  }

  // Web Audio Context initialization
  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Ceremonial opening sound: Rich harmonic temple bell / royal chime
  public playCeremonialOpeningSound() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      // Deep resonant fundamental frequencies (Sa - Pa - Sa octave in Indian classical)
      // D3 (146.83 Hz), A3 (220 Hz), D4 (293.66 Hz), F#4 (369.99 Hz)
      const frequencies = [146.83, 220.00, 293.66, 369.99, 587.33];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Exponential bell decay
        const peakGain = 0.15 / (idx + 1);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(peakGain, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0 + idx * 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 4.0);
      });
    } catch (e) {
      console.warn('Ceremonial sound effect notice:', e);
    }
  }

  // Graceful Web Audio Synthesizer fallback (Tanpura drone atmosphere)
  private startSynthesizer() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      this.stopSynthesizer();

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(this.isMuted ? 0 : 0.08, ctx.currentTime + 3);
      gainNode.connect(ctx.destination);
      this.synthGainNode = gainNode;

      // Authentic Tanpura drone pitches: Pa (A2 - 110Hz), Sa (D3 - 146.8Hz), Sa (D3), Sa' (D2 - 73.4Hz)
      const pitches = [73.42, 110.00, 146.83, 220.00];

      this.synthOscillators = pitches.map(freq => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.connect(gainNode);
        osc.start();
        return osc;
      });
    } catch (err) {
      console.warn('Synth drone fallback notice:', err);
    }
  }

  private stopSynthesizer() {
    if (this.synthGainNode && this.audioCtx) {
      try {
        this.synthGainNode.gain.linearRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.5);
      } catch {}
    }
    setTimeout(() => {
      this.synthOscillators.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      this.synthOscillators = [];
      this.synthGainNode = null;
    }, 600);
  }

  // Initialize and begin background music (called on user gesture)
  public async startMusic() {
    this.isPlaying = true;
    this.notify();

    // Play ceremonial opening sound
    this.playCeremonialOpeningSound();

    if (this.audio) {
      if (!this.isMuted) {
        this.fadeIn();
      }
      return;
    }

    this.tryLoadSource(0);
  }

  private tryLoadSource(index: number) {
    if (index >= this.audioSources.length) {
      // If all audio file candidates fail, switch to gentle ambient synthesized drone
      console.info('Using Web Audio royal harmonic ambient drone.');
      if (!this.isMuted) {
        this.startSynthesizer();
      }
      return;
    }

    const src = this.audioSources[index];
    const audio = new Audio();
    audio.src = src;
    audio.loop = true;
    audio.volume = 0;
    audio.preload = 'auto';

    audio.addEventListener('canplaythrough', () => {
      this.audio = audio;
      if (!this.isMuted && this.isPlaying) {
        this.audio.play().then(() => {
          this.fadeIn();
        }).catch(err => {
          console.warn('Playback prevented:', err);
          this.startSynthesizer();
        });
      }
    }, { once: true });

    audio.addEventListener('error', () => {
      console.info(`Audio source ${src} not available, attempting next...`);
      this.tryLoadSource(index + 1);
    }, { once: true });

    // Kick off load
    audio.load();
  }

  private fadeIn() {
    if (!this.audio) return;
    if (this.fadeInterval) clearInterval(this.fadeInterval);

    this.currentVolume = 0;
    this.audio.volume = 0;

    this.fadeInterval = window.setInterval(() => {
      if (!this.audio) {
        if (this.fadeInterval) clearInterval(this.fadeInterval);
        return;
      }
      this.currentVolume += 0.02;
      if (this.currentVolume >= this.targetVolume) {
        this.currentVolume = this.targetVolume;
        this.audio.volume = this.targetVolume;
        if (this.fadeInterval) clearInterval(this.fadeInterval);
      } else {
        this.audio.volume = this.currentVolume;
      }
    }, 100);
  }

  private fadeOut(callback?: () => void) {
    if (!this.audio) {
      if (callback) callback();
      return;
    }
    if (this.fadeInterval) clearInterval(this.fadeInterval);

    this.fadeInterval = window.setInterval(() => {
      if (!this.audio) {
        if (this.fadeInterval) clearInterval(this.fadeInterval);
        if (callback) callback();
        return;
      }
      this.currentVolume -= 0.04;
      if (this.currentVolume <= 0.01) {
        this.currentVolume = 0;
        this.audio.volume = 0;
        if (this.fadeInterval) clearInterval(this.fadeInterval);
        if (callback) callback();
      } else {
        this.audio.volume = this.currentVolume;
      }
    }, 80);
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('royal_wedding_muted', String(this.isMuted));

    if (this.isMuted) {
      this.fadeOut(() => {
        if (this.audio) this.audio.pause();
      });
      this.stopSynthesizer();
    } else {
      if (this.audio) {
        this.audio.play().then(() => {
          this.fadeIn();
        }).catch(() => {
          this.startSynthesizer();
        });
      } else if (this.isPlaying) {
        this.startSynthesizer();
      }
    }

    this.notify();
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.targetVolume = Math.max(0, Math.min(1, vol));
    if (this.audio && !this.isMuted) {
      this.audio.volume = this.targetVolume;
    }
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.targetVolume
    };
  }
}

export const audioManager = new WeddingAudioManager();
