/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
        ],
        mono: [
          'JetBrains Mono',
          'Monaco',
          'Menlo',
          'Consolas',
          'Courier New',
          'Courier',
          'monospace',
        ],
      },
      colors: {
        primary: colors.indigo,
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')} !important`,
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.900'),
            },
            'h4,h5,h6': {
              color: theme('colors.gray.900'),
            },
            pre: {
              marginLeft: '-1rem',
              marginRight: '-1rem',
              backgroundColor: theme('colors.gray.300'),
            },
            code: {
              color: theme('colors.pink.500'),
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            details: {
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            hr: { borderColor: theme('colors.gray.200') },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.primary.500'),
            },
            'ul li::marker': {
              color: theme('colors.primary.500'),
            },
            strong: {
              backgroundColor: 'inherit',
              color: theme('colors.gray.600'),
            },
            blockquote: {
              position: 'relative',
              color: theme('colors.slate.600'),
              border: 'none',
              'p:first-child::before, p:last-child::after': {
                content: 'none',
              },
            },
            'blockquote::before': {
              content: "'“'",
              left: '-0.75rem',
              top: '-1.75rem',
              fontWeight: '700',
              fontSize: '6rem',
              lineHeight: '1',
              position: 'absolute',
              opacity: 0.25,
              fontFamily: "'Times New Roman', serif",
            },
            'blockquote::after': {
              content: "'”'",
              right: '0',
              top: '-1.75rem',
              fontWeight: '700',
              fontSize: '6rem',
              lineHeight: '1',
              position: 'absolute',
              opacity: 0.25,
              fontFamily: "'Times New Roman', serif",
            },
          },
        },
        lg: {
          css: {
            blockquote: {
              paddingLeft: '2rem',
              paddingRight: '2rem',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.200'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')} !important`,
              },
              code: { color: theme('colors.primary.400') },
            },
            h1: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.100'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.100'),
            },
            'h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
            },
            code: {
              backgroundColor: theme('colors.gray.800'),
            },
            details: {
              backgroundColor: theme('colors.gray.800'),
            },
            hr: { borderColor: theme('colors.gray.700') },
            'ol li::marker': {
              fontWeight: '600',
              color: theme('colors.primary.500'),
            },
            'ul li::marker': {
              color: theme('colors.primary.500'),
            },
            strong: {
              color: theme('colors.gray.100'),
            },
            thead: {
              borderBottomColor: theme('colors.gray.700'),
              th: {
                color: theme('colors.gray.100'),
              },
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
              },
            },
            blockquote: {
              color: theme('colors.slate.300'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
