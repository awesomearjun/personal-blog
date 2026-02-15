---
title: Cooling, Corruption, & Correction
slug: cooling-corruption-condition
date: 2026-02-15
description: Added a little cooling, the SD card corrupted (😔), and I rebuilt the car for the 3rd time.
---

# Cooling, Corruption, & Correction

## Intro

Did a little more work throughout the week only on the car. I don't think this blog is my side project anymore because it's already done, I reckon no more fundamental big changes only small tweaks coming through and **RARELY** big features. Anyways, this week three things mainly happened, all in the title: Cooling (added cooling to the car), Corruption (my SD card), and Correction (I redesigned it for the 3rd time). You like my alliteration there?

## Correction

I know it's not in order, but it's the most visual change. I prepped the car to frame the other features I'm planning, like camera tilt and radar. The triangle top also functions as a handle, which makes it so that the car can be held like a handbag.

![DIY robotic car with a triangle house-like framing](../assets/IMG_0445.png 'Do you like it?')

I already started with adding the camera tilt. You see the gray string of yarn? It's a sort of conveyor-belt mechanism (I'm an electrical engineer not a mechanical one). The idea is that I add a motor to the side of the car opposite to the camera that just moves the string around (needs to be a torque-y motor though, I have some torque-y motors but they are quite heavy so I don't want the car to slow down or the framing to break because of them).

![DIY robotic car with camera tilt conveyor belt mechanism](../assets/IMG_0446.gif 'wow 🙀')

I'm not going to put the motor on the top because that's where the radar is going to go. I wonder how I'm going to power all these motors, because I don't think my Arduino motor shield can do that, but that's a problem for next week.

## Cooling

A big bug in my car was that it randomly stopped taking in commands properly and started moving on its own whim. I think the reasons for this was for one the Raspberry Pi heated up and just started malfunctioning, and two the Raspberry Pi had no airflow to compensate for this (I also double sided taped the bottom to a platform to hold the Pi, which probably contributed to the heat). So I just ordered some fans off Amazon and screwed them into the case.

![Raspberry Pi Case with a fan on it](../assets/IMG_0447.png '🥶🥶🥶')

## Corruption

The worst for last. The SD card got corrupted 😭. ChatGPT kept saying there's nothing to do except buy another one, JUST BECAUSE I MIGHT HAVE ACCIDENTLY TURNED IT OFF WEIRD ONCE. It also said that the issue is probably minor and corrupted a system file, so I can recover my project. EXCEPT I CAN'T! THE ONLY WAY TO RECOVER IT IS TO GET SOME SKETCHY SOFTWARE THAT NEEDS YOU TO INSTALL A SYSTEM EXTENSION (WEIRD), AND EVERY OTHER OPTION IS OUTDATED! ALL OF THIS IS JUST BECAUSE MACOS CAN'T READ EXT4 (it's a linux file formatting type). WHY IS THIS SO UNNESSASARILY DIFFICULT!!!<br><br>

The crashout indeed is valid, this is a very annoying hurdle. But I guess SD cards are cheap, and it stops me from procrastinating to buy other parts. The other parts I want to buy are a battery pack to power the Raspberry Pi and Arduino wirelessly, and a buck converter to convert the power from lots of volts and little amps, to lots of amps and little volts.

## Ending

Yeah if you like to read me crashing out, then good, otherwise I don't know what to tell you. Hope whatever's on your side of the screen is alright, and you'll see another post next week.
