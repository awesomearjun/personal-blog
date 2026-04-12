---
title: Homework bot done
slug: homework-bot-done
date: 2026-03-22
description: I finished the homework bot and did research on SD cards for my car
---

# Homework bot done

## Intro

Weeks go by so fast y'all 🥹. I completed the homework bot, and I did a little research on which SD card to use for my car (I guess I held up my promise on working on the card). Why are endurance SD cards so expensive ☹️.

## Homework bot

Yeah so I spent a few HOURS everyday (I spent more time making a bot to do my homework than actually doing the homework itself!). So I did finish it, with these features:

<ul>
<li>It's able to answer the questions pretty well (ofc)</li>
<li>It's able to take the images</li>
<li>It can run on it's own autonomously</li>
<li>Even if it answers a question wrong, it's able to navigate the page to redo it</li>
<li>It's generally able to navigate the page</li>
</ul>

Yeah so pretty fun project, helped me learn a lot about selenium. Now we go into how it works

### How _does_ it work?

So, first thing is that selenium opens a firefox window and clicks on the Sign in button

```python
driver = webdriver.Firefox(
    service=Service(GeckoDriverManager().install())
)

driver.get("<insert site name, am tryna gatekeep the name so none of y'all can copy, purely educational purposes only>")

# click on sign in as student
driver.find_element(By.CSS_SELECTOR, "<button id>").click();

# click on sign in with google
driver.find_element(By.CSS_SELECTOR, "div[aria-label='Sign in with Google. Opens in new tab']").click()

input("Log in with google, click on subject, press enter when done...")
```

I couldn't figure out how to make it Sign in, so the next steps of signing in and clicking on what unit to do is all manually done (I guess it's good because I can choose which one is good for the AI to do, ideally one with minimal images and none in the options, I also didn't code for it to type answers but it's okay because most the questions are multiple choice on this site).<br>
Once we're done that we go onto the good stuff, clicking on a problem set and actually doing it. First we get the wrapper for all the problem sets and jot down the current url of where we're at, we might need to return to it later:

```python
subject_page = driver.current_url
problems_container = driver.find_element(By.CLASS_NAME, "redacted")
problem_sets = activity_container.find_elements(By.TAG_NAME, "redacted again")
```

Now we get into a big while loop, that goes on until we complete all the questions:

```python
i = 0

# while loop so that we can restart if problem is wrong
while i < len(problem_sets):
    # we gotta wait until the problem sets appear on screen
    problem_sets_wait = WebDriverWait(driver, 8).until(
        EC.presence_of_all_elements_located((By.TAG_NAME, "redact"))
    )
    problem_sets_wait[i].click()

    continue_button = WebDriverWait(driver, 8).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "redacted"))
            )
    continue_button.click()
```

I lowkey don't know why there's a continue button element up there, we do click continue somewhere else, but I don't want to change it. The reason we have to get problem sets again is because:

<ol>
<li>Because on this site, when you get a question right it brings you back to the page where all the sets are listed out</li>
<li>Because when you get a question wrong, to get credit for all the questions you gotta go back to the page that lists all the sets and redo the entire thing. Each set is 3 questions so it's fine</li>
</ol>

Next thing to do is get what type of answer the question is. I only coded in multiple and single answer multiple choice questions though so it doesn't really do anything. I don't want to code in input questions because in my mind this project is DONE.

```python
    question_status = None

    # repeat 3 times for 3 questions per problem set
    for _ in range(3):
        sleep(1)

        answer_type = WebDriverWait(driver, 6).until(
                EC.presence_of_element_located((By.CLASS_NAME, "six seven"))
                )
        answer_type = answer_type.get_attribute("ohio")

        match answer_type:
            case "Select Multiple Answers" | "Select an Answer":

```

We need the `question_status` variable for later. All this does is get the heading that says "Select Multiple Answers" or "Select an Answer", get its text content, and does the rest of the program based on that.

```python
sleep(2)
multipleChoice = (answer_type == "Select Multiple Answers")

questionHTML = driver.find_element(By.CLASS_NAME, "dfsaio").find_element(By.TAG_NAME, "fjhiasd").find_element(By.TAG_NAME, "--").get_attribute("innerHTML")
question = extract_text_download_images(questionHTML)

options_elements = driver.find_elements(By.CLASS_NAME, "gameplayAnswer")
options = {}

# converts the index to a letter
for j in range(len(options_elements)):
    index_to_letter = chr(97 + j)
    options[index_to_letter] = options_elements[j]

```

This gets the question, and all the options available on the question, because it's sometimes it's an a, b, c, d question and sometimes there's an e and an f and sometimes only a, and b. the for loop makes the index of the option to a letter and puts it in a dictionary format (like `{'a': '3', 'b': 'y = mx + b'}`). To get the question, it just simply gets the `innerHTML`. Too lazy to add all that code to wait for the options to load at the top so I just added a fixed `sleep()`.

```python
reply = json.loads(ask_model_choices(question, options, multipleChoice))
```

Now this is the meat of it, this gets a model's response and converts it to JSON. So all of this scraping and options gets feeded into an AI model through `ollama`, in my case I use `qwen3-vl:235b-cloud`. I had a lot of struggle with models because:

<ol>
<li>You don't really see the strengths and weaknesses of different models as you do with these smaller models, some absolutely SUCK at math but good at conversation, some are visual but SO SLOW, some just say their ENTIRE RESPONSE IN JOT NOTES</li>
<li>I thought `ollama` was completely local, so I kept downloading these 4b and 8b versions (the b's stand for how many billion parameters there are). All the models I downloaded we're pretty terrible because of this, and also I wanted to keep them under 6 GB. `qwen3-vl` was the only model that was doing good on 4b AND can do splendid vision, so I decided to give it more parameters and on the <a href="https://ollama.com/library/qwen3-vl">website</a> I found that there was a 235b version that was on the cloud, and only took a few MB to install. You can imagine the jump in speed and efficiency from 4b to 235b. The reason I didn't use say ChatGPT instead of all this was because its API was paid, but it would've surpassed everything by far</li>
</ol>
