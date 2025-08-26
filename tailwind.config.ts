import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

import { theme } from './src/styles/theme';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: theme.colors,
      textColor: {
        DEFAULT: '#F0F0F0',
        light: '#F0F0F0',
        dark: '#303030',
        purple: '#352778',
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(#352778 10%, #5D4DA6 50%)',
        'gradient-primary': 'linear-gradient(120deg, #32E4D0 0%, #CB78EA 80%)',
        'gradient-transparent-black':
          'linear-gradient(to bottom, transparent 5%, #00000090 60%)',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '976px',
        xl: '1024px',
        '2xl': '1440px',
      },
      fontFamily: {
        sans: [
          'var(--font-pretendard)',
          'var(--font-noto-sans)',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        DEFAULT: '1rem',
        h1: [
          '2.5rem',
          {
            lineHeight: '3rem',
            fontWeight: '800',
            letterSpacing: '-0.03rem',
          },
        ],
        h2: ['2.25rem', { lineHeight: '2.75rem', fontWeight: '700' }],
        h3: ['1.75rem', { lineHeight: '2.25rem', fontWeight: '700' }],
        h4: ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
        h5: ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        title1: ['1.125rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        title2: ['1rem', { lineHeight: '1.5rem', fontWeight: '600' }],
        title3: ['0.875rem', { lineHeight: '1.25rem', fontWeight: '600' }],
        body1: ['1rem', { lineHeight: '1.375rem', fontWeight: '400' }],
        body2: ['0.875rem', { lineHeight: '1.125rem', fontWeight: '400' }],
        body3: ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],
        subtitle: ['0.875rem', { lineHeight: '1.125rem', fontWeight: '400' }],
        sm: '0.875rem',
        md: '1rem',
        lg: '1.25rem',
        xl: '1.5rem',
      },
      width: {
        sm: '3.75rem', // 60px
        md: '6.25rem', // 100px
        lg: '12.5rem', // 200px
        xl: '18.75rem', // 300px
        '2xl': '31.25rem', // 500px
        '3xl': '62.5rem', // 1000px
        'icon-sm': '1rem',
        'icon-md': '1.5rem',
        'icon-lg': '2.25rem',
        'ads-leaderboard': '45.5rem', // 728px
        'ads-leaderboard-wide': '60.625rem', // 970px
      },
      height: {
        sm: '2rem',
        md: '3rem',
        lg: '3.75rem', // 60px
        xl: '6.25rem', // 200px
        '2xl': '15.625rem', // 250px
        'icon-sm': '1rem',
        'icon-md': '1.5rem',
        'icon-lg': '2.25rem',
        header: '5rem',
        footer: '5rem',
        'ads-leaderboard': '5.625rem', // 90px
      },
      spacing: {
        '50': '0.125rem', // 2px
        '100': '0.25rem', // 4px
        '200': '0.375rem', // 6px
        '300': '0.5rem', // 8px
        '400': '0.75rem', // 12px
        '500': '1rem', // 16px
        '600': '1.5rem', // 24px
        '700': '2rem', // 32px
        '800': '3rem', // 48px
        '900': '4rem', // 64px
        '950': '6rem', // 96px
        '1000': '10rem',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        sm: '0.375rem', // 6px
        md: '0.5rem', // 8px
        lg: '0.625rem', // 10px
        xl: '0.75rem', // 12px
        '2xl': '1rem',
      },
      borderWidth: {
        DEFAULT: '1px',
        1: '1px',
        3: '3px',
      },
      boxShadow: {
        DEFAULT: '0 4px 4px rgba(0, 0, 0, 0.25)',
        light: '0 4px 4px rgba(0, 0, 0, 0.15)',
        dark: '0 4px 4px rgba(0, 0, 0, 0.5)',
      },
      dropShadow: {
        DEFAULT: '0 4px 4px rgba(0, 0, 0, 0.25)',
        light: '0 4px 4px rgba(0, 0, 0, 0.15)',
        dark: '0 4px 4px rgba(0, 0, 0, 0.5)',
        'sm-light': '0 2px 2px rgba(0, 0, 0, 0.15)',
        'sm-dark': '0 2px 2px rgba(0, 0, 0, 0.5)',
      },
      opacity: {
        DEFAULT: '.5',
        min: '.1',
        low: '.25',
        mid: '.5',
        high: '.75',
        max: '.9',
      },
      keyframes: {
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
      },
      animation: {
        'spin-slow': 'spinSlow 5s linear infinite',
      },
    },
  },
  plugins: [animate],
};

export default config;
