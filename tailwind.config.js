/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0d2157',
          mid: '#1a3a8f',
          light: '#2352c8',
        },
        crimson: {
          DEFAULT: '#c0392b',
          light: '#e74c3c',
        },
        ice: {
          DEFAULT: '#eef3fc',
          mid: '#dce8f8',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'fade-up': 'fade-up 0.55s cubic-bezier(0.16,1,0.3,1) both',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
