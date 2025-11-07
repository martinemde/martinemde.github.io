<script lang="ts">
  import { codeToHtml } from 'shiki';
  import { onMount } from 'svelte';

  interface Props {
    code: string;
    lang?: string;
    theme?: string;
  }

  let { code, lang = 'typescript', theme = 'github-dark' }: Props = $props();
  let html = $state('');

  onMount(async () => {
    html = await codeToHtml(code, {
      lang,
      theme
    });
  });
</script>

{#if html}
  <div class="code-block [&>pre]:rounded-lg [&>pre]:p-4 [&>pre]:overflow-x-auto">
    {@html html}
  </div>
{:else}
  <pre class="rounded-lg bg-surface-900 p-4 text-surface-50"><code>{code}</code></pre>
{/if}
