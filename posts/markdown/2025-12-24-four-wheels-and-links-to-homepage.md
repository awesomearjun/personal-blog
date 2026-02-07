---
title: Four Wheels and Links To Homepage
slug: four-wheels-and-links-to-homepage
date: 2025-12-24
description: My car officially has 4 wheels and I put links from my blogs to my homepage
---

# Four Wheels and Links To Homepage

## Intro

Guys, I have sad news 😔...
My parser is broken 😭

If you don't already know, I am working on my main project to be a smart car using a Raspberry Pi and Arduino. Last time, I talked about how I figured out how to make them both communicate. My side project (which is slowly becoming my main) is this website, and last time I talked about how I got my a markdown to HTML parser to work (but now it doesn't).

## Electrical Project

Aside from the bad news at the top, I also found my 4th gear motor so now I have a quad-wheeled car! I just realized right now a bug in my Raspberry Pi Program as I'm writing this, basically the thing about having 4 wheels is that my back motors and one way and my front motors are another, so this means I might have to move my back wheels forwards and front wheels backwards to move the car forward. I was also too scared to test it because last time my wires tangled (it doesn't have a proper structure yet) so that's all I did physically.

Later, I was just thinking about how to power my car, because I can't just have it wired right now it moves. Theres two parts to this: powering my Raspberry Pi, and powering my motors (I don't need to power my Arduino because the Raspberry Pi is connected to it via cable, and that's okay because they will be moving in unison). After this, I was wondering how I could make the Raspberry Pi run a script when it's not wired, since it has an operating system on it and right now I have to manually do `python <myscript>`, and turns out it's pretty easy. All you have to do is just edit a file to say to run this script when the OS boots.

## Blog website

As I was saying, my parser broke. A moment of silence... Don't get it wrong, because of my sheer programming skill I did get it to put the HTML links of my blogs onto the homepage, but then I thought "Huh, the links wouldn't be enough, because I also need all the other metadata to my blogs on the homepage (e.g., the date, the description), so I changed the data type of the parser.

I know it's hard to just visualize in the air, so I'll explain how it works a little. So first, I use a library called `gray-matter` to extract the metadata from my blog post. How does it know the metadata? Well, I code each blog in markdown (because it's easy to just type), and at the top I put the hidden metadata like this:

```
---
title: Four Wheels and Links To Homepage
date: 2025-12-24
description: My car officially has 4 wheels and I put links from my blogs to my homepage
---
```

If you're a true OG (let's be real, none of you are because this site is only on github not deployed yet), you would see a HTML fieldset with the legend of "Metadata" displaying it all. It's not going to last though, because that's just debug info so that I know I _have_ info to put on the homepage.

Back to the data types thing, before all the data in my JSON file (I have one to store all the file links so that I don't have to manually loop through all the files to find all the sites because filesystem stuff isn't allowed on the frontend), was only storing the name and link of the website, nothing else (no date, no description). But then I wanted the date and description. I was just typing the data type for this object in raw variable notation, like:

```ts
let post: { [key: string]; string };
```

It was going to get messy with all that data, but because I'm coding in TypeScript, I had access to `interfaces`. I needed multiple files to access the interface, and I knew a simple way to do this was to just make a global module that stores all the global data types etc I need for the project. BUT TYPESCRIPT just wanted to make that complicated and make imports not work good, so that's what I'm stuck on.

## Ending

Sorry for the bad writing, I do feel kinda guilty that if someone other than me is _actually_ reading this, it's going to be hard to understand. But I am doing this just to track my progress, and it is a side project. It's a little tricky to time manage this with everything else I wanna do, but I'll get better. It's 9:09, my bedtime is 9:30, I got things to do, good night good morning good everything else.
