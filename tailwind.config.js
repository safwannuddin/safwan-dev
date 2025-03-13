/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space': '#050816',
        'neon': '#00ff9d',
      },
      backgroundColor: {
        'space': '#050816',
        'neon': '#00ff9d',
      }
    },
  },
  plugins: [],
}