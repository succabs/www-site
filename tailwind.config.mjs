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
        primary: '#1f4b7e', // Deep blue
        secondary: '#f39c12', // Soft orange
        background: '#f7f7f7', // Very light gray
        body: '#2e2e2e', // Dark gray
        heading: '#333', // Slightly darker gray
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
