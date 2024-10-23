---
layout: post
title:  "params.expect - How To Use The New Ruby on Rails Feature"
excerpt_separator: <!--more-->
---

# {{ page.title }}

As part of [Cloud City Development](https://cloudcity.io)'s ongoing effort to support Ruby open source, I'm proud to announce [the new `params.expect` feature](https://github.com/rails/rails/pull/51674) that I added to Rails 8.
<!--more-->

## Params: An Attack Vector

Typically, we protect Rails controller params from user tampering with `params.permit`. This is necessary to prevent users from crafting params that insert attributes or alter behavior, like assigning admin permissions to yourself.

{% highlight ruby %}
  def update
    user_params = params.require(:user).permit(:name, :favorite_pie)

    if @user.update(user_params)
      redirect_to :user
    else
      render :edit
    end
  end
{% endhighlight %}

This works great when users submit a form correctly and even when they try to insert extra fields, like `admin=true` into the params. These attacks get filtered out.

But protecting us from correctly submitted forms and extra attributes is not enough. What if, as we regularly see on RubyGems.org, a user is trying to break your application by submitting malformed params? You will start to see problems.

The solution in Rails 8 is the new `params.expect`.

## How do I use it?

If you don't want to dig into Rails parameter filtering right now, you can simply do the following in Rails 8:

{% highlight ruby %}
  def update
    # OLD
    # user_params = params.require(:user).permit(:name, :favorite_pie)

    # NEW (see how it mirrors the expected params?)
    user_params = params.expect(user: [:name, :favorite_pie])

    if @user.update(user_params)
    # ...
  end
{% endhighlight %}

When using `expect`, you mirror the structure of the params hash that you expect. The key `:user` will be required and `:name, :favorite_pie` will be permitted.

The `params.expect` method should, in most cases, fully replace `permit` and `require` in almost all controller code. Unless a param is optional, you probably want to use `expect`.

The benefit, which I will go into in this post, is that expect will also enforce the structure of the params. If `params[:user]` returns something unexpected, like a `String` or an `Array`, Rails will now correctly tell the client that they have submitted a malformed request, rending a 400 error.

Additionally, if you expect an array, you need to be explicit about it.

{% highlight ruby %}
# allows an Array of favorite_pies, but not an array of users.
params.expect(user: [ :name, favorite_pies: [[ :flavor ]] ])
#                        Requires an Array  ^^         ^^
{% endhighlight %}

The rest of this post will dig into why and how the new syntax works, how to use it, and some of the gotchas that you might experience with this change.

## Params tampering

I briefly alluded to the problem with the old params filtering pattern. What if the users sends this?

`PATCH /user/1?user=hax`

The result, using our old code above, is this:

```
NoMethodError in UsersController#update
undefined method `permit' for an instance of String
```

It's not so bad. The filtering did prevent bad input from being interpreted, but it raised a 500 error. That's not great.

It probably also got reported to an exception tracking service. Also not great if you're on call.

### NoMethodError: undefined method 'permit' for instance of String

Not only is an unhandled 500 annoying, but the error raised is extremely generic. We cannot safely rescue `NoMethodError` and carry on like nothing happened. We will end up suppressing errors we really want to know about.

Now, in RubyGems.org's case, the hacker sees an unhandled 500, so they try it again. And again. And Again. And Again.

Now someone is getting paged for a high 500 error rate. 😭

You could change all of your params filtering to be really careful, checking each type in the params chain before calling the next method, but this is tedious and ugly (believe me, I tried. It prompted me to push this fix upstream to Rails.)

## Digging in to `Parameters` internals.

The problem happens because `require` does not, must not, care about what type it is returning. It cannot ensure that an instance of `ActionController::Parameters` is returned whenever one is needed, but return the `String` or `Array` when you want it to. Unfortunately, the user agent sending the request is in control of what type is returned from `require`.

Params formats are defined by a Rails standardized format compatible with `www-form-urlencoded`. If you want to send a hash, an array or a string, Rails provides the following pattern for doing so:


_Note that I am ignoring URI % encoding for readability._
{% highlight ruby %}
# A Hash:
PATCH /users/1/?user[name]=martin&user[favorite_pie]=pumpkin
# params = { "user" => { "name" => "martin", "favorit_pie" => "pumpkin" } }

# An Array:
POST /pies?pies[][flavor]=pumpkin&pies[][flavor]=pecan
# params = { "pies" => [
#            { "flavor" => "pumpkin" },
#            { "flavor" => "pecan" }
#          ] }

# A String:
POST /search?q=hello+world
# params = { "q" => "hello world" }
{% endhighlight %}

## What's going on exactly?

Let's try our problem query in the rails console:

{% highlight ruby %}
irb> params = ActionController::Parameters.new(user: "hax")
=> #<ActionController::Parameters {"user"=>"hax"} permitted: false>
irb> params.require(:user)
=> "hax"
irb> params.require(:user).permit(:name, :email)
undefined method `permit' for an instance of String (NoMethodError)

params.require(:user).permit(:name, :email)
                     ^^^^^^^
{% endhighlight %}

As you can see, the return value of `require(:user)` is `"hax"` and `"hax"` does not have a method named `permit`.

Despite us asking nicely for users to submit a hash for the `:user` key, they sent a String. Hrmph!

### And what are you going to do about it?

Since these URI query string formats are controlled by the client, we need a way to filter out unexpected formats.

Our goal is the tell the user that their request is malformed by sending a 400 Bad Request error back to the client. Rails will do this automatically when `ParameterMissing` is raised, so we can do that ourselves for the wrong type.

{% highlight ruby %}
# ugly
user_params = params.require(:user)
raise ActionController::ParameterMissing.new(:user, {}) unless user_params.respond_to?(:permit)
user_params = user_params.permit(:name, :favorite_pie)
{% endhighlight %}

I discovered a better version when I was trying to solve this problem for RubyGems.org. It has a few flaws, but it works well enough.

{% highlight ruby %}
# a little better
user_params = params.permit(user: [:name, :favorite_pie]).require(:user)
{% endhighlight %}

The above, or something like it, is what you'll need to do before Rails 8.

## The Array problem

Using `permit` in this less common way shown above is better, but there is a problem with Arrays that is almost just as bad as the problem we were trying to solve in the first place.

The `permit` method is more permissive than we would really like. The format `permit(user: [:name, :favorite_pie])` will allow either of the following params:

{% highlight ruby %}
# allowed params
ActionController::Parameters.new(user: { name: "Martin" })
# also allowed, maybe not what you expected
ActionController::Parameters.new(user: [ { name: "Martin" } ])
{% endhighlight %}

When `permit` is given an array as the value, e.g. `[:name]`, it allows either a hash with those keys, or an array of hashes with those keys. This can be inconvenient at best and may even present a security problem if use the params in a particular way.

You can solve this problem, but again his is getting ugly.

{% highlight ruby %}
user_params = user_params.first if user_params.is_a?(Array)
{% endhighlight %}

### A New Syntax for Arrays in `params`

In order to avoid the Array problem, `expect` now _only_ accepts hashes when given the format `[:name]`. If you actually want an Arry, you specify it explicitly with the new (and hopefully not too confusing) format:

{% highlight ruby %}
# explicit array syntax: a double array
comments = params.expect(comments: [[:text]])
{% endhighlight %}

This explicit Array syntax will only allow an Array, and reject with a 400 error any other params structure (like a Hash or String).

{% highlight ruby %}
params = ActionController::Parameters.new(
    comments: [
        {text: "hello"},
        {text: "world"}
    ]
{% endhighlight %}

By resolving this ambiguity in params parsing and improving the syntax and security of features used by every Rails engineer, we are able to reduce false alarms, better protect application data, and maybe reduce the number of engineers getting paged in the middle of the night.

## Let's keep making this better

Right now I'm committed to improving the Ruby, RubyGems, and Ruby on Rails ecosystems for everyone. The RubyGems.org team, and I "upstream" improvements to the gems we use as a matter of principle. We want Ruby to be the best choice for building applications. We also work closely with other ecosystems like Python and Rust, to ensure best practices across languages.

Are you and your company comfortable being blown around by the winds of open source? To avoid the worst case scenarios, your company needs at least one engineer on your team dedicating their time to open source maintenance. Securing your applications and your developers is a lot like having an IT department to protect your computers.

If you use Ruby, then you rely on the work of the RubyGems team. I'd love to work with you to help your team make good on the open source bargain.

If you want to bring us in to work with your team to improve or maintain some of the open source you rely on, could you do better than to employ the world class team at Cloud City Development? With core team members that commit to the most important projects in Ruby, you can feel confident about your usage of open source by retaining Cloud City Development.
