import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getAllPosts } from '$lib/utils/posts';

export const prerender = false;

export const load: PageLoad = async ({ params }) => {
  const { segments } = params;

  // Match pattern: year/month/day/slug or year/month/day/slug.html
  const match = segments.match(/^(\d{4})\/(\d{2})\/(\d{2})\/(.+?)(\.html)?$/);

  if (!match) {
    // Not a valid date-based URL pattern
    throw redirect(301, '/blog');
  }

  const [, year, month, day, slug] = match;

  // Get all posts and find one matching the date and slug
  const posts = await getAllPosts();
  const post = posts.find((p) => {
    const postDate = new Date(p.date);
    const postYear = postDate.getFullYear().toString();
    const postMonth = (postDate.getMonth() + 1).toString().padStart(2, '0');
    const postDay = postDate.getDate().toString().padStart(2, '0');

    return (
      postYear === year &&
      postMonth === month &&
      postDay === day &&
      p.slug === slug
    );
  });

  if (!post) {
    // No matching post found, redirect to blog index
    throw redirect(301, '/blog');
  }

  // Redirect to the new slug-based URL
  throw redirect(301, `/blog/${post.slug}`);
};
