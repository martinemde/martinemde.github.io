---
layout: post
title:  "How to convert to `params.expect` in Rails 8.0"
excerpt_separator: <!--more-->
---

Today I updated RubyGems.org to use [the new `params.expect` feature](/2024/10/22/how-to-rails-params-expect.html) that I recently added to Rails 8. I ran into some situations that made my first few commits fail the test suite.

Let's go over them so you understand how to fix these situations.

<!--more-->

## The Easy Part

You can search and replace for the most basic changes.

Use the following find and replace regex as a starting point. However, there will be some cases you can't fix this easily.

If you don't have good test coverage, be careful changing any `permit` that has an array in the args (like `permit(key: [:other, :keys])`).

```
Find `params.require\(:([^\)]+)\).permit\(([^\)]+)\)`
Replace `params.expect($1: [$2])`
```

I suggest converting the simple ones and leaving the complex ones for later.
After making the easiest changes, search for `permit` and find anything with multi-line or more complicated code.

Once you've converted everything, run your tests. There might be some things that broke

The most common reason is going to be the newe explicit array syntax in `params.expect`.

## Missing Explicit Arrays

Because `params.expect` requires explicitly declaring expected Arrays, you'll need to fix those manually where they occur.
This is because `params.permit` did not distinguish between `[:key]` meaning an array of hashes, or a single hash.
This could lead to some input problems in users send incorrect params.

Hopefully your tests will fail with something like this:

```
Expected response to be a <2XX: success>, but was a <400: Bad Request>
```

Go back and make sure you have test coverage for the usecase and then try again.

Here's an example I ran into today:

{% highlight ruby %}
# Original
params.permit(api_key_role: [
  :name,
  :oidc_provider_id,
  api_key_permissions: [:valid_for, scopes: [], gems: []],
  access_policy: {
    statements_attributes: [ # notice the single array here
      :effect,
      principal: :oidc,
      conditions_attributes: %i[operator claim value]
    ]
  }
]).require(:api_key_role)
{% endhighlight %}

The problem is that `statements_attributes` should be an array of hashes.
To require that key to be an array, `params.expect` needs us to wrap the array in second array.

{% highlight ruby %}
# Fixed
params.expect(api_key_role: [
  :name,
  :oidc_provider_id,
  api_key_permissions: [:valid_for, scopes: [], gems: []], # this doesn't change
  access_policy: {
    statements_attributes: [[ # notice the double array change here
      :effect,
      principal: :oidc,
      conditions_attributes: [%i[operator claim value]] # notice the double array here too
    ]]
  }
].freeze
{% endhighlight %}

I left a lot of the extra detail here so you can see what does and does not change.

Note how some of the arrays in the example don't change and some do.
The first one that I commented as "doesn't change" is `api_key_permissions` which expects a Hash value with 3 keys, 2 of which are arrays. The empty arrays will allow any scalar values (numbers, strings, booleans), but not nested hashes or arrays.

The fix here is to add a double array for key `statements_attributes` and `conditions_attributes`.
This requires the value to be an array of hashes like the following (simplified, nesting reduced):

{% highlight ruby %}
access_policy: {
  statements_attributes: [
    { effect: "", principal: { oidc: "" }, conditions_attributes: [ { operator: "", claim: "", value: "" }, ... ] },
    { ... }
  ]
}
{% endhighlight %}

## A Hash of Hashes with IDs for Keys

The next one stumped me for a bit before I tested it in the Rails console.
The controller seemed very simple and I thought nothing of it during my search and replace.

{% highlight ruby %}
params.expect(ownerships: %i[push owner])
{% endhighlight %}

However, our tests failed with the telltale `params.expect` failure:

```
Expected response to be a <3XX: redirect>, but was a <400: Bad Request>
```

I looked at the form and it sends something like the following, which I put it into the Rails console (`bin/rails c`) to test:

{% highlight ruby %}
> params = ActionController::Parameters.new(
  ownerships: {
    "123" => { push: "on", owner: "on" },
    "456" => { push: "off", owner: "off" }
  }
)
=> #<ActionController::Parameters {"ownerships"=>{"123"=>{"push"=>"on", "owner"=>"on"}, "456"=>{"push"=>...
> params.expect(ownerships: [%i[push owner]])
=> #<ActionController::Parameters {"123"=>#<ActionController::Parameters {"push"=>"on", "owner"=>"on"} permitted: true>, "456"=>#<ActionController::Parameters {"push"=>"off", "owner"=>"off"} permitted: true>} permitted: true>
{% endhighlight %}

I thought this would be tricky, but Rails StrongParameters has rules that treat this like an array.
The fix is just the same as the others: add a second set of array square brackets.

{% highlight ruby %}
params.expect(ownerships: [%i[push owner]])
{% endhighlight %}

Usually the changes should be this simple. Find single arrays that need to become explicit double arrays.

## Go Forth and Expect

Mostly you can rest assured that if your original `permit` worked, then Rails already knows how to parse the input.
The changes made to `expect` don't change how rails parses permitted params.
The new behavior distinguishes between expected arrays and expected hashes, requiring you to choose which one your controller needs.

You can see all the changes I made in the [GitHub PR for RubyGems.org](https://github.com/rubygems/rubygems.org/pull/5357) if you're looking for real examples.

## Anything I Didn't Cover?

I can imagine a few more situations that might be tricky, but I'm assuming that if you encounter any of these, you're already doing some tricks with permitting in your existing controller. Make sure your tests cover the situation and then see if you can use `expect`.

If you encounter more problems, please let me know on whatever social you can find me on. (maybe check the [homepage](/)?)
