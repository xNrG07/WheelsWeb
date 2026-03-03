import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#eef4ff',
          100: '#d9e8ff',
          200: '#bbcffe',
          300: '#8fb0fc',
          400: '#5f88f8',
          500: '#3b64f3',
          600: '#1a56db',
          700: '#1447c0',
          800: '#163a9b',
          900: '#18347a',
          950: '#111f4d',
        },
        accent: {
          400: '#f39c4e',
          500: '#e67e22',
          600: '#cf6d18',
        },
      },
      boxShadow: {
        soft: '0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)',
        card: '0 2px 8px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
    },
  },
  plugins: [],
};

export default config;
