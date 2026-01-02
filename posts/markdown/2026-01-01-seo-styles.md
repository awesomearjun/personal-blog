---
title: Site SEO + Styles
slug: seo-style
date: 2026-01-01
description: <description>
---

# Site SEO + Styles

HAPPY NEW YEARS 🎉🎉🎉<br>
Sorry I didn't post, kinda either forgot or it was too close to my bedtime, I'll get back on the grind. That's not to say I didn't work on this project though. The work I did was quite a bit, although it takes a few words to explain. I keep forgetting to order the parts for the project, mostly because I don't know _what_ to order (posted a [reddit question](https://www.reddit.com/r/AskRobotics/comments/1q1ba4b/power_source_structure/), help if you can).

## Website SEO

Firstly, if you look at the top of your site, you should see a nice, elegant URL. Should along the lines of `/post/`, followed by a glamourous slug (in this case `seo-styles`). This is better for SEO than just the raw HTML filenames as before. The way I made this URL was through Angular routing (god I love Angular).

### SEO

So basically I had to change my last setup (which was a bunch of html files stored in a folder), to one that has each component as a page. This was kinda hard though, because the way I go about blog posts is as such: first, I write in markdown because it's easy to use and visualize, second I run a script that turns it into HTML, third I use Angular's HTTP library to get the HTML from my filesystem. So like, if my sites are in HTML files, how am I supposed to turn them into components?<br>

The way I did it was by first creating a `blog-post` component, and then in the component's template (aka the html for the component) I put a `div`, and property binded the attribute `innerHTML` to a signal containing my actual blog's HTML. Like so:

```
<div [innerHTML]="content"></div>
```

For all you non angular users, I'll dumbify it: a signal is a reactive variable, when it changes everything else using it changes; property binding is just if you have an attribute in HTML and you want it to connect to a variable (like `innerHTML` connects to `content`)<br>

### Styling

Yeah I just let my copilot in VSCode just write it out. Nothing to it, just a `tab`. These are just placeholder styles though, it's a mere shadow of what it's going to look like

## Ending

I did my blog before dinner! That's time-management and responsibility right there. Starting off 2026 semi-strong. Good night, good morning, and good whatever else's outside your window.
