/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#0f0f0f',
        'card-bg': 'rgba(255, 255, 255, 0.05)',
        'accent-purple': '#8b5cf6',
        'accent-teal': '#14b8a6',
        'accent-coral': '#fb7185',
      },
    },
  },
  plugins: [],
} 