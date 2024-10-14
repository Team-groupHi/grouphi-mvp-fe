import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: {
        light: '#93EFDE',
        DEFAULT: '#32E4D0',
        dark: '#00CDB6',
        container: '#000000',
      },
      secondary: {
        light: '#E6A3FF',
        DEFAULT: '#CB78EA',
        dark: '#B355D5',
        container: '#000000',
      },
      tertiary: {
        DEFAULT: '#FFF0B6',
        container: '#000000',
      },
      error: {
        DEFAULT: '#E83A34',
        container: '#000000',
      },
      text: {
        DEFAULT: '#F0F0F0',
        dark: '#B3B3B3',
      },
      gray: {
        100: '#F2F2F7',
        200: '#E5E5EA',
        300: '#C7C7CC',
        500: '#AEAEB2',
        700: '#808080',
        900: '#404040',
      },
      black: '#000000',
      white: '#ffffff',
    },
    extend: {
      backgroundImage: {
        'gradient-purple':
          'linear-gradient(#350D6D 0%, #352778 20%, #5D4DA6 85%)',
        'gradient-primary': 'linear-gradient(120deg, #32E4D0 0%, #CB78EA 80%)',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '976px',
        xl: '1024px',
        '2xl': '1440px',
      },
      fontFamily: {
        sansSerif: ['Pretendard', 'Noto Sans CJK KR', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        sm: '0.675rem',
        base: '1rem',
        lg: '1.5rem',
        xl: '2rem',
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        bold: '700',
      },
      width: {
        sm: '3.75rem', // 60px
        md: '6.25rem', // 100px
        lg: '12.5rem', // 200px
        xl: '18.75rem', // 300px
        '2xl': '31.25rem', // 500px
        '3xl': '62.5rem', // 1000px
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
      },
      spacing: {
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '4rem',
      },
      borderRadius: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      boxShadow: {
        light: '0 4px 4px rgba(0, 0, 0, 0.10)',
        heavy: '0 4px 4px rgba(0, 0, 0, 0.25)',
      },
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
        100: '100',
      },
    },
  },
  plugins: [],
}
export default config
