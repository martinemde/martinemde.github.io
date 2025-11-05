/**
 * Utility functions for loading blog posts
 * Uses Vite's import.meta.glob for build-time processing
 */

export interface PostMetadata {
  title: string;
  date: string;
  author?: string;
  description?: string;
  published?: boolean;
  slug: string;
}

export interface Post extends PostMetadata {
  path: string;
}

/**
 * Load all published blog posts, sorted by date (newest first)
 */
export async function getAllPosts(): Promise<Post[]> {
  const allPostFiles = import.meta.glob('../../content/blog/*.{md,svx}');
  const iterablePostFiles = Object.entries(allPostFiles);

  const allPosts = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const resolved = (await resolver()) as {
        metadata: PostMetadata;
      };
      const { metadata } = resolved;

      return {
        ...metadata,
        path
      };
    })
  );

  // Filter published posts and sort by date (newest first)
  return allPosts
    .filter((post) => post.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get the most recent N posts
 */
export async function getRecentPosts(limit: number): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}
