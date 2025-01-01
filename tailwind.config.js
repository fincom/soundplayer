/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sf': ['-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        'itunes': {
          'bg': '#282828',
          'text': '#FFFFFF',
          'accent': '#fc3c44',
          'button': '#1c1c1c',
          'hover': '#383838',
          'border': '#3c3c3c',
          'secondary': '#b3b3b3'
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
