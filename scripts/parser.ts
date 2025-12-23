import fs from "fs";
import { writeFile } from "fs/promises";
import matter from "gray-matter";
import * as marked from "marked";
import path from "path";

const posts = fs.readdirSync(path.resolve(process.cwd(), "posts/markdown"));

posts.forEach(post => {
    const file = matter.read(path.join(path.resolve(process.cwd(), "posts/markdown"), post));
    const htmlFileName = post.replace(".md", ".html");
    console.log(`HTML Filename: ${htmlFileName}`);
    

    try {
        const markdownString = file.content;

        const html = `
            <fieldset>
                <legend>Metadata</legend>
                <p>Title: ${file.data["title"]}</p>
                <p>Date: ${file.data["date"]}</p>
                <p>Description: ${file.data["description"]}</p>
            </fieldset>
            ${marked.parse(file.content)}
            `;

        writeFile(`${path.resolve(process.cwd(), "posts/html", htmlFileName)}`, html, { flag: "wx" });
    } catch {
        return;
    }
});