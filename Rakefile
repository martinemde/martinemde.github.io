
desc "Run the jekyll server"
task :serve do
  sh "bundle exec jekyll serve --livereload"
end

namespace :serve do
  desc "Run the jekyll server with drafts"
  task :drafts do
    sh "bundle exec jekyll serve --livereload --drafts"
  end
end
