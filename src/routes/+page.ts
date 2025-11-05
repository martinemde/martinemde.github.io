import type { PageLoad } from './$types';
import { getRecentPosts } from '$lib/utils/posts';

// Prerender the page at build time with the latest posts
export const prerender = true;

export const load: PageLoad = async () => {
  // Load the 2 most recent blog posts for the homepage
  const recentPosts = await getRecentPosts(2);

  return {
    recentPosts
  };
};
