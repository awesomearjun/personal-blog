---
title: (ALMOST) Rust Game
slug: almost-rust-game
date: 2026-05-09
description: Researched further into using Rust for game dev
---
# (ALMOST) Rust Game
## Intro
Kinda click-baity, didn't make a game *just* yet, but I could render stuff and that's sick. So far I have rendered:
- A triangle
- AN ENTIRE SQUARE

This is HUGE

## Triangle
So it did take 200 lines of code, but I did render a triangle and his is very cool. How did I do this? With this tech stack:
- Winit 0.30
- Wgpu 0.1
- Few other not really important libraries just for async and data and stuff

This is a pretty new stack, it's super hard to find tutorials on this, might make a YouTube video on it — stay tuned. The development process was like<br>
- I created a window with Winit (see [this](https://arjuns-blog.vercel.app/post/windowd-rust))
- I created a bunch of variables specific to graphics rendering, like so (I'll explain this in the next heading)
- I assigned them with Wgpu
- I just did a render pass

It looks super daunting, but the strat for this is truly to make projects and converse with ChatGPT to figure stuff out, then it has a rhythm to it.

### Graphics process
Imma explain all the variables and what they do

```rust
// this is my state struct, just keeps a bunch of data used for app
pub struct App {
    window: Option<Box<Window>>,
    instance: Option<wgpu::Instance>,
    surface: Option<wgpu::Surface<'static>>,
    adapter: Option<wgpu::Adapter>,
    device: Option<wgpu::Device>,
    queue: Option<wgpu::Queue>,
    config: Option<wgpu::SurfaceConfiguration>,
    pipeline: Option<wgpu::RenderPipeline>,
}
```
- `window`: it's a window (wow)
- `instance`: wgpu instance, so i create all the others referencing this first (like instance.create_surface())
- `surface`: gets the screen to draw on (akin to a canvas)
- `adapter`: the GPU, it chooses which gpu to use
- `device`: gets the adapter and makes a connection to it so you can actually *use* the adapter
- `queue`: a render queue, it's a queue to render stuff
- `config`: just configs for wpgu
- `pipeline`: like an Infinity Gauntlet, combines all of the former into a complete recipe for graphics (or disaster)

Just like Angular, all of these are 50 cent terms.<br>
Wgpu specific — this library looks like a lot of code to render stuff, but half of it's just a `descriptor` type (a struct that just has a bunch of fields to describe the layout of a process, usually used as a field for another, bigger, encompassing type)

### Rating
9/10<br><br>
Overall, I said I really feared `wgpu` and loved `winit`, but now they both look like very solid, yet undocumented, libraries. It's kinda like dieting for the gym, you only eat foods (representing the features of `wgpu`) that support your goal and the current stage of the process you're in, not WAY too much but not WAY too less. To juxtapose, I would give C++ SDL2 a 9.5/10 and Pygame a 3/10. Low Level graphics > soy dev ugly abstraction.

## Square
Yeah so it's just two triangles. Idk why graphics are obsessed with triangles, if pixels are SQUARE. Bro, it can't even render a triangle properly, the diagonal line is ALWAYS not going to be perfect. Squares would just make way more sense; pixels can actually show horizontal lines. But nonetheless, the way I made two triangles is just adding more vertices to the shader (shaders sounded scary, but it's just code to say how to render a specific shape/object/thing). This is the `wgsl` code:
```rust
@vertex
fn vs_main(@builtin(vertex_index) i: u32) -> @builtin(position) vec4<f32> {
    var pos = array<vec2<f32>, 6>(
		// triangle half
        vec2<f32>(-0.5, 0.5),
        vec2<f32>(-0.5, -0.5),
        vec2<f32>(0.5, -0.5),

		// triangle other half
        vec2<f32>(0.5, 0.5),
        vec2<f32>(0.5, -0.5),
        vec2<f32>(-0.5, 0.5),
    );

    return vec4<f32>(pos[i] + offset, 0.0, 1.0);
}

@fragment
fn fs_main() -> @location(0) vec4<f32> {
    return vec4<f32>(0.0, 0.0, 1.0, 1.0);
}
```

`wgsl` is just Rust with a bunch of @. Won't explain this too much. As you can see in the `pos` variable (inside `vs_main`), it's two vectors which have coords to make a triangle. For some reason, graphics programming doesn't use screen coords, it uses coords that mean 0 is the centre and 1 is a far end. Idk why. This makes it so that this doesn't actually render a square, it renders a rectangle, because the screen is horizontally longer (making 1 on the x much farther than 1 on the y). That's fine, to fix that you just have to implement a `uniform` (will explain later) that gets the aspect ratio and divide the final X value by that aspect ratio.

## Next steps
I want to implement `uniform`s. They're just pieces of code to send variables from the CPU (rust) to the GPU (`wgsl` file). Again, 50 cent term for no reason. I want the uniform to be able to move the square around, so I got a genuine player movement. Should be easy, I implemented a lot of those back in my day.

## Outro

Hope you liked this blog post, might make a tutorial. Hope you're good and peace.
