---
title: Prod bug & style
slug: prod-bug-style
date: 2025-12-28
description: Fixed site prod bug and tried to do a little style
---

# Prod bug & style

## Intro

First of all, if you're reading this on Github: STOP. The website is working! Find it [here](https://www.arjuns-blog.vercel.app). Sorry if it's a little ugly cuz of dark mode, working on it!. I didn't work on car because I need to buy the components now, so I've only worked on this website.

## Website

Didn't do too much work, more thinking. So here's a todo list/timeline without times kinda plan for this project: first, I'll make this site look fairly good. Not any final styles yet (although thinking of some, a mix of a terminal theme and deep blue). Just making sure it works on mobile and computer. Second: SEO. I want this site to go on Google. I will have to install an Angular SEO think, and that requires me to make each site a component (right now they're just html files). Third: final styles, and fourth: final SEO. Anyways, I'll explain how I fixed the bug

### Bug fix

So what was happening is I had an Angular `signal` for my posts data (it was an array of a map sorta thing, visualize: `[ {title: ..., ..., ...}, {}, {} ]) `). What I was doing with the signal was I was mutating the array, but APPARENTLY that does NOT make it reactive (the entire purpose of the signal). What you had to do was make a NEW INSTANCE of that Object and set it as the signal. So yeah, I did that and it works

## Ending

I didn't want to drag this post, felt like I was beating around the bush with the other ones. But yeah, 8:06, want to sleep in my bedtime, no screens for an hour. Good night, good morning, good anything else, bye bye.
