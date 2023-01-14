/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': '#0D0C0F',
        "til": "#2CB49B",
        "peach": "#fdf6e5"
      },
    },
  },
  plugins: [],
}