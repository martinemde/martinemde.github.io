import type { PageLoad } from './$types';
import { getAllPosts } from '$lib/utils/posts';

export const load: PageLoad = async () => {
  const posts = await getAllPosts();

  return {
    posts
  };
};
