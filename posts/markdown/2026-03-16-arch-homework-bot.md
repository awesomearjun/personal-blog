---
title: Arch + Homework Bot
slug: arch-homework-bot
date: 2026-03-16
description: Installing Arch is easy, homework's tedious
---

# Arch + Homework Bot

## Intro

Soo, what have I been doing for the past month? Well, I couldn't use my computer for an undisclosed reason so I took an old laptop and decided to install Arch Linux. In addition, when I got my computer back, I started working on this little bot that is teaching me a lot about automation. I still have to order a new MicroSD card for my car, so I didn't work on that. Will work on the car this March break. Did you guys know that Firefox added profiles as a GUI? Before you could only do that via command line!

## Arch

Yeah so installing Arch is very easy. I'm not talking about ArchInstall, I'm talking a genuine "first time" installation through the install guide. Why is first time in quotes? Because I tried to install Arch in a VM several times on my mac, but because it's M1, the architecture never allowed it. Not trying to dual boot Asahi Linux on here either.

### How do you install it?

I'm not going to spill too much, because I would highly recommend doing it the traditional [wiki](https://wiki.archlinux.org/title/Installation_guide) way (so that you can officially add it to your Discord status), but I'm just going to give a few pointers.

<ul>
<li>PLEASE do not install Gnome! KDE Plasma is so much better, and you can basically RICE it so fast with edit mode and a basic window manager!</li>
<li>If you want to install Arch on a USB, you need 2 usbs — one has to have the ISO on the website (that command line only "OS" is just an installer, not the actual), and one with the actual GUI and apps and such</li>
<li>On the wiki, the first like 20 steps are irrelevant until Step 1.7 (except verifying the installation and if you have to configure your keyboard)</li>
<ul>
<li>you don't need to update the system clock or anything because it's just the installer</li>
<li>all that has actually to happen is that you gotta connect to internet, format drives, and installing/configuring the system</li>
<li>once you install it the first time, you can install arch the second time in 1/8 of the time</li>
</ul>
</ul>

## Homework bot

Okay so slightly unethical, but I have an explaination. My homework is way too easy but in a large quantity, because our teacher wants us to get our reps in for the concepts. The homework is meant to learn and repeat. If you already did your learning and reps, then there's no point of the homework. So if you make a bot to LEARN how to make an automation bot (and you don't post too many details online so someone could `CTRL-C` `CTRL-V` it), then you are using the homework to learn (even if it's not the specific material). If ever a teacher of mine sees this, then let's both pretend this never happened.

### Structure of project

So, for browser automation, I always used Python and `pynput`'d some key commands, and if needed `pyautogui` with `pytesseract` to take screenshots and read them. But then I discovered there's a thing called `selenium` that opens a personal browser for the program, and let's you read anything you want.<br>

The code looks like this (for now):

```py
from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from webdriver_manager.firefox import GeckoDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from time import sleep

driver = webdriver.Firefox(
    service=Service(GeckoDriverManager().install())
)

driver.get("https://www.superhardalgebraproblems.com")
```

Elite ball knowledge required to get the reference. So what this does is it opens Firefox to the website, and with the unused modules up top of the script you can find elements, type in keys, and manipulate the website as you desire. The only problem is logins, which I'm still trying to find out how you can login with Google on `selenium`.

## Outro

Yeah so sorry I didn't post for a number of weeks that I don't want to calculate. Will actually work on the car this next week guys trust. It's becoming Spring in my area; Spring's always fun because of the Summer anticipation. No diss to my goat Winter though.
