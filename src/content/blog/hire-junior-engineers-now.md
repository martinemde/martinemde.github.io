---
title: 'We Need Junior Engineers Now More Than Ever'
date: 2025-10-28
author: Martin Emde
description: 'AI coding tools are creating a new type of junior engineer: domain experts who can vibe code but need support to deploy safely'
published: true
slug: hire-junior-engineers-now
---

# We Need Junior Engineers Now More Than Ever

I recently saw a profound thing happen in my company because of AI coding tools.

A person with zero engineering experience, but with deep knowledge in their field, built a useful tool using Cursor. That's not the story though. We all know that's happening everywhere right now.

Then they asked a simple question: "How do I share this with my team so they can use it too?"

I hopped on a Zoom meeting to try to help, and what I saw both inspired and profoundly shifted my view about the role of engineering in larger organizations.

We're facing a massive shift in how engineering teams need to work, and most companies aren't ready for it.

## The Gap Between Vibes and Infrastructure

The traditional engineering answer to "how do I share this?" goes something like: "Work with platform ops to get a deployment set up. Make a PR to the terraform to allocate a new internal domain and configure an ECR repo for the docker image? The app generator should help you do this if it follows our standard framework guidelines."

To a Customer Service manager or Accountant who just vibed out a solution to their problem, this is complete gibberish.

If they're persistent, they'll ask again. More likely, they'll feel discouraged or they'll figure it out themselves in ways that might make security teams very nervous.

This creates problems no company wants:

- Domain experts, people with deep experience outside of engineering, discouraged from contributing their expertise
- [Shadow IT](https://en.wikipedia.org/wiki/Shadow_IT) containing customer data, financial information, or company IP running outside IT controls
- Senior engineers spending days supporting each small contribution, defeating the entire productivity promise of AI
- Security vulnerabilities from well-meaning people who don't know what they don't know

The technical solution that might be fine for an engineer could be dangerous for inexperienced coders and could compromise the entire company. The gap between working prototype and safe deployment is big.

## Vibe Coding

I'm all in on vibe coding. As an experienced engineer, I see huge productivity gains from using AI coding tools. But they're not without their problems.

As engineers, we can see when our coding agents are going sideways. When Claude starts dropping a new ALLCAPS.md for everything we ask, and creating the 3rd copy of a script it already wrote, we know it's time to reset context, adjust rules, or clarify requirements. When Cursor or Codex does something stupid, we reset back to the last commit.

New vibe coders don't know any of this. They end up with a directory containing a mix of sensitive data, cross-required python files, 20 random scripts, and `SIMPLE_QUICK_STARTUP_README_FIXED.md`. They're using a single conversation in cursor across days, have never heard of git, and cannot know which files might contain PII or financial data, because the whole point of their script is to work with this data.

Vibe Coding is its own skill set. It's an offshoot of engineering, and knowing what a good application looks like helps a lot, but after helping my son and my wife get started with Cursor, it's clear that you need an engineer around to steer you in the right direction when things go wrong and convey the mindset about clean context and clean code to support the AI agents.

We're facing a profound shift in who is capable of what, and we're going to need to decide where we want to go.

## We've Been Here Before

Engineers faced a similar crossroads years ago. Dan McKinley captured it perfectly in his ["Egoless Engineering"](https://egoless.engineeriang/) talk.

He describes a designer who was encouraged to contribute to an application and accidentally broke the build late at night. The team had a choice: lock it down so only "real engineers" could deploy, or make deploys safe for everyone.

McKinley made a different choice: "Randy is in the deploy group now. The how and when can be worked out off-list, but it is now _possible_ for him to deploy to prod."

That decision required a mindset shift. Engineers had to ensure deploys were safe for _anyone_ to run. They had to build systems that enabled contribution instead of gates that prevented it.

This is empowerment. This is what unlocked modern DevOps.

We're at that moment again, but the new "deploy group" is much larger than it was before.

## The Skill Spectrum Just Doubled

Traditionally, a "junior engineer" meant someone fresh from college or a bootcamp, someone who proved they could program before getting hired. They understand commits, dependencies, deployment, URLs. They speak the vocabulary.

Now the skill spectrum is doubling, with a new "expert junior" tier: domain experts using AI to code. There may be as many people in this new group as our entire existing engineering organization.

In the past, some of our best bootcamp hires were teachers, healthcare workers, or business analysts who brought 10+ years of domain expertise to their junior engineering skill set. What they lacked in technical skill, they made up for in their ability to understand the problem space deeply.

## The New Engineering Org

This shift changes everything about how we structure teams.

Domain Expert Vibe Coders (the new "expert juniors") bring deep domain knowledge. They can build prototypes with AI assistance but need support getting from prototype to deployed application.

Classically Trained Entry-Level Engineers (what we used to call "juniors") have 4 years of CS degrees or experience, understand coding, deployment, and infrastructure basics. They can pair with domain experts to make something useful and support vibe coding.

Senior Engineers (platform builders) now need to create the systems that make safe self-service possible and support the entry-level and junior experts to level up and contribute effectively.

Engineering is going to spread out into the entire organization, starting with domain experts solving their own problems. To get the most of their expertise, we need to pair them with a entry-level engineers who knows how to build software and wrangle the agents. You get domain expertise (accounting, legal, HR, operations) combined with the system thinking and engineering vocabulary that can bridge the gap from prototype to infrastructure and the traditional engineering team.

## Domain Experts Are The New Junior Engineers

Here's what this pairing actually looks like in practice: imagine a junior to mid-level  engineer sitting with a domain expert who's building a tool. The engineer isn't taking over, they're teaching how to think about programming. They're helping refine prompts and explaining software structure. They're helping the domain export to understand the shape of an application.

These vibe-support engineers need to be teachers. They need to resist the urge to say "let me just fix this for you" and instead pair with domain experts to learn they domain while they share their understanding of code. The goal isn't only to build the feature, it's to help the domain expert become more capable with each iteration.

Supporting engineers become the bridge between embedded domain experts and the platform engineering team. They speak both languages.

Now the shift begins and the domain experts become our next wave of junior engineers, while the fresh college graduates pairing with are the next senior platform engineers.

## What This Means for Hiring

We need to keep hiring classic early career "junior" programmers. They're not quite as junior anymore. A 4-year CS degree puts them squarely in the middle of the pack. You need them now more than ever to support the _new_ juniors.

Pairing senior engineers with junior export vibe coders risks undermining the productivity benefit of AI coding tools. Senior engineers should be building platforms that enable safe self-service best practices at your company.

Embed early career engineers on domain teams where vibe coding is happening. They provide the vocabulary and systematic approach that turns prototypes into deployable applications. Even more importantly, they're helping domain experts grow into engineers.

## What We Need to Build

1. Template projects that encode best practices and security controls from the start, these are your blessed paths that every new project should begin with
2. Push-button deployment paths that work safely for non-experts, if it's not one click, it's too complicated
3. Agent rules and context that guide AI assistants toward your company's blessed paths before anyone writes a line of code
4. Guardrails that catch sensitive data access and security issues automatically, these are your safety nets
5. Code review agents that help onboard people into safe practices by explaining what they're catching and why
6. Tiered GitHub organization structure with appropriate access controls, not everyone needs the same access to everything, but everyone needs safe access to code sharing.
7. Data movement controls that prevent accidental leaks to unapproved channels, especially critical as more non-engineers contribute

We used to talk about letting anyone press the deploy button. Now we're talking about _anyone_ pushing vibed code to production systems. The guardrails need to match this reality.

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
