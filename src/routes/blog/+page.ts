import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const allPostFiles = import.meta.glob('../../content/blog/*.{md,svx}');
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const resolved = (await resolver()) as {
				metadata: {
					title: string;
					date: string;
					author?: string;
					description?: string;
					published?: boolean;
					slug: string;
				};
			};
			const { metadata } = resolved;

			return {
				...metadata,
				path
			};
		})
	);

	// Filter published posts and sort by date (newest first)
	const posts = allPosts
		.filter((post) => post.published !== false)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return {
		posts
	};
};
