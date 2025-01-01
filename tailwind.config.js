/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sf': ['-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        itunes: {
          // Mode sombre (par défaut)
          bg: {
            DEFAULT: '#000000',
            light: '#FFFFFF'
          },
          text: {
            DEFAULT: '#FFFFFF',
            light: '#000000'
          },
          accent: '#fc3c44',
          button: {
            DEFAULT: '#1C1C1C',
            light: '#F5F5F7'
          },
          hover: {
            DEFAULT: '#2C2C2C',
            light: '#E5E5E7'
          },
          border: {
            DEFAULT: '#3C3C3C',
            light: '#D5D5D7'
          },
          secondary: '#b3b3b3'
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
