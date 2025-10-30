/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Pastel color palette for contributors
        'pastel-green': '#B8E6B8',
        'terracotta': '#E3A587',
        'mustard': '#F4D58D',
        'dusty-blue': '#A4C3D2',
        'soft-pink': '#F5C6CB',
      },
      fontFamily: {
        'title': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
