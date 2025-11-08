import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { createHighlighter } from 'shiki';

// Create a highlighter instance for mdsvex
const highlighter = await createHighlighter({
  themes: ['github-dark', 'github-light'],
  langs: ['ruby', 'javascript', 'typescript', 'html', 'css', 'bash', 'json']
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.md', '.svx'],
      highlight: {
        highlighter: async (code, lang = 'text') => {
          const html = highlighter.codeToHtml(code, {
            lang,
            themes: {
              light: 'github-light',
              dark: 'github-dark'
            },
            defaultColor: false
          });
          // Escape backticks and backslashes for Svelte template
          const escaped = html.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
          return `{@html \`${escaped}\` }`;
        }
      }
    })
  ],
  kit: {
    // adapter-cloudflare for Cloudflare Workers deployment
    adapter: adapter({})
  },
  extensions: ['.svelte', '.md', '.svx']
};

export default config;
