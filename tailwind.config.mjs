import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#1ABC9C', // Deep blue
        secondary: '#F39C12', // Soft orange
        background: '#121212', // Very light gray
        body: '#EAEAEA', // Dark gray
        heading: '#B3B3B3', // Slightly darker gray
        divider: '#333333', // Dark gray
        highlight: '#16A085',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
