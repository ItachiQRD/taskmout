import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        maison: {
          creme: '#F5EFE7',
          sable: '#DBC3A5',
          brun: '#5A3825',
          cacao: '#1B1714',
          olive: '#5A6650',
          terre: '#A56A43',
          dore: '#CBA26A',
        },
        argan: {
          50: '#fdf8f0',
          100: '#f9ecd6',
          200: '#f2d9ad',
          300: '#e9c07a',
          400: '#dea34a',
          500: '#d68b2a',
          600: '#c87320',
          700: '#a5581c',
          800: '#85461e',
          900: '#6d3b1c',
        },
        olive: {
          50: '#f4f6ef',
          100: '#e6ebdc',
          200: '#cdd9b8',
          300: '#acc18a',
          400: '#8aa65e',
          500: '#6d8b44',
          600: '#556e36',
          700: '#43552d',
          800: '#384527',
          900: '#303b23',
        },
        dune: {
          50: '#faf8f5',
          100: '#f2ede6',
          200: '#e5d9ca',
          300: '#d4bfa8',
          400: '#c2a084',
          500: '#b08a6b',
        },
        cream: '#faf7f2',
        ink: '#2c261f',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        oriental: ['var(--font-amiri)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(2.5rem, 6vw, 4rem)', { lineHeight: '1.15' }],
        intro: ['clamp(1.125rem, 2vw, 1.35rem)', { lineHeight: '1.6' }],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(27, 23, 20, 0.08)',
        warm: '0 8px 32px -8px rgba(90, 56, 37, 0.18)',
        card: '0 2px 12px rgba(27, 23, 20, 0.06)',
        maison: '0 12px 40px -16px rgba(90, 56, 37, 0.12)',
      },
      keyframes: {
        'scroll-text': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-25%)' },
        },
        'hero-carousel': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'scroll-text': 'scroll-text 25s linear infinite',
        'hero-carousel': 'hero-carousel 40s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
