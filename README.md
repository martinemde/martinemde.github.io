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

The site is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the `main` branch.

## Migration from Jekyll

This site was migrated from Jekyll to Astro while preserving:
- All existing blog post URLs
- Original design and styling with Tailwind CSS
- Content and functionality
