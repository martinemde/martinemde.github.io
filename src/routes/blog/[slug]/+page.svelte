<script lang="ts">
  import type { PageData } from './$types';
  import { Share2, Copy, Check } from 'lucide-svelte';
  import { page } from '$app/stores';

  let { data }: { data: PageData } = $props();
  let copied = $state(false);

  async function copyToClipboard() {
    try {
      // Fetch the plain text version
      const response = await fetch(`/blog/${data.metadata.slug}.txt`);
      const text = await response.text();

      // Copy to clipboard
      await navigator.clipboard.writeText(text);

      // Show feedback
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  }

  async function shareArticle() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: data.metadata.title,
          text: data.metadata.description || data.metadata.title,
          url: window.location.href
        });
      } catch (error) {
        // User cancelled or error occurred
        console.error('Failed to share:', error);
      }
    } else {
      // Fallback to copying URL
      await navigator.clipboard.writeText(window.location.href);
    }
  }
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

  <footer class="mt-12 border-t border-surface-200-800 pt-6">
    <div class="flex items-center gap-4">
      <span class="text-sm text-surface-600-400">Share this article:</span>
      <div class="flex gap-2">
        <button
          onclick={shareArticle}
          class="inline-flex items-center gap-2 rounded-lg border border-surface-300-700 px-4 py-2 text-sm transition-colors hover:bg-surface-100-900"
          aria-label="Share article"
        >
          <Share2 size={16} />
          <span>Share</span>
        </button>
        <button
          onclick={copyToClipboard}
          class="inline-flex items-center gap-2 rounded-lg border border-surface-300-700 px-4 py-2 text-sm transition-colors hover:bg-surface-100-900"
          aria-label="Copy article text"
        >
          {#if copied}
            <Check size={16} class="text-success-500" />
            <span>Copied!</span>
          {:else}
            <Copy size={16} />
            <span>Copy Text</span>
          {/if}
        </button>
      </div>
    </div>
  </footer>
</article>
