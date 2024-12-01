/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#219CFF",
        "secondary": "#FF724F",
        "background": "#004066"
      },
      borderRadius: {
        "titleBadge": "0.9em 0.4em"
      }
    },
  },
  plugins: [],
}

