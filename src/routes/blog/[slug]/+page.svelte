<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>{data.metadata.title ? `${data.metadata.title} - Martin Emde` : 'Martin Emde'}</title>
  {#if data.metadata.description}
    <meta name="description" content={data.metadata.description} />
  {/if}
</svelte:head>

<article>
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
