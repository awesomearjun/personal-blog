---
title: How I made my own lexer with marked
slug: images-html-seo
date: 2026-01-04
description: I made marked have a lexer so it can parse my site and make the result more SEO friendly. Also, I finally made images work and now each site has SEO
---

# How I made my own lexer with marked

Skip this paragraph and go to the next heading if you just want to know how. If you want to know the backstory or are a regular reader, then tune in. I had some insight, I want to make this blog more educational. Don't worry, I'll still try to be "funny" (if you think I'm funny), and I'll add my own personal touch but I just want to help people code the stuff that they want to code. Anyway, the progress I made on this was that I finally made images work on this blog. Don't believe me? Take a look:

![lucky you don't see this](/posts/assets/tenor-3188813723.gif 'get rekt bozo')

I also made it so that the HTML of every site has `section`s and `article`s and a bunch of other things Google loves. But how did I do all this?

## How to do it

### Make the variable

First, you'll need some markdown to use (that's what `file.content` is.) Now, you just make a tokens variable, like this:

```js
const tokens = marked.lexer(file.content);
```

`tokens` is of type `marked.TokensList`, which is an array of tokens. What is a token you may ask? It's just any HTML item, like a paragraph looks like:

```js
interface Paragraph {
  type: 'paragraph';
  raw: string;
  pre?: boolean;
  text: string;
  tokens: Token[];
}
```

Note that different elements have unique properties, like an image would have `href` and stuff but a `<br>` would have nothing at all. If you have trouble with the data types, it's really helpful to just look at the source code.

### Turn tokens into HTML

Just make a function or something, loop over every token, and check for your elements:

```js
function makeSEO(tokens: marked.TokensList, postPath: string): string {
    // this is what gets returned, add to this every token
    let site: string = "<article>";

    for (const token of tokens) {
        if (token.type === "heading" && token.depth === 1) {
            site = `<article>
            <header>
                <h1>${token.text}</h1>
            </header>
            `;
            continue
        }
        // so on and so forth
    }

    return site;
```

The indentation in the HTML might be kinda weird, so worth looking into formatting with `prettier` library if that's an issue.<br><br>
**If you don't functionality for an element, marked won't parse it, so put an else case and in there put `marked.parser([token])`**.<br><br>

### Special case: Images

Images are subtokens, not tokens. That means they would be in `token.tokens`, or `tokens.token.tokens`. Yeah, don't ask me why. So this is how I mingled with my images:

```js
if (token.type === "paragraph") {
    // if it's not an image, just render naturally
    if (token.tokens === undefined) {
        site += marked.parser([token]);
        continue;
    }

    // only take subtokens that are images
    const imgSubTokens = token.tokens.filter(t => t.type === "image");

    for (const imgSubToken of imgSubTokens) {
        // specific to me, explaination below
        imgSubToken.href = `/assets/postAssets/${path.basename(imgSubToken.href)}`;
    }

    site += marked.parser([token]);
    continue;
}
```

The specific to me comment is just because my problem was that my post markdowns are on the backend, but my post HTMLs are on the frontend, so the path differs. If you wanna know more about my parser, [click here](https://arjuns-blog.vercel.app/post/motors-site-generator-json).

## Personal struggles (in the coding)

Here we go (not in order)

- ChatGPT spitting lies, why can't he just see my pasted snippet and give me answer in sub 3 prompts, I'm so kind I'm not even asking for my first prompt to have an answer
- ChatGPT in VSCode shut down on me (he just dipped idk where he went)
- MERGING IN GITHUB (probably my fault BUT WHY IS GITHUB SO COMPLICATED WITH MERGING I JUST WANT `main` BRANCH TO BE SAME AS `dev`, I DON'T WANT TO BE 7 COMMITS BEHIND **AND** 7 COMMITS AHEAD)
- just web development being web dev (nothing wrong with Angular though, I love Angular)
- i wanna get back to electrical project but don't know specifically what parts to get

## Ending

Yeah so hope you like this, popularity and regular readers aren't too important to me. Again, that aspect is more for myself. I'll try to be more funny or still be funny, while at the same time being educational and also tracking my progress.
