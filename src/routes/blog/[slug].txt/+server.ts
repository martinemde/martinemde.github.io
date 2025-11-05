import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Import all blog posts at build time using Vite's glob import
const posts = import.meta.glob('/src/content/blog/*.{md,svx}', {
	query: '?raw',
	import: 'default',
	eager: true
});

export const GET: RequestHandler = async ({ params }) => {
	const { slug } = params;

	// Try to find the post with this slug
	const mdKey = `/src/content/blog/${slug}.md`;
	const svxKey = `/src/content/blog/${slug}.svx`;

	const content = (posts[mdKey] || posts[svxKey]) as string | undefined;

	if (!content) {
		throw error(404, `Post not found: ${slug}`);
	}

	return new Response(content, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
};
