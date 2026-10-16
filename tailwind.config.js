/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pine: {
          950: '#0F140E',
          900: '#151D14',
          850: '#1A2419',
          800: '#1F2A1E',
          700: '#2A3A29',
          600: '#384E37',
        },
        canopy: '#233220',
        sand: {
          100: '#FBF9F5',
          200: '#F4EFE6',
          300: '#E8DFD1',
          400: '#D5C7B2',
          DEFAULT: '#E8DFD1',
        },
        cream: {
          light: '#FDFCFA',
          DEFAULT: '#F5F3ED',
          dark: '#E7E3D8',
        },
        gold: {
          light: '#DFC79B',
          DEFAULT: '#C8A97E',
          dark: '#A68553',
        },
        moss: '#3B5233',
        slateDark: '#121619',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Didot', 'serif'],
        sans: ['"Work Sans"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}
