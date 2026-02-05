import type { Config } from 'tailwindcss'

const daikinTucsonConfig: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        daikin: {
          primary: '#0066B3',
          secondary: '#00A3E0',
          accent: '#FFB81C',
          navy: '#003366',
          lightBlue: '#E6F4F9',
          darkGray: '#2D3748',
          mediumGray: '#4A5568',
          lightGray: '#E2E8F0',
        },
        tucson: {
          sand: '#D4C5A9',
          sage: '#8B9B7A',
          terracotta: '#C85A3E',
          desert: '#E8DCC4',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'daikin': '0.375rem',
      },
    },
  },
  plugins: [],
}

export default daikinTucsonConfig
