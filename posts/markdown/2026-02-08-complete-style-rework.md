---
title: Complete Style Rework
slug: complete-style-rework
date: 2026-02-08
description: The website looks so much cleaner and different
---

# Complete Style Rework

## Intro

Soooo, my bad for not posting 😬. Hey but on a good note, the end product looks sooo goood 🤤! I'm not used to adding intro headings, I usually add this text like this in my markdown:

```markdown
# <site-title>

<this text>
```

but now I gotta go like:

```markdown
# <site-title>

## Intro

<this text>
```

Small but breaks muscle memory

## Changes

I mean, what is there to talk about. You can see the difference! For starters, the color scheme is nice, I'm no web designer but I think I cooked. This list is just the main ones I can see right now.

### H2s (subheadings)

Each H2 is seperated into boxes.

### And H3s? (subsubheadings)

I added a nice line ontop of those to make it look seperated, with plenty of margins

### Home page

Yeah the home page is hella clean, I think it falters a bit when you scroll down (going from minimalistic to a little cluttered), but hey it is the first _actual_ style iteration (the other one was PURELY AI generated). It has the parralax effect, which is really nice! Also the latest post is glowing at the top, with the 3 recent posts on the bottom (meant to convey what I did in the entire month). Then all the other posts are at the bottom. I'm really proud of a small thing I did, which is that in the older posts, the title is perfectly situated on the border with it breaking a little. I did that by adding a split background, like this:

```css
background: linear-gradient(to bottom, #10254d 0%, #10254d 50%, #0e1c36 50%, #0e1c36 100%);
```

### Navbar

The navbar is very clean. It has `position: sticky`, meaning that when you scroll down it sticks to the top of your screen but when you scroll back up it detaches. The links don't take you anywhere (except of course the "arjun's blog" link).

### Code

```markdown
# markdown

## code

### wow

incredible I know
```

So code blocks are a thing. Tried to add a copy button but didn't work.

### Links

So [links](https://www.arjuns-blog.vercel.app) have this really nice colour and transition. You can also see this transition on the "Go home button".

## Next steps

Next what (I anticipate should) be coming:

- _actually_ filling out the navbar links
  - mainly a full portfolio
- adding copy button to code boxes
- making a google sitemap (just something google wants for SEO that lists all the sites)
- maybe a commenting/liking feature?
- dates to posts on home page (I don't know where those went, I did add them)
- mobile (or small computer, this site doesn't even function on _chromebooks_)
  - this includes hamburger menus, adusting post card sizes (I'm sorry if you're on a small screen my monitor is big, but at the same time I don't care)

## Ending

Sorry for not posting for almost a month, felt really uncomfortable working on web dev for so long. This isn't my environment, it's either in the game engine or with wires beside me. I feel like developers with personal websites have an obligation to make it look good, even if they're not web devs or web designers. Anyways, hope whatever's going on around you is a-okay. Bye, thanks for reading (that was kinda corny but what else do you say at the end of a blog?)!
