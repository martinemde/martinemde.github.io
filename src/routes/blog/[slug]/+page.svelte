<script lang="ts">
  import { page } from '$app/stores';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>{data.metadata.title ? `${data.metadata.title} - Martin Emde` : 'Martin Emde'}</title>
  {#if data.metadata.description}
    <meta name="description" content={data.metadata.description} />
  {/if}
</svelte:head>

<article class="relative">
  <a
    href="/blog/{$page.params.slug}.txt"
    class="absolute right-0 top-0 rounded-full bg-surface-100-900 px-3 py-1 text-xs font-medium text-surface-600-400 transition-colors hover:bg-surface-200-800 hover:text-surface-900-50"
    title="View plain text version"
  >
    txt
  </a>

  <header class="mb-8 border-b border-surface-200-800 pb-8">
    {#if data.metadata.title}
      <h1 class="mb-4 text-4xl font-bold">{data.metadata.title}</h1>
    {/if}
    {#if data.metadata.date}
      <div class="text-sm text-surface-600-400">
        {new Date(data.metadata.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>
    {/if}
  </header>

  <div class="prose prose-lg max-w-none dark:prose-invert">
    <data.content />
  </div>
</article>
