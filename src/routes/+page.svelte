<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>Martin Emde</title>
  <meta name="description" content="Software Engineer Consultant, RubyGems Maintainer" />
</svelte:head>

<div>
  <!-- Hero/About Section -->
  <section class="mb-12">
    <p class="text-lg text-gray-700 dark:text-gray-300">
      Developer Productivity (Modularity) at
      <a href="https://gusto.com" rel="external" class="hover:text-gray-600 dark:hover:text-gray-400">Gusto</a>. Founding member of
      <a href="https://gem.coop" rel="external" class="hover:text-gray-600 dark:hover:text-gray-400">gem.coop</a>. See also:
      <a href="https://github.com/martinemde" rel="external" class="hover:text-gray-600 dark:hover:text-gray-400">GitHub</a>.
    </p>
  </section>

  <!-- Latest Posts Section -->
  <section>
    <h2 class="mb-8 text-3xl font-bold">Latest Updates</h2>
    <div class="space-y-12">
      {#each data.recentPosts as post (post.slug)}
        <article class="border-b border-gray-200 pb-12 dark:border-gray-800">
          <h3 class="mb-2 text-2xl font-semibold">
            <a href="/blog/{post.slug}" class="hover:text-gray-600 dark:hover:text-gray-400">
              {post.title}
            </a>
          </h3>
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
  </section>
</div>
