import { getAllPosts, type Post } from '$lib/utils/posts';

const siteUrl = 'https://martinemde.com';
const siteTitle = 'Martin Emde';
const siteDescription = 'Blog posts by Martin Emde';
const siteEmail = 'me@martinemde.com';

export async function GET() {
  const posts = await getAllPosts();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${siteTitle}</title>
		<description>${siteDescription}</description>
		<link>${siteUrl}</link>
		<atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${feedItems(posts)}
	</channel>
</rss>`.trim();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}

function feedItems(posts: Post[]): string {
  return posts
    .map(
      (post) => `
		<item>
			<title>${escapeXml(post.title)}</title>
			<description>${escapeXml(post.description || '')}</description>
			<link>${siteUrl}/blog/${post.slug}</link>
			<guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
			<pubDate>${new Date(post.date).toUTCString()}</pubDate>
			${post.author ? `<author>${siteEmail} (${escapeXml(post.author)})</author>` : ''}
		</item>`
    )
    .join('');
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
