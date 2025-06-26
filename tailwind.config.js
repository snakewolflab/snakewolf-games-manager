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
        'inter': ['Inter', 'sans-serif'],
        'noto-sans-jp': ['Noto Sans JP', 'sans-serif'],
      }
    },
  },
  plugins: [],
}