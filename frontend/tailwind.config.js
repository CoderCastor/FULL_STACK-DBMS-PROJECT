/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // animation: {
      //   moving: 'moving 3s linear infinite',
      // },
      // keyframes: {
      //   moving: {
      //     '0%, 100%': { transform: 'translateX(0)' },
      //     '50%': { transform: 'translateX(100%)' },
      //   },
      // },
    },
  },
  plugins: [],
}