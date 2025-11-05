<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Martin Emde</title>
  <meta name="description" content="Technical blog posts about software engineering" />
</svelte:head>

<div>
  <h1 class="mb-12 text-4xl font-bold">Blog</h1>

  <div class="space-y-12">
    {#each data.posts as post (post.slug)}
      <article class="border-b border-gray-200 pb-12 dark:border-gray-800">
        <h2 class="mb-2 text-2xl font-semibold">
          <a href="/blog/{post.slug}" class="hover:text-gray-600 dark:hover:text-gray-400">
            {post.title}
          </a>
        </h2>
        <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
        {#if post.description}
          <p class="text-gray-700 dark:text-gray-300">{post.description}</p>
        {/if}
      </article>
    {/each}
  </div>
</div>
