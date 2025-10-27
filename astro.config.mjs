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
      applyBaseStyles: true,
    })
  ],
  markdown: {
    syntaxHighlight: 'prism',
  },
});