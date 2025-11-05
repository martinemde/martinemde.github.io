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

<article class="mx-auto max-w-4xl">
  <header class="mb-8">
    {#if data.metadata.title}
      <h1 class="h1 mb-4">{data.metadata.title}</h1>
    {/if}
    {#if data.metadata.date}
      <div class="text-surface-500 mb-4">
        {new Date(data.metadata.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>
    {/if}
  </header>

  <div class="prose prose-lg max-w-none">
    <data.content />
  </div>
</article>
