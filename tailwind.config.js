/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'wacaco-bg': '#edede8',
        'wacaco-text': '#49493f',
        'wacaco-text-secondary': '#6b6b5f',
        'wacaco-text-muted': '#9a9a8f',
        'wacaco-primary': '#d86018',
        'wacaco-primary-hover': '#c25214',
        'wacaco-card': '#ffffff',
        'wacaco-card-hover': '#f5f5f0',
        'wacaco-border': '#d5d5cc',
        'wacaco-border-light': '#e8e8e0',
        'wacaco-olive': '#565E47',
        'wacaco-olive-bright': '#727C5E',
        'wacaco-crema': '#D4A373',
        'wacaco-terracotta': '#C85A32',
        'wacaco-success': '#4ade80',
        'wacaco-success-text': '#166534',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'JetBrains Mono', 'monospace'],
      },
      letterSpacing: { tech: '0.2em', 'wide-tech': '0.25em' },
      animation: {
        'breathe': 'breathe 3s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'hotspot-ping': 'hotspot-ping 2s cubic-bezier(0,0,0.2,1) infinite',
      },
      keyframes: {
        'breathe': { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.5' } },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(216,96,24,0.4)' },
          '70%': { boxShadow: '0 0 0 20px rgba(216,96,24,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(216,96,24,0)' },
        },
        'bounce-subtle': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        'hotspot-ping': {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '75%,100%': { transform: 'scale(2.4)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
