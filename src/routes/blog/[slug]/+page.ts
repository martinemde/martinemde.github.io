import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getPostBySlug } from '$lib/utils/posts';

export const load: PageLoad = async ({ params }) => {
  const { slug } = params;

  const post = await getPostBySlug(slug);

  if (!post) {
    throw error(404, `Post not found: ${slug}`);
  }

  return post;
};
