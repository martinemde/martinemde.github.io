---
layout: post
title:  "Rails ERB Template Error Highlighting"
excerpt_separator: <!--more-->
---

To highlight (ahem) some of my latest work on the ERB template highlighter in Rails, I thought it would be fun to look at how Rails has handled error highlighting over the years.

What I found is not what I expected.

## Error Templates

In development, Rails renders any exceptions in a debugging template to help developers quickly find the problem.

![Rails Error Template](/images/rails_error_template.png)

To trigger errors, I made some example templates that contain various things that can be tricky to highlight. I'm only triggered NameErrors.

`simple_error.html.erb`

```
This is a <%= simple_error %> that occurs on a very simple line.
```

`duplicate_error.html.erb`

```
<%= "Here" %> we have a duplicate <%= duplicate %> on a line that can cause confusion.
```

`error_after_multi_line_method.html.erb`

```
<%= link_to(
 "Blog (no error here)",
 "/"
) %>

<%= simple_error_after_multi_line_method %>
```

`multi_line_error_start.html.erb`

```
<%= multi_line_error_start(
  "When there's an opening tag, we know it's code"
) %>
```

`multi_line_error_middle.html.erb`

```
<%= link_to(
  multi_line_error_middle,
  "When it's in the middle, we sometimes fail to understand that the line is code"
) %>
```

`multi_line_error_end.html.erb`

```
<%= link_to(
 "At the end with the closing tag, we again know it's code",
 multi_line_error_end) %>
```

### Rails 6.1

_The oldest rails I already had installed._

To use an older installed rails gem to generate an app, use the special executable version selection syntax native to rubygems:

```
rails _6.1.5_ new rails61
```

I added the above templates and visited each of the pages.
I expected the debug templates to highlight the wrong lines in at least some of the multi-line template.

To my surprise, they all worked great. Every line with an error is highlighted correctly and shown within the ERB template.

<aside>

## How template highlighting works

One of the tricky challenges of highligting errors within ERB templates is that the templates are compiled into ruby code.

The compiled ruby code is very different than the original template.
Here's the code for the first, simple error template.

{% highlight ruby %}
def _app_views_blog_simple_error_html_erb__3927922359354183954_21820(local_assigns, output_buffer, &_)
  @virtual_path = "blog/simple_error";; @output_buffer.safe_append='This is a '.freeze; @output_buffer.append=( simple_error ); @output_buffer.safe_append=' that occurs on a very simple line.
'.freeze;
@output_buffer
end
{% endhighlight %}

In order to display the error highlight, the debug template (more specifically the exception wrapper) must find which line (and which columns) from the compiled template correspond to which line and columns in the source template.

As you can see from above, our 1 line template (with a final newline) becomes a 5 line method.

With the default ERB handler, lines are mostly rendered faithfully with no newlines added. If you compensate for the single additional newline, you can mostly assume a 1 to 1 mapping between error line and template line.
With other ERB handlers, such as BetterERB, the compiled template looks even more different.

When the highlighter cannot match the corresponding line or column in the template, it displays the compiled ruby instead. I'll call that a "fallback".
When the highlighter fails entirely and 500.html is shown, I'll call that a "fail".

</aside>

### Rails 7.0

In Rails 7.0 the template highlighter still worked great. There was no visible change from Rails 6.1. Every template highlighted the correct line.

### Rails 7.1

Everything broke!

This is not what I expected.
I thought what I would find is an increasing progress towards better error rendering.
What I found instead is that Rails 7.1 broke various error highlighting in the erb templates.

Most of my example error templates fallback to compiled ruby instead of showing the corresponding line in the source template.
The only ones that don't fallback are `error_after_multi_line_method`, `multi_line_error_start`, and `multi_line_error_end`.

The obvious difference between 7.0 and 7.1 is the addition of column highlighting (showing a yellow highlight on the actual word or method that failed).
This column highlighting really makes the working debugger views much better, but the addition was preventing source highlighting

While fallback isn't _so bad_, it does make it harder for newer developers and provides an inconsistent experience for everyone.

### Rails 7.2

People probably noticed the high fallback rate in the 7.1 error highlighter because rails 7.2 fixes most of them.
At least for the default ERB renderer, all of the errors templates, except one, render highlighted source with matching column highlighting.

The only remaining fallback is `multi_line_error_middle`, but at least the failing code is clearly highlighted on its own line.

### Rails ~>8.0.0

Rails 8.0.0 kept the same exception wrapper as 7.2. My fixes were not merged until after 8.0.0, so I'm testing with Rails edge (main branch).

All template hightlighting works, including highlights in the middle of a multi-line method.

## BetterErb made the problem worse, not better

The original incentive to fix this came from frustration with development on RubyGems.org.
During development, nearly every template error would cause a full failure.
Even errors in helpers or components would cause the debugger template crash completely and show the 500.html page.
This made it really unleasant to make a typo since you had to scroll back into the logs to figure out what happened.

At RubyConf Hack Day, I got fed up with it and and tried to discover what was causing it.
After misattributing it to Phlex, Marco Roth came over and together we managed to narrow it down to the BetterHTML gem (which includes BetterErb).

BetterHtml uses a validated ERB handler that should improve rendering.
Instead, because the output of BetterErb was much different than the ERB default in Rails, the debugger would crash when it tried to find the line and column containing an error.



## Thank You for Reading!

My work here was supported by [Cloud City Development](https://cloudcity.io) which has given me the time (and health insurance coverage) to work on Ruby open source.


Error highlighting is critical for new and experienced developers alike. Bad highlighting of errors in templates make debugging very difficult. It's especially frustrating for new developers who will have trouble understanding why the error is visible sometimes, but confusingly wrong in other situations.
