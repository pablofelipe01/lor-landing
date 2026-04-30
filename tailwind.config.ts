import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        secondary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        earth: {
          50: '#faf5f0',
          100: '#f0e6d8',
          200: '#e0ccb0',
          300: '#cca87a',
          400: '#b8854a',
          500: '#a67c3d',
          600: '#8f6633',
          700: '#75502c',
          800: '#614229',
          900: '#523926',
          950: '#2e1d13',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'count-up': 'countUp 2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        countUp: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.gray.700'),
            '--tw-prose-headings': theme('colors.gray.900'),
            '--tw-prose-lead': theme('colors.gray.700'),
            '--tw-prose-links': theme('colors.primary.600'),
            '--tw-prose-bold': theme('colors.gray.900'),
            '--tw-prose-counters': theme('colors.gray.500'),
            '--tw-prose-bullets': theme('colors.gray.300'),
            '--tw-prose-hr': theme('colors.gray.200'),
            '--tw-prose-quotes': theme('colors.gray.900'),
            '--tw-prose-quote-borders': theme('colors.primary.200'),
            '--tw-prose-captions': theme('colors.gray.500'),
            '--tw-prose-code': theme('colors.primary.700'),
            '--tw-prose-pre-code': theme('colors.gray.100'),
            '--tw-prose-pre-bg': theme('colors.gray.900'),
            '--tw-prose-th-borders': theme('colors.gray.300'),
            '--tw-prose-td-borders': theme('colors.gray.200'),
            maxWidth: 'none',
            a: {
              fontWeight: '500',
              textDecoration: 'underline',
              textDecorationColor: theme('colors.primary.300'),
              textUnderlineOffset: '3px',
              transition: 'color 150ms, text-decoration-color 150ms',
              '&:hover': {
                color: theme('colors.primary.700'),
                textDecorationColor: theme('colors.primary.500'),
              },
            },
            'h1, h2, h3, h4': {
              fontFamily: theme('fontFamily.heading').toString(),
              letterSpacing: '-0.02em',
            },
            'h2': {
              marginTop: '2.5em',
              marginBottom: '1em',
              paddingBottom: '0.3em',
              borderBottom: `1px solid ${theme('colors.gray.200')}`,
            },
            'h3': { marginTop: '2em' },
            code: {
              backgroundColor: theme('colors.primary.50'),
              padding: '0.15em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '500',
              fontSize: '0.9em',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              fontWeight: '400',
              fontSize: '0.875em',
            },
            pre: {
              borderRadius: '0.75rem',
              padding: '1.25em',
              fontSize: '0.875em',
              lineHeight: '1.65',
            },
            blockquote: {
              fontStyle: 'normal',
              borderLeftWidth: '3px',
              fontWeight: '500',
            },
            'blockquote p:first-of-type::before': { content: '""' },
            'blockquote p:last-of-type::after': { content: '""' },
            img: {
              borderRadius: '0.75rem',
            },
            table: {
              fontSize: '0.9em',
            },
            thead: {
              borderBottomWidth: '2px',
            },
            'thead th': {
              fontWeight: '600',
              paddingTop: '0.5em',
              paddingBottom: '0.5em',
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
}

export default config
