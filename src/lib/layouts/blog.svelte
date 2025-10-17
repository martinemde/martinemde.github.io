<script lang="ts">
	import type { ComponentProps } from 'svelte';

	interface Props extends ComponentProps<'article'> {
		title?: string;
		date?: string;
		description?: string;
	}

	let { title, date, description, children }: Props = $props();
</script>

<svelte:head>
	<title>{title ? `${title} - Martin Emde` : 'Martin Emde'}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
</svelte:head>

<article class="mx-auto max-w-4xl">
	<header class="mb-8">
		{#if title}
			<h1 class="h1 mb-4">{title}</h1>
		{/if}
		{#if date}
			<div class="text-surface-500 mb-4">
				{new Date(date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</div>
		{/if}
	</header>

	<div class="prose prose-lg max-w-none">
		{@render children?.()}
	</div>
</article>
