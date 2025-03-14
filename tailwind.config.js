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
          'neon-green': {
            DEFAULT: '#00ff9d', // Base color
            50: 'rgba(0, 255, 157, 0.5)', // Opacity version
          },
        },
      },
    },
    plugins: [],
  };
  