<script lang="ts">
  import { Share2, Copy, CopyCheck } from 'lucide-svelte';

  interface Props {
    slug: string;
    title: string;
    description?: string;
  }

  let { slug, title, description }: Props = $props();
  let copied = $state(false);

  async function copyToClipboard() {
    try {
      // Copy the URL to the plain text version
      const url = `${window.location.origin}/blog/${slug}.txt`;
      await navigator.clipboard.writeText(url);

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
          title,
          text: description || title,
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

<div class="flex gap-2">
  <button
    onclick={copyToClipboard}
    class="inline-flex items-center gap-2 rounded-lg border border-surface-300-700 px-3 py-1 text-sm transition-colors hover:bg-surface-100-900"
    aria-label="Copy link to Markdown"
    title="Copy link to Markdown"
  >
    {#if copied}
      <CopyCheck size={16} class="text-tertiary-500" />
      <span>LLM</span>
    {:else}
      <Copy size={16} />
      <span>LLM</span>
    {/if}
  </button>
  <button
    onclick={shareArticle}
    class="inline-flex items-center gap-2 rounded-lg border border-surface-300-700 px-2 py-1 text-sm transition-colors hover:bg-surface-100-900"
    aria-label="Share article"
  >
    <Share2 size={16} />
    <span>Share</span>
  </button>
</div>
