/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '_includes/**/*.html',
    '_layouts/**/*.html',
    '_posts/**/*.md',
    '*.html',
    '*.markdown',
    '*.md'
  ],
  theme: {
      extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
