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
        page: '#FEFEFE',
        ink: '#000000',
        navInk: '#3A3C40',
        muted: '#5E6064',
        coral: {
          DEFAULT: '#F8533F',
          50: '#FFF5F4',
          100: '#FFEBE8',
          400: '#FB7565',
          500: '#F8533F',
          600: '#E63D29',
        },
        announcementCoral: '#FA6E5C',
        baselineCoral: '#FB7565',
        dataViolet: {
          DEFAULT: '#7A5CF0',
          50: '#F5F3FF',
          100: '#EDE9FE',
          500: '#7A5CF0',
          600: '#6A4CEB',
          700: '#5838D6',
        },
        chipLavender: {
          bg1: '#F1EDFE',
          bg2: '#E8E2FD',
          text: '#6A4CEB',
        },
        cardGrey: '#EAEAEA',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
