# Instructions for LLMs Working on This Project

## Package Manager

**IMPORTANT**: This project uses **Bun** as its package manager, not npm or yarn.

### Installation Commands

- **Install dependencies**: `bun install`
- **Add a package**: `bun add <package-name>`
- **Add a dev dependency**: `bun add -d <package-name>`
- **Remove a package**: `bun remove <package-name>`
- **Run scripts**: `bun run <script-name>` or just `bun <script-name>`

### Lockfile

- The project uses `bun.lock` for dependency locking
- **Never** commit `package-lock.json` or `yarn.lock` files
- Always use `bun install` after adding or removing dependencies to update `bun.lock`
- The build environment (Cloudflare Pages) uses `bun install --frozen-lockfile`

### If Bun is Not Available Locally

If you need to install packages and bun is not available in your environment:

1. Install bun first: `curl -fsSL https://bun.sh/install | bash`
2. Use the full path if needed: `~/.bun/bin/bun install`
3. Ensure `bun.lock` is updated and committed

## Development Commands

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run check` - Type check
- `bun run lint` - Lint code
- `bun run format` - Format code with Prettier

## Technology Stack

- **Framework**: SvelteKit 2.x with Svelte 5.x
- **Styling**: Tailwind CSS 4.x
- **UI Framework**: Skeleton with mona theme
- **Content**: MDsveX for markdown blog posts
- **Deployment**: Cloudflare Pages

## Theme and Styling

This project uses Skeleton's theme system. When adding or modifying styles:

- Use theme-aware color classes like `bg-surface-50-950` instead of `bg-white dark:bg-gray-950`
- Use `text-surface-*` for adaptive text colors
- Use `border-surface-*` for adaptive borders
- Use the `anchor` class for links with theme-aware hover states
- The active theme is "mona" configured in `src/app.html`
