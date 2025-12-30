import fs from "fs";
import { writeFile } from "fs/promises";
import matter from "gray-matter";
import * as marked from "marked";
import path from "path";
import type { Post } from "../shared/global.ts";

const posts = fs.readdirSync(path.resolve(process.cwd(), "posts/markdown"));

// sort by time created
const sortedPosts = posts
    .map(post => {
        const fullPath = path.join(path.resolve(process.cwd(), "posts/markdown"), post);
        const stats = fs.statSync(fullPath);
        return { post, ctime: stats.birthtimeMs };
    })
    .sort((a, b) => a.ctime - b.ctime)
    .map(post => post.post);

let sites: Post[] = [];

for (const post of sortedPosts) {
    const file = matter.read(path.join(path.resolve(process.cwd(), "posts/markdown"), post));
    const htmlFileName = post.replace(".md", ".html");
    const htmlFilePath = path.resolve(process.cwd(), "src/assets/html", htmlFileName);

    // Not a path to json, a path to the html file FOR the json entry
    const jsonFilePath = `/${path.join("assets/html", htmlFileName)}`;

    const html = `
        <fieldset>
            <legend>Metadata</legend>
            <p>Title: ${file.data["title"]}</p>
            <p>Date: ${file.data["date"]}</p>
            <p>Description: ${file.data["description"]}</p>
        </fieldset>
        ${marked.parse(file.content)}

        <a href="/">Go back home</a>
        `;

    try {
        await writeFile(htmlFilePath, html, { flag: "wx" });
    }
    catch {
        sites.push({ uid: 0, slug: file.data["slug"], title: file.data["title"], date: file.data["date"], description: file.data["description"], path: jsonFilePath });
        continue;
    }

    sites.push({ uid: 0, slug: file.data["slug"], title: file.data["title"], date: file.data["date"], description: file.data["description"], path: jsonFilePath });
};

sites.sort((a, b) => {
    let aTime = new Date(a.date).getTime();
    let bTime = new Date(b.date).getTime();

    return aTime - bTime;
});
sites.forEach((site, index) => site.uid = index);

fs.writeFile(`${path.resolve(process.cwd(), "src/assets/sites.json")}`, JSON.stringify(sites, null, 2), err => {
    if (err) {
        console.error("Error writing to sites.json: ", err);
    }
});