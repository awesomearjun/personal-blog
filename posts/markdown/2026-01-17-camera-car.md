---
title: Streaming Raspberry Pi Camera to Website
slug: camera-car
date: 2026-01-17
description: How to take camera footage from a Raspberry Pi 4b+ and put it on a website.
---

# Streaming Raspberry Pi Camera to Website

## Intro

Making this because all other tutorials outdated. Tutorial only in tutorial heading, extras read the entire thing.

## Tutorial

### Connect camera

DO NOT DO THIS WHILE THE PI IS ON<br>
Pull the black tab up on the Camera slot<br>
![tk](tk)<br>
Insert camera ribbon (make sure it goes all the way down). The blue part faces the USB ports<br>
![tk](tk)<br>

### Verify the OS version

NOW YOU CAN TURN THE PI ON<br>

This only works if you're on Debian trixie on your Pi, to verify:

```bash
cat /os/release | grep "VERSION_CODENAME"
```

It should say something like:

```bash
VERSION_CODENAME=trixie
```

Just to see if everything's working, run a little:

```bash
rpicam-hello
```

You should see a preview of the camera working

### Packages

Paste these into your terminal:

```bash
sudo apt update
sudo apt install -y rpicam-apps python3-picamera2
```

Just installing the Python framework and the RPi camera stuff.

### App

First, you'd need a website to host it on. I'll just use a basic flask, with a route for the video:

```python
# we need Response for a later step
from flask import Flask, render_template, Response

app = Flask(__name__)

@app.route("/video_stream")
def stream():
    pass

@app.route("/")
def index():
    return render_template("index.html")
```

Simple enough. Now at the top of the file, we need to intiate the camera:

```python
from picamera2 import Picamera2
import time

picam2 = Picamera2()

# lower quality for faster stream, and set it to a format HTTP would like
picam2_config = picam2.create_preview_configuration(
    main={"format": "XRGB8888", "size": (640, 480)}
)
picam2.configure(picam2_config)

picam2.start()

# give it a little time to start
time.sleep(1)
```

OPTIONAL: If you are doing python virtual environment, make sure you have access to system-wide libraries otherwise picamera won't work:

```bash
python3 -m venv venv --system-site-packages
```

The way we'll do the camera streaming is take one frame at a time from the camera and put it on the website. We'll use MJPEG (just a way to stream videos using a bunch of jpegs, it's good for smaller projects). So to get each frame, we need cv2, so install it:

```bash
sudo apt install python3-opencv
```

Import it:

```python
import cv2
```

And use it:

```python
def generate_video_frame():
    while True:
        # get a frame from the camera, NumPy array
        frame = picam2.capture_array()

        # ret = result (True, False), jpeg = actual JPEG
        ret, jpeg = cv2.imencode(".jpg", frame)

        if not ret:
            print("Skipping iteration, no frames")
            continue

        # put it into bytes that HTML can process
        frame_bytes = jpeg.tobytes()

        # return an HTTP response in bytes
        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n"
            + frame_bytes +
            b"\r\n"
        )

    # cleanup
    cv2.destroyAllWindows()
```

The reason why there's a bunch of `\r\n` in the HTTP response is because that's how HTTP does a newline, it's not just `\n` like in Python. Anyways, the next thing we do is update our `/video_stream` route:

```python
@app.route("/video_stream")
def stream:
    return Response (
        generate_video_frame(),
        mimetype="multipart/x-mixed-replace; boundary=frame"
    )
```

So just create a new `Response`, call the function to make the response, and also specify a `mimetype`. It basically says that the `Response` is an MJPEG, and if you look closely at `boundary=frame`, it matches `--frame` in our function. So `boundary` is the "boundary" between two frames, in other words it specifies when another frame starts. In HTML, to render the image, all that has to be done is:

```markdown
<img src="/video_frame" />
```

That's it

## Extras

Okay this might be the sickest post I've did. My car isn't a car anymore, it's a controlled spy gadget. I slapped a camera place on it, and now I can see through it on the dashboard!<br>
![Image of robot controller dashboard with live camera footage](../assets/Screenshot%202026-01-17%20at%201.55.27 PM.png)<br>
And the upgraded car:<br>
![Image of robot car with a camera](../assets/IMG_0381.png)
I added the little protruding thing on the right (that's the camera). Pretty responsive, and very fun to just drive around. Although there's an issue where the car just stops working and drives randomly because the Pi overheats, but that will be solved when I put it in a case and slap a fan on it.

## Ending

Yeah guys time management! I decided that Saturday is my reset day, where I do all the little tasks I had to do in the week but didn't, like this blog. Or cleaning up. Anyways, I hope you have a good rest of your day.
