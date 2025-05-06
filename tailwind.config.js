/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        dark: {
          bg: '#1E1E1E',
          text: '#F8F8F8',
          accent: '#00FF00',
          secondary: '#4A4A4A',
        },
        light: {
          bg: '#F5F5F5',
          text: '#2C2C2C',
          accent: '#2E8B57',
          secondary: '#E0E0E0',
        },
        success: {
          light: '#4ade80',
          DEFAULT: '#22c55e',
          dark: '#16a34a',
        },
        warning: {
          light: '#fcd34d',
          DEFAULT: '#f59e0b',
          dark: '#d97706',
        },
        error: {
          light: '#f87171',
          DEFAULT: '#ef4444',
          dark: '#dc2626',
        },
      },
      animation: {
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'typing': 'typing 3.5s steps(40, end)',
      },
      keyframes: {
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'typing': {
          'from': { width: '0' },
          'to': { width: '100%' },
        }
      },
    },
  },
  plugins: [],
};