#!/bin/zsh

# sorry windows and linux users, this is for mac only womp womp
read "?Enter filename title: " title
filename="$(date +%Y-%m-%d)-${title}.md"
touch "$filename"
echo "Created: $filename"
echo "---
title: <title>
slug: $title
date: $(date +%Y-%m-%d)
description: <description>
---
# <site-title>" > "$filename"
echo "Filled in template content."
mv "$filename" "posts/markdown/"
echo "Moved to posts/markdown directory."
echo "Done! Access at posts/markdown/$filename"