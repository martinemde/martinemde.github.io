<script lang="ts">
  import '../app.css';

  let { children } = $props();
</script>

<div class="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
  <!-- Header -->
  <header class="border-b border-gray-200 dark:border-gray-800">
    <div class="container mx-auto max-w-4xl px-4">
      <div class="flex items-center justify-between py-6">
        <h1 class="text-xl font-semibold">
          <a href="/" class="hover:text-gray-600 dark:hover:text-gray-400">Martin Emde</a>
        </h1>
        <nav class="space-x-6">
          <a href="/blog" class="hover:text-gray-600 dark:hover:text-gray-400">Blog</a>
          <a href="/about" class="hover:text-gray-600 dark:hover:text-gray-400">About</a>
        </nav>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="container mx-auto max-w-4xl px-4 py-12">
    {@render children()}
  </main>

  <!-- Footer -->
  <footer class="border-t border-gray-200 py-8 dark:border-gray-800">
    <div
      class="container mx-auto max-w-4xl px-4 text-center text-sm text-gray-600 dark:text-gray-400"
    >
      <p>&copy; 2025 Martin Emde. All rights reserved.</p>
    </div>
  </footer>
</div>
