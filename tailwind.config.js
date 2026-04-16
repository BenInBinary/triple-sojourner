/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-950': '#05050A',
        'neon-cyan': '#00F0FF',
        'neon-purple': '#8A2BE2',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        outfit: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
