---
layout: post
title:  "We Need Junior Engineers Now More Than Ever"
excerpt_separator: <!--more-->
---

I recently watched something remarkable happen at my company. A domain expert, someone with deep knowledge in their field but zero traditional programming experience, built a useful tool using Cursor. They understood their pain points, knew what they wanted to create, and worked with cursor until it solved their problem.

This is the promise of AI-assisted coding, and it's genuinely exciting.

Then they asked a simple question: "How do I share this with my team so they can use it too?"

That's when I realized we're facing a massive shift in how engineering teams need to work, and most companies aren't ready for it.

## The Gap Between Vibes and Infrastructure

The traditional engineering answer to "how do I share this?" goes something like: "Work with platform ops to get a deployment set up. Can you make a PR to the terraform to allocate a new internal domain and configure storage? The app generator should help you get it deployed."

To a domain expert who just learned to code with AI assistance, this is complete gibberish.

They'll paste it into ChatGPT and get an answer that's technically correct but practically useless. If they're persistent, they'll ask again. More likely, they'll feel discouraged, like they don't have the support they need, or they'll figure it out themselves in ways that make security teams very nervous.

This creates problems no company wants:

- Domain experts discouraged from contributing their unique expertise
- [Shadow IT](https://en.wikipedia.org/wiki/Shadow_IT) deployments containing customer data, financial information, or company IP running outside IT controls
- Senior engineers spending days supporting each small contribution, defeating the entire productivity promise
- Security vulnerabilities from well-meaning people who don't know what they don't know

When someone suggests "just use ngrok to share it," that might expose an internal system to lateral attacks that could compromise the entire company. The gap between working prototype and safe deployment is real.

## We've Been Here Before

Engineers faced a similar crossroads years ago. Dan McKinley captured it perfectly in his ["Egoless Engineering"](https://egoless.engineering/) talk.

He describes a designer who was encouraged to contribute to an application and accidentally broke the build late at night. The team had a choice: lock it down so only "real engineers" could deploy, or make deploys safe for everyone.

McKinley made a different choice: "Randy is in the deploy group now. The how and when can be worked out off-list, but it is now _possible_ for him to deploy to prod."

That decision required a mindset shift. Engineers had to ensure deploys were safe for _anyone_ to run. They had to build systems that enabled contribution instead of gates that prevented it.

This is empowerment. This is what unlocked modern DevOps.

We're at that moment again, but the scale is completely different.

## The Skill Spectrum Just Doubled

Traditionally, a "junior engineer" meant someone fresh from college or a bootcamp, someone who proved they could program before getting hired. They understand commits, dependencies, deployment, URLs. They speak the vocabulary.

Now imagine the engineering skill spectrum doubling, with a new, more junior, tier: domain experts using AI to code. There may be as many people in this new group as our entire existing engineering organization.

Here's what makes this interesting: _these aren't typical juniors_. These are domain experts. In the past, some of our best bootcamp hires were teachers, healthcare workers, or business analysts who brought 10+ years of domain expertise. What they lacked in technical skill, they made up for in their ability to understand the problem space deeply.

The difference now? They don't need a bootcamp. They can start contributing with AI assistance immediately, if we support them properly.

## The New Engineering

This shift changes everything about how we structure teams:

Domain Expert Vibe Coders (the new juniors): Deep domain knowledge, can build prototypes with AI assistance, need support getting from prototype to deployed application

Classically Trained Junior Engineers (now mid-level): 4 years of CS degree practice, understand deployment, security, infrastructure basics. They can pair with domain experts to make something deployable.

Senior Engineers (platform builders): Create the systems that make safe self-service possible for everyone below them

The Magic: A domain expert with the drive to solve their own problems knows _what_ needs to be built. Pair them with a classically-trained engineer who knows _how_ to build it safely. You get domain expertise (accounting, legal, HR, operations) combined with the system thinking and engineering vocabulary to bridge from prototype to infrastructure.

## Growing Experts into Engineers

Here's what this pairing actually looks like in practice: imagine a mid-level engineer sitting with a domain expert who's building a tool to automate part of their workflow. The engineer isn't taking over the keyboard, they're teaching how to think about programming. They're helping refine prompts: "Try asking having it create a plan before it starts coding." They're explaining software structure: "Let's look at where the data flows through your app so you can modify it later." They're helping to understand the shape of the application: "It seems like we could use a GUI library for this instead of a website."

This is a special role. These vibe-support engineers need to be teachers, not just coders. They need to resist the urge to say "let me just fix this for you" and instead pair with domain experts to learn they domain while they share their understanding of code. The goal isn't to build the feature, it's to help the domain expert become more capable with each iteration.

These supporting engineers become the bridge between embedded domain expert teams and the platform engineering team. They speak both languages.

Now the shift begins and the domain experts become our next wave of engineers, while the fresh college graduates pairing with are the next senior platform engineers.

## What This Means for Hiring

Keep hiring classically "junior" programmers. They're not really juniors anymore, a 4-year CS degree puts them squarely in the middle of the pack. You need them now more than ever.

Don't pair senior engineers with vibe coders. That defeats the productivity promise. Senior engineers should be building platforms that enable safe self-service.

Embed fresh engineers on domain teams where vibe coding is happening. They provide the vocabulary and systematic approach that turns prototypes into deployable applications. Even more importantly, they're helping domain experts grow into engineers.

## What We Need to Build

The platform engineering work is important. We need to start with the foundation and build up:

1. Template projects that encode best practices and security controls from the start, these are your blessed paths that every new project should begin with
2. Push-button deployment paths that work safely for non-experts, if it's not one click, it's too complicated
3. Agent rules and context that guide AI assistants toward your company's blessed paths before anyone writes a line of code
4. Guardrails that catch sensitive data access and security issues automatically, these are your safety nets
5. Code review agents that help onboard people into safe practices by explaining what they're catching and why
6. Tiered GitHub organization structure with appropriate access controls, not everyone needs the same access to everything, but everyone needs safe access to code sharing.
7. Data movement controls that prevent accidental leaks to unapproved channels, especially critical as more non-engineers contribute

We used to talk about letting anyone press the deploy button. Now we're talking about customer service, accounting, legal, and operations teams pushing code used in daily operations or production systems. The guardrails need to match this reality.

## What Engineering Needs To Do Now

1. **Start with discovery.** Create a reach-out team to find the domain experts in your organization who are already using AI tools to code. They're already there, in operations, in customer support, in finance. Find them before they create shadow IT problems.
2. **Hire supportive junior engineers.** Bring in recent college graduates who are familiar with AI-assisted coding and hire them explicitly with the mandate to teach. Value tutoring or mentoring experience.
3. **Embed with experts.** Pair these early career engineers with domain experts who are vibe coding. Their primary job is to support the domain experts to contribute and bridge the gap with platform engineers.
4. **Support everyone.** Senior engineering talent should learn from, guide, and support these mid-level teaching engineers. As you build the platform, grow your early career engineers to contribute to the platform to support their domain experts.
5. **Invest heavily in your platform.** Keep platform capabilities and guidance top of mind for your senior engineers. _Are you ready for non-engineers to deploy new applications?_ Investments in better bootstrapping, templates, context, and blessed paths support ALL engineers, not just the most junior. This is not a "nice to have", it's foundational infrastructure.
6. **Learn from the platform companies.** Look at how Fastly, Cloudflare, and Heroku set up templates for new projects with push-button deploys. You don't just need push-to-deploy, you need templates for your company's preferred application structures. AI agents will build to the structures you give them. Your internal systems, your data policies, your security requirements. You need to make _your company's_ deployment easy.
7. **Accept the new reality.** You can't just trust engineers to make the best decisions anymore. They might not even know what language they're writing their application with (let's face it, it's probably Python). That's not a criticism, it's the reality of AI-assisted development. Your infrastructure needs to encode best practices so deeply that doing the right thing is automatic.

## The Stakes

Get this right, and we unlock an enormous amount of domain expertise that was previously bottlenecked behind engineering teams. We empower the people who understand the problems best to contribute solutions directly.

Get it wrong, and we either discourage valuable contributions, create security nightmares, and spend senior engineering time ineffectively.

The technical problems are solvable. The question is whether we're willing to make the organizational changes to solve them.

We've done this before with DevOps. We can do it again with vibe coding domain experts. But it requires acknowledging that the spectrum of "engineer" is now much broader than it used to be and building our teams accordingly.

The domain experts are already vibe coding. Are we ready to embrace them?
