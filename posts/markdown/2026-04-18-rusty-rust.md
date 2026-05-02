---
title: Rusty Rust + NAS updates
slug: rusty-rust
date: 2026-04-18
description: Fun with Rust and stuff
---
# Rusty Rust

## Intro
Wsp? Sorry for the late post; I was trying Rust and some updates for my NAS. I really like Rust as a language, had some stigma as a C++ lover but otherwise it's a solid language and it might replace C++ as my main. Why? Not because it's better, just because it's more modern, libaries are developed more often, and I haven't encountered memory issues yet but I think down the line they will come more. And for my NAS, I can now access it anywhere and I started tapping into Syncthing.

## Rust
## Review
It's a pretty good language. I never really liked it because of bias but this time I took away the bias. I like the errors (just so clear and helpful), I like the `Result` type (which is a builtin type to tell if an error was thrown or not, sounds simple but it's really embedded into the language).

## Projects

### Todos
I made a little todos CLI, pretty nice. All it does is adds, removes, and lists todos, using a simple `JSON` file as backend. A todos app is a really nice way to get to know a new language if you already know how to code. Project's 100 ish lines, a decent polished project. I didn't really finish it though because I got so excited to start exploring...

### SDL
So this was the main thing I was doing in C++, just `SDL` games in `SDL2`. What's a better project to do than that? Also, I figured since I'm doing a new language I might as well learn a new version of `SDL`, aka `SDL3`. So far, it's exactly like the C++ library, which is pretty nice and farmilliar, obviously it has Rust syntax. I got to say though, the build system is pretty nice with Cargo. Add `sdl3` under dependencies and you're good to go. I didn't fetch it from git yet, takes from wherever `cargo` gets it from, but I will eventually. For those who don't know, the reason you would fetch from `git` instead of the system is because you would have to manually install `SDL3` on your system, as opposed to it just getting `sdl3` itself from `git` and it working out of the box. So far, I'm just on the stage of using the docs' examples to get a window up and running, encountering some errors, but those are just starting errors and I can't say anything negative about Rust just from the starting errors.

## Outro

Rust is good. You look good. Hope everything's going good. Peace.
