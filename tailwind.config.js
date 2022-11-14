/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./components/**/*.tsx', './pages/**/*.tsx', './layouts/**/*.tsx'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--color-primary) / <alpha-value>)',
        secondary: 'hsl(var(--color-secondary) / <alpha-value>)',
        tertiary: 'hsl(var(--color-tertiary) / <alpha-value>)',
        decorative: 'hsl(var(--color-decorative) / <alpha-value>)'
      },
    },
  },
  plugins: [],
}
