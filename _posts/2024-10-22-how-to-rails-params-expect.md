---
layout: post
title:  "How to: Rails `params.expect`"
excerpt_separator: <!--more-->
---

In this post I will describe [the new `params.expect` feature](https://github.com/rails/rails/pull/51674) that I recently added to Rails 8 and go over how it works and how to use it.

Update: For an implementation guide, see [my second post on `params.expect`](/2024/12/21/how-to-convert-to-rails-params-expect.html).

## params: An Attack Vector

All web application programmers learn not to trust user input.

Rails has long provided a simple pattern to prevent param tampering: `params.permit`. This protects our app from users that may alter params in order to insert attributes or alter behavior, like assigning admin to yourself.

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

This works great when users submit the form correctly and even when they try to insert extra fields, like `admin=true` into the params. These attacks get filtered out.

But protecting us from correctly submitted forms and extra attributes is not enough. What if, as we regularly see on RubyGems.org, a user is trying to break your application by submitting malformed params? Problems start to emerge.

The solution in Rails 8 is the new `params.expect`.

<!--more-->

## How do I use `params.expect`?

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

When using `params.expect`, mirror the structure of the params hash that you expect.
In the example above, the key `:user` will be required and the keys `:name, :favorite_pie` will be permitted (as long as they are not arrays or hashes themselves).

The `params.expect` method should, in most cases, fully replace `permit` and `require` in almost all controller code. Unless a param is optional, you probably want to use `expect`.

The benefit, which I will go into in this post, is that expect will also enforce the structure of the params. If `params[:user]` returns something unexpected, like a `String` or an `Array`, Rails will now correctly tell the client that they have submitted a malformed request, rending a 400 error.

Additionally, if you expect an array, you need to be explicit about it.

{% highlight ruby %}
# allows an Array of favorite_pies, but not an array of users.
params.expect(user: [ :name, favorite_pies: [[ :flavor ]] ])
#     Note the explicit Array format above: ^^         ^^
{% endhighlight %}

The rest of this post will dig into why and how the new syntax works, how to use it, and some of the gotchas that you might experience with this change.

## The Problem of Params Tampering

I briefly alluded to the problem with the old params filtering pattern. What if the user sends this?

{% highlight ruby %}
PATCH /user/1?user=hax
{% endhighlight %}

The result using our old code above is an error:

```
NoMethodError in UsersController#update
undefined method `permit' for an instance of String
```

It's not _so_ bad. The filtering did prevent bad input, but it raised a 500 error. Not great.

It probably also got reported to an exception tracking service. Also not great if you're getting paged.

### NoMethodError: undefined method 'permit' for instance of String

Not only is an unhandled 500 annoying, but the error raised is extremely generic. We cannot safely rescue `NoMethodError` and carry on like nothing happened. We will end up suppressing errors we really want to know about.

Now, in RubyGems.org's case, the hacker sees an unhandled 500, so they try it again. And again. And Again. And Again.

Now someone is definitely getting paged for a high 500 error rate. 😭

You could change all of your params filtering to be really careful, checking each type in the params chain before calling the next method, but this is tedious and ugly (believe me, I tried. It prompted me to push this fix upstream to Rails.)

### Digging into `ActionController::Parameters` internals.

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

The above, or something like it, is what you'll need to do on versions of Rails before Rails 8.

## The Array problem

Using `permit` in this less common way shown above is better, but there is a problem with Arrays that is almost as bad as the problem we were trying to solve in the first place.

The `permit` method is more permissive than we would really like. The format `permit(user: [:name, :favorite_pie])` will allow either of the following params:

{% highlight ruby %}
# allowed params
ActionController::Parameters.new(user: { name: "Martin" })
# also allowed, maybe not what you expected
ActionController::Parameters.new(user: [ { name: "Martin" } ])
{% endhighlight %}

When `permit` is given an array as the value, e.g. `[:name]`, it allows either a hash with those keys, or an array of hashes with those keys. This can be inconvenient at best and may pose a security problem if use the params in a particular way.

You can solve this problem, but again this is getting ugly.

{% highlight ruby %}
user_params = user_params.first if user_params.is_a?(Array)
{% endhighlight %}

### A New Syntax for Arrays in `params`

In order to avoid the Array problem, `expect` now _only_ accepts hashes when given the format `[:name]`. If you actually want an Array, specify it explicitly with the new (and hopefully not confusing) format:

{% highlight ruby %}
# explicit array syntax: a double array
comments = params.expect(comments: [[:text]])
{% endhighlight %}

This syntax will only permit an Array and reject, with a 400 error, any other params structure (like a Hash or String).

{% highlight ruby %}
params = ActionController::Parameters.new(
    comments: [
        {text: "hello"},
        {text: "world"}
    ]
)
comments = params.expect(comments: [[:text]])
# => { "comments" => [ {"text" => "hello"}, {"text" => "world"} ] }
comments = params.expect(comments: [:text])
# => ActionController::ParameterMissing
{% endhighlight %}

By resolving this ambiguity in params parsing and improving the syntax and security of features used by every Rails engineer, we are able to reduce false alarms, better protect application data, and maybe reduce the number of engineers getting paged in the middle of the night.

## Let's keep making this better

Right now I'm committed to improving the Ruby, RubyGems, and Ruby on Rails ecosystems for everyone. The RubyGems.org team, and I "upstream" improvements to the gems we use as a matter of principle. We want Ruby to be the best choice for building applications. We also work closely with other ecosystems like Python and Rust, to ensure best practices across languages.

Are you and your company comfortable with your reliance on open source? To avoid worst case scenarios, your company needs at least one engineer on your team dedicating their time to open source maintenance.
If you use Ruby, then you rely on the work of the RubyGems team. I'd love to work with you to help your team succeed in the Ruby ecosystem.

If you would like to work with me and my colleagues to improve or maintain the code you rely on, connect with me at [Cloud City Development](https://cloudcity.io) where you can hire our world class team.
