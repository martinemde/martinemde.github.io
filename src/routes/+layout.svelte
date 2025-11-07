<script lang="ts">
  import '../app.css';

  let { children } = $props();
</script>

<div class="min-h-screen bg-surface-50-950 text-surface-950-50">
  <!-- Header -->
  <header class="border-b border-surface-200-800">
    <div class="container mx-auto max-w-4xl px-4">
      <div class="flex items-center justify-between py-6">
        <h1 class="text-xl font-semibold">
          <a href="/" class="anchor">Martin Emde</a>
        </h1>
        <nav class="space-x-6">
          <a href="/blog" class="anchor">Blog</a>
          <a href="/about" class="anchor">About</a>
        </nav>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="container mx-auto max-w-4xl px-4 py-12">
    {@render children()}
  </main>

  <!-- Footer -->
  <footer class="border-t border-surface-200-800 py-8">
    <div class="container mx-auto max-w-4xl px-4 text-center text-sm text-surface-600-400">
      <p>&copy; 2025 Martin Emde. All rights reserved.</p>
    </div>
  </footer>
</div>
