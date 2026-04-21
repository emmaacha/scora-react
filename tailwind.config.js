/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        vs: {
          black:   '#09090B',
          surface: '#111113',
          card:    '#18181B',
          border:  '#27272A',
          borderHv:'#3F3F46',
          lime:    '#CCFF33',
          limeDim: '#8BAA1E',
          blue:    '#3B82F6',
          red:     '#EF4444',
          amber:   '#F59E0B',
          green:   '#22C55E',
          purple:  '#A855F7',
          text:    '#FAFAFA',
          sub:     '#A1A1AA',
          muted:   '#52525B',
        },
      },
      fontFamily: {
        head: ['"Barlow Condensed"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in':    'fadeIn 0.2s ease forwards',
        'scale-in':   'scaleIn 0.18s ease forwards',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0', transform: 'translateY(6px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { from: { opacity: '0', transform: 'scale(0.97)' },     to: { opacity: '1', transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
}
