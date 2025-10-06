/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    // Keep legacy patterns for any remaining Jekyll files
    '_includes/**/*.html',
    '_layouts/**/*.html',
    '_posts/**/*.md',
    '*.html',
    '*.markdown',
    '*.md'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
