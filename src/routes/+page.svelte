<script lang="ts">
	// Home page with author bio and latest posts
</script>

<svelte:head>
	<title>Martin Emde</title>
	<meta name="description" content="Software Engineer Consultant, RubyGems Maintainer" />
</svelte:head>

<div class="mx-auto max-w-4xl">
	<!-- Hero/About Section -->
	<section class="card variant-filled-surface mb-8 p-8">
		<div class="prose prose-lg max-w-none">
			<p>
				Software Engineer Consultant at <a
					href="https://cloudcity.io/"
					rel="external"
					class="anchor">Cloud City Development</a
				>. Maintainer of
				<a href="https://github.com/rubygems/rubygems" rel="external" class="anchor">RubyGems</a>,
				<a href="https://rubygems.org" rel="external" class="anchor">RubyGems.org</a> &amp; Bundler.
				Learn more about my work on
				<a href="https://github.com/martinemde" rel="external" class="anchor">GitHub</a>.
			</p>
		</div>
	</section>

	<!-- Latest Posts Section -->
	<section>
		<h2 class="h2 mb-6">Latest Updates</h2>
		<div class="space-y-6">
			<div class="card variant-filled-surface p-8">
				<div class="prose prose-lg max-w-none">
					<h3 class="h3">
						<a href="/blog/how-to-convert-to-rails-params-expect" class="anchor">
							How to convert to `params.expect` in Rails 8.0
						</a>
					</h3>
					<p>
						After updating RubyGems.org to use the new `params.expect` feature in Rails 8, I thought
						it might be helpful to go over a few of the challenges I ran into.
					</p>
					<p class="text-center">
						<a
							href="/blog/how-to-convert-to-rails-params-expect"
							class="btn variant-filled-primary"
						>
							Continue reading&hellip;
						</a>
					</p>
				</div>
			</div>

			<div class="card variant-filled-surface p-8">
				<div class="prose prose-lg max-w-none">
					<h3 class="h3">
						<a href="/blog/how-to-rails-params-expect" class="anchor">
							How to: Rails `params.expect`
						</a>
					</h3>
					<p>
						In this post I will describe the new `params.expect` feature that I recently added to
						Rails 8 and go over how it works and how to use it.
					</p>
					<p class="text-center">
						<a href="/blog/how-to-rails-params-expect" class="btn variant-filled-primary">
							Continue reading&hellip;
						</a>
					</p>
				</div>
			</div>
		</div>
	</section>
</div>
