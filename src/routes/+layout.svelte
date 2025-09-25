<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white">
	<!-- Header -->
	<header class="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
		<div class="container mx-auto px-4">
			<div class="flex items-center justify-between py-4">
				<div class="flex items-center">
					<h1 class="text-xl font-bold text-white">
						<a href="/" class="transition-opacity hover:opacity-75">Martin Emde</a>
					</h1>
				</div>
				<nav class="space-x-4">
					<a href="/blog" class="btn btn-sm variant-ghost-surface text-white hover:bg-white/20"
						>Blog</a
					>
					<a href="/about" class="btn btn-sm variant-ghost-surface text-white hover:bg-white/20"
						>About</a
					>
				</nav>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="container mx-auto min-h-screen px-4 py-8">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="bg-slate-100 py-8 dark:bg-slate-900">
		<div class="container mx-auto px-4 text-center text-sm text-slate-600 dark:text-slate-400">
			<p>&copy; 2024 Martin Emde. All rights reserved.</p>
		</div>
	</footer>
</div>
