<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Blog - Martin Emde</title>
	<meta
		name="description"
		content="Technical blog posts about Ruby, Rails, and software engineering"
	/>
</svelte:head>

<div class="mx-auto max-w-4xl">
	<h1 class="h1 mb-8">Blog</h1>

	<div class="space-y-8">
		{#each data.posts as post (post.slug)}
			<article class="card variant-filled-surface p-8">
				<div class="prose prose-lg max-w-none">
					<h2 class="h2 mb-4">
						<a href="/blog/{post.slug}" class="anchor">
							{post.title}
						</a>
					</h2>
					<div class="text-surface-500 mb-4 text-sm">
						{new Date(post.date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</div>
					{#if post.description}
						<p class="mb-4">{post.description}</p>
					{/if}
					<p>
						<a href="/blog/{post.slug}" class="btn variant-filled-primary"> Read more </a>
					</p>
				</div>
			</article>
		{/each}
	</div>
</div>
