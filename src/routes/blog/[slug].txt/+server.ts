import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import fs from 'fs';
import path from 'path';

export const GET: RequestHandler = async ({ params }) => {
	const { slug } = params;

	// Try both .md and .svx extensions
	const mdPath = path.join(process.cwd(), 'src', 'content', 'blog', `${slug}.md`);
	const svxPath = path.join(process.cwd(), 'src', 'content', 'blog', `${slug}.svx`);

	let content: string;

	if (fs.existsSync(mdPath)) {
		content = fs.readFileSync(mdPath, 'utf-8');
	} else if (fs.existsSync(svxPath)) {
		content = fs.readFileSync(svxPath, 'utf-8');
	} else {
		throw error(404, `Post not found: ${slug}`);
	}

	return new Response(content, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
};
