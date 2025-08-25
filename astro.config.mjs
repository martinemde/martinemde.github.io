import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://martinemde.com',
  build: {
    format: 'file'
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    })
  ],
  markdown: {
    syntaxHighlight: 'prism',
  },
});