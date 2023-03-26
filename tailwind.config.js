/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "330px",
      },
      colors: {
        'black': '#0D0C0F',
        "til": "#2CB49B",
        "peach": "#fdf6e5",
        "primary": "#1ca1f2",
        "brown": "#854d0e"
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@headlessui/tailwindcss")],
}