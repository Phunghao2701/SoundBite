/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        dark: {
          900: '#030305',
          800: '#0a0a0f',
          700: '#15151e',
          600: '#1f1f2e',
        },
        primary: {
          light: '#00f6ff',
          DEFAULT: '#00d2ff',
          dark: '#0097f5',
        },
        secondary: {
          DEFAULT: '#7928CA',
          light: '#FF0080',
        }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}