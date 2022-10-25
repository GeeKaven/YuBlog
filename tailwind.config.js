/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./components/**/*.tsx', './pages/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        night: '#22232a',
      },
    },
  },
  plugins: [],
}
