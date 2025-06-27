/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-dark': '#262a2f',
        'text-light': '#fdfcfd',
        'accent-pastel': '#d0e0ed', // パステルカラー（紙みたいな少し暗めの）
      },
      fontFamily: {
        'm-plus-rounded-1c': ['M PLUS Rounded 1c', 'sans-serif'],
      }
    },
  },
  plugins: [],
}