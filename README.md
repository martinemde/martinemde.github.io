# [MartinEmde.com](https://martinemde.com)

Martin Emde's personal blog built with [Astro](https://astro.build).

## Development

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## Adding Blog Posts

Blog posts are located in `src/content/blog/` and follow the naming convention `YYYY-MM-DD-title.md`.

Create a new file with frontmatter:

```markdown
---
title: "Your Blog Post Title"
---

Your content here...
```

The URL will automatically be generated as `/YYYY/MM/DD/title.html` to preserve compatibility with the original Jekyll structure.

## Deployment

The site is automatically deployed to Cloudflare Workers via GitHub Actions when changes are pushed to the `main` branch.

### Setup for Deployment

To deploy to Cloudflare Workers, you need to set up the following repository secret:

- `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token with permissions to edit Workers

### Local Deployment

You can also deploy locally using wrangler:

```bash
# Install dependencies
npm install

# Build the site
npm run build

# Deploy to Cloudflare Workers
npm run deploy

# Preview deployment (dry run)
npm run deploy:preview
```

## Migration from Jekyll

This site was migrated from Jekyll to Astro while preserving:
- All existing blog post URLs
- Original design and styling with Tailwind CSS
- Content and functionality
