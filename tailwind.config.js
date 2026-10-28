/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        porcelain: '#FDFBF7',
        slateDark: '#0F172A',
        slateCard: '#1E293B',
        slateBorder: '#334155',
        deepViolet: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          DEFAULT: '#6D28D9',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        roseQuartz: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#FB7185',
          DEFAULT: '#F43F5E',
          500: '#F43F5E',
          600: '#E11D48',
          700: '#BE123C',
        },
        emeraldAccent: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          DEFAULT: '#10B981',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        softAmethyst: '#EDE9FE',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 25px -5px rgba(109, 40, 217, 0.35)',
        'glow-rose': '0 0 25px -5px rgba(244, 63, 94, 0.35)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.35)',
      }
    },
  },
  plugins: [],
}
