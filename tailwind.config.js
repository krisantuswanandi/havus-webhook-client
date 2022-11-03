/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{vue,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        archivo: ['Archivo, sans-serif'],
        'fira-code': ['Fira Code'],
      },
    },
  },
  plugins: [],
};
