---
title: Window'd Rust
slug: windowd-rust
date: 2026-05-02
description: Finally found out how to *actually* have Rust create something useful
---
# Window'd Rust
## Intro
So I've just been grinding Rust, and am at the point where I can sort of make something useful. Last time, I explained that I wanted to try out graphics programming in Rust (because that was what I was doing in C++), and I tried SDL because it had bindings for Rust. Turns out that's not the meta. The meta is `winit` and `wgpu`, way more low-lever than SDL (which is what I like). The only problem with both is that they are very new, and the ENTIRE API CHANGES EVERY VERSION.

## Window
Since every version changes the entire API, there was no new tutorial for the latest version, so me and ChatGPT had to figure it out. I ended up with `winit` 0.30 (the latest version). I gotta say, it's pretty clean and developer-oriented. Combined with Rust, it's a nasty duo. The new API is OOP oriented, which was a big thing in C++ because it keeps the entry function clean:
```rust
// main.rs
use winit::event_loop::EventLoop;

mod app;

fn main() {
    let event_loop = EventLoop::new().unwrap();
    let mut triangle = app::App::default();

    event_loop.run_app(&mut triangle).unwrap();
}
```
It's important for the main function to be clean, because what if you want to port it onto a website (for example)? You don't want to write another chunk of code just to port, so 3 lines is perfect. This code takes a struct `App` from a file called `app.rs`, which is like so:
```rust
// app.rs
use winit::{
    application::ApplicationHandler,
    event::*,
    event_loop::{ ActiveEventLoop, EventLoop },
    window::Window,
    keyboard::{ Key, NamedKey }
};

// app state
pub struct App {
    window: Option<Window>,
}

impl Default for App {
    fn default() -> Self {
        Self {
            window: None,
        }
    }    
}

impl ApplicationHandler for App {
    fn resumed(&mut self, event_loop: &ActiveEventLoop) {
      // setup
    }

    fn window_event(
        &mut self,
        event_loop: &ActiveEventLoop,
        window_id: winit::window::WindowId,
        event: WindowEvent,
    ) {
      // event handling
    }

    fn about_to_wait(&mut self, event_loop: &ActiveEventLoop) {
      // redraw
    }
}
```

You use functions for the different events, very easy to use. You can spin up a window in a few lines of code. But graphics is another thing...

## Graphics
OMD graphics was another thing entirely. Coming from SDL, it was like waking up because someone suddenly raised the blinds in a bright summer day. This wasn't easy `winit` now, it was an entirely different library (`wgpu`). Shaders, pipelines, render passes, bind groups, buffers, queues... All these words sound very cool, but I have absoluetly no clue what any of them mean. ChatGPT said they all sound more complicated then they are, but still. Right now, I'm onto getting a triangle on the screen, and I just coded the shader in `wgsl`
```rust
// shader.wgsl
@vertex
fn vs_main(@builtin(vertex_index) i: u32) -> @builtin(position) vec4<f32> {
	var pos = array<vec2<f32>, 3>(
		vec2<f32>(0.0, 0.5),
		vec2<f32>(-0.5, -0.5),
		vec2<f32>(0.5, -0.5),
	);

	return vec4<f32>(pos[i], 0.0, 1.0);
}

@fragment
fn fs_main() -> @location(0) vec4<f32> {
	return vec4<f32>(1.0, 0.0, 0.0, 1.0);
}
```

I'm pretty sure it's just Rust but on the GPU, but all these @ symbols are hypnotic spirals. All I know is that `@vertex` is a vertex shader, meaning that it defines each vertex, and `@fragment` is a fragment shader, meaning that it should run on each pixel. But still, if I had to code this myself I couldn't. I still gotta have practice with this.

## Outro
So this Rust graphics programming thing is such a joy to program. As I said before, Rust is a very developer-oriented language, SUPER easy to pick up (aside from just simple syntax but that's fine). If Rust is vanilla ice cream, then `winit` (and barely `wgpu`) makes it a Dairy Queen Oreo Brownie Cupfection (10/10 must try). Really excited to see where this goes, hope to have some games running up soon, (*maybe* and 3D renderer 🤞?). Anyways, hope it's all fine on the other side, peace.
