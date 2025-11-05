import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const { slug } = params;

  try {
    // Try both .md and .svx extensions
    const post = await import(`../../../content/blog/${slug}.md`);

    return {
      content: post.default,
      metadata: post.metadata
    };
  } catch {
    try {
      const post = await import(`../../../content/blog/${slug}.svx`);

      return {
        content: post.default,
        metadata: post.metadata
      };
    } catch {
      throw error(404, `Post not found: ${slug}`);
    }
  }
};
