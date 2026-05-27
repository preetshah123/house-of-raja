import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'raja-green': '#838D41',
        'raja-yellow': '#FFED93',
        'raja-maroon': '#6C2200',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        300: '300ms',
      },
    },
  },
  plugins: [],
} satisfies Config;
