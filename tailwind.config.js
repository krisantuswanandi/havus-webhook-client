/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{vue,js,jsx,ts,tsx}"],
  container: {
    padding: {
      DEFAULT:  '2.5rem',
      sm:       '2.5rem',
      lg:       '4rem',
      xl:       '5rem',
      '2xl':    '6rem',
    },
  },
  theme: {
    extend: {
      colors: {
        'gray-blue': {
          50: '#F6F8FC',
          600: '#9098A5',
          700: '#727883',
          800: '#6D718A',
          900: '#374151',
        },
        'orange': {
          100: '#FFE4DB',
          300: '#F86D3F',
        },
      },
      fontFamily: {
        archivo: ["Archivo, sans-serif"],
      },
    },
  },
  plugins: [],
};
