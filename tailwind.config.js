import defaultTheme from 'tailwindcss/defaultTheme';

const { spacing } = defaultTheme;

/** @type {import("tailwindcss").Config} */
const config = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontSize: {
      xs: '.875rem',
      sm: '1rem',
      base: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '1.875rem',
      '3xl': '2rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    extend: {
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out-expo': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      keyframes: {
        'burst-1': {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '1' },
          '100%': {
            transform: 'translate(-12px, -16px) scale(0.1)',
            opacity: '0',
          },
        },
        'burst-2': {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '1' },
          '100%': {
            transform: 'translate(12px, -14px) scale(0.1)',
            opacity: '0',
          },
        },
        'burst-3': {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '1' },
          '100%': {
            transform: 'translate(-16px, 4px) scale(0.1)',
            opacity: '0',
          },
        },
        'burst-4': {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '1' },
          '100%': {
            transform: 'translate(16px, 6px) scale(0.1)',
            opacity: '0',
          },
        },
        'burst-5': {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '1' },
          '100%': {
            transform: 'translate(-8px, 14px) scale(0.1)',
            opacity: '0',
          },
        },
        'burst-6': {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '1' },
          '100%': {
            transform: 'translate(10px, 12px) scale(0.1)',
            opacity: '0',
          },
        },
        'ring-burst': {
          '0%': { transform: 'scale(0.5)', opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        'bounce-pop': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'burst-1': 'burst-1 0.35s ease-out forwards',
        'burst-2': 'burst-2 0.35s ease-out forwards',
        'burst-3': 'burst-3 0.35s ease-out forwards',
        'burst-4': 'burst-4 0.35s ease-out forwards',
        'burst-5': 'burst-5 0.35s ease-out forwards',
        'burst-6': 'burst-6 0.35s ease-out forwards',
        'ring-burst': 'ring-burst 0.4s ease-out forwards',
        'bounce-pop': 'bounce-pop 0.3s ease-out',
      },
      colors: {
        gray: {
          100: '#fafafa',
          200: '#eaeaea',
          300: '#999999',
          400: '#888888',
          500: '#666666',
          600: '#444444',
          700: '#333333',
          800: '#222222',
          900: '#111111',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.gray.800'),
              textDecoration: 'underline',
              textDecorationColor: theme('colors.gray.300'),
              textUnderlineOffset: '3px',
              textDecorationThickness: '1px',
              fontWeight: 'inherit',
              transition:
                'text-decoration-color 150ms cubic-bezier(0.23, 1, 0.32, 1)',
              '&:hover': {
                textDecorationColor: theme('colors.gray.500'),
              },
              code: { color: 'inherit' },
            },
            'h2,h3,h4': {
              'scroll-margin-top': spacing[4],
            },
            thead: {
              borderBottomColor: theme('colors.gray.200'),
            },
            code: { color: theme('colors.pink.500') },
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false,
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.200'),
            a: {
              color: theme('colors.gray.100'),
              textDecorationColor: theme('colors.gray.600'),
              textDecorationThickness: '1px',
              textUnderlineOffset: '3px',
              fontWeight: 'inherit',
              transition:
                'text-decoration-color 150ms cubic-bezier(0.23, 1, 0.32, 1)',
              '&:hover': {
                textDecorationColor: theme('colors.gray.400'),
              },
              code: { color: 'inherit' },
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.700'),
              color: theme('colors.gray.300'),
            },
            'h2,h3,h4': {
              color: theme('colors.gray.100'),
              'scroll-margin-top': spacing[4],
            },
            dt: {
              color: theme('colors.gray.100'),
            },
            hr: { borderColor: theme('colors.gray.700') },
            ol: {
              li: {
                '&:before': { color: theme('colors.gray.500') },
              },
            },
            ul: {
              li: {
                '&:before': { backgroundColor: theme('colors.gray.500') },
              },
            },
            strong: { color: theme('colors.gray.100') },
            thead: {
              th: {
                color: theme('colors.gray.100'),
              },
              borderBottomColor: theme('colors.gray.600'),
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [],
};

export default config;
