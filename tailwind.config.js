/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'royal-maroon': {
          DEFAULT: '#650F1C',
          dark: '#4A0B14',
          deep: '#340A13',
          crimson: '#851424',
          light: '#A02336',
        },
        'antique-gold': {
          DEFAULT: '#C7A15A',
          light: '#E6C98A',
          lighter: '#F3DFC1',
          muted: '#A77E3E',
          dark: '#855E24',
        },
        'sandstone': {
          DEFAULT: '#D9B995',
          light: '#EAD7BE',
          dark: '#B89269',
        },
        'ivory': {
          DEFAULT: '#F7F0E2',
          card: '#FFFDF9',
          parchment: '#F4ECE0',
          dark: '#E7DDD0',
        },
        'charcoal': {
          DEFAULT: '#211B19',
          dark: '#14100E',
          light: '#2E2623',
        }
      },
      fontFamily: {
        royal: ['"Rozha One"', '"Tiro Devanagari Hindi"', '"Noto Serif Devanagari"', 'serif'],
        hindi: ['"Noto Serif Devanagari"', '"Tiro Devanagari Hindi"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        'cinzel-dec': ['"Cinzel Decorative"', 'serif'],
        marcellus: ['"Marcellus"', 'serif'],
      },
      boxShadow: {
        'royal-glow': '0 0 35px rgba(199, 161, 90, 0.35)',
        'gold-inner': 'inset 0 0 15px rgba(199, 161, 90, 0.4)',
        'curtain': '0 20px 50px rgba(0, 0, 0, 0.8), inset 0 0 60px rgba(20, 3, 7, 0.9)',
        'card-3d': '0 25px 50px -12px rgba(33, 27, 25, 0.65), 0 0 25px rgba(199, 161, 90, 0.25)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F3DFC1 0%, #C7A15A 50%, #A77E3E 100%)',
        'velvet-sheen': 'linear-gradient(90deg, #340A13 0%, #650F1C 35%, #851424 50%, #650F1C 65%, #340A13 100%)',
        'parchment-pattern': 'radial-gradient(ellipse at center, #FFFDF9 0%, #F7F0E2 80%, #E8DCBE 100%)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'float': 'floatSlow 4s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.03)', opacity: '0.92' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glowPulse: {
          '0%, 100%': { filter: 'drop-shadow(0 0 10px rgba(199, 161, 90, 0.4))' },
          '50%': { filter: 'drop-shadow(0 0 25px rgba(229, 201, 138, 0.8))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
