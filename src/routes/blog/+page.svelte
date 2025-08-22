<script lang="ts">
	// Blog listing page
	import { page } from '$app/stores';
	
	const posts = [
		{
			title: "How to convert to `params.expect` in Rails 8.0",
			date: "2024-12-21",
			excerpt: "After updating RubyGems.org to use the new `params.expect` feature in Rails 8, I thought it might be helpful to go over a few of the challenges I ran into.",
			url: "/2024/12/21/how-to-convert-to-rails-params-expect.html"
		},
		{
			title: "How to: Rails `params.expect`",
			date: "2024-10-22", 
			excerpt: "In this post I will describe the new `params.expect` feature that I recently added to Rails 8 and go over how it works and how to use it.",
			url: "/2024/10/22/how-to-rails-params-expect.html"
		}
	];
</script>

<svelte:head>
	<title>Blog - Martin Emde</title>
	<meta name="description" content="Technical blog posts about Ruby, Rails, and software engineering" />
</svelte:head>

<div class="max-w-4xl mx-auto">
	<h1 class="h1 mb-8">Blog</h1>
	
	<div class="space-y-8">
		{#each posts as post}
			<article class="card variant-filled-surface p-8">
				<div class="prose prose-lg max-w-none">
					<h2 class="h2 mb-4">
						<a href={post.url} class="anchor">
							{post.title}
						</a>
					</h2>
					<div class="text-sm text-surface-500 mb-4">
						{new Date(post.date).toLocaleDateString('en-US', { 
							year: 'numeric', 
							month: 'long', 
							day: 'numeric' 
						})}
					</div>
					<p class="mb-4">{post.excerpt}</p>
					<p>
						<a href={post.url} class="btn variant-filled-primary">
							Read more
						</a>
					</p>
				</div>
			</article>
		{/each}
	</div>
</div>