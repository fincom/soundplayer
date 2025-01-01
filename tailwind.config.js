/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sf': ['-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        'itunes-bg': {
          DEFAULT: '#ffffff',
          dark: '#1a1a1a',
        },
        'itunes-text': {
          DEFAULT: '#1a1a1a',
          dark: '#ffffff',
        },
        'itunes-button': {
          DEFAULT: '#f5f5f5',
          dark: '#2a2a2a',
        },
        'itunes-border': {
          DEFAULT: '#e5e5e5',
          dark: '#333333',
        },
        'itunes-hover': {
          DEFAULT: '#e5e5e5',
          dark: '#3a3a3a',
        },
        'itunes-accent': '#007AFF',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
