---
title: finish-blog
date: 2025-12-25
description: GUYS I TECHNICALLY FINISHED IT
---

# Finish blog

Sorry for short blog, kinda felt lazy today. Didn't work on electrical project because it's at the stage where I actually _have_ to build a car using a material such as cardboard, so I just worked on the blog.

## Blog

So as a refresher, last time I broke my markdown parser (I type sites in markdown because it's easy and light, then I have a script to convert that to HTML) because of some kinda "import" issue. The way I fixed it in a nutshell: seperate `tsconfig`s, and better file structure.

### What was happening

I wanted to have a post interface to have an actual data type to store my posts, and also so I can get that sweet sweet TypeScript intellesense. So, I make a global file to store the interface because both my Angular project and my parser on the backend needed to access it.

The problem was that Angular and Node (technically ts-node) import stuff differently. Angular does all the import stuff for you, but only works within `src/` (what I mean is when you try to import a custom standalone TypeScript file, you don't need the extension), and Node (technically ts-node) most of the time likes to have their imports as `.js`, because it gets compiled to JavaScript. Also, Angular has a setting in their `tsconfig` that I don't know what the heck it does but it sure does cause problems for what I want to do (I'm talking about `module: preserve`).

UPDATE: I just went on the TypeScript docs (quick question: when's the last time you went on a language **doc**). Apparently, `module: preserve` is for bundled code (which is Angular, pretty sure that means that the code comes together to be hyper-efficient, and it can take `require()` or `import` but no one uses `require()`).

What I needed for my backend was `module: nodenext`, but editing the default `tsconfig` destroyed Angular (I'm talking errors so big you need a vertical monitor). So after a bunch of unnessasary scrambling for a solution, I came across a very simple and easy solution: just make two `tsconfig`s (gosh I know some advanced god non-vibe coder is reading this and probably getting so bored)!

So yeah, that's all I did today. Made a `tsconfig` for the backend specifically and ran the parser through the it. But hey, it's more about the quality of your work than your quantity!

What does this finally mean: I can technically publish this website (going to do it on Vercel for the first time because my **PAST** bestie Netlify isn't letting me sign in 😡).

## Ending

Yup, that's it. I made a blog post before dinner, so that's good. Usually keeps me up past my bedtime a little. Good night, good morning, good anything else. I'mma go try to speedrun Minecraft.
