import fs from "fs";
import { writeFile } from "fs/promises";
import matter from "gray-matter";
import * as marked from "marked";
import path from "path";

const posts = fs.readdirSync(path.resolve(process.cwd(), "posts/markdown"));

posts.forEach(async post => {
    const file = matter.read(path.join(path.resolve(process.cwd(), "posts/markdown"), post));
    const htmlFileName = post.replace(".md", ".html");
    let sites: { [key: string]: string } = {};
    const htmlFilePath = path.resolve(process.cwd(), "posts/html", htmlFileName);

    // Not a path to json, a path to the html file FOR the json entry
    const jsonFilePath = `/${path.join(path.basename(process.cwd()), "posts/html", htmlFileName)}`;

    try {
        const html = `
            <fieldset>
                <legend>Metadata</legend>
                <p>Title: ${file.data["title"]}</p>
                <p>Date: ${file.data["date"]}</p>
                <p>Description: ${file.data["description"]}</p>
            </fieldset>
            ${marked.parse(file.content)}
            `;

        await writeFile(htmlFilePath, html, { flag: "wx" });



        sites[htmlFileName.replace(".html", "")] = jsonFilePath;
    } catch {
        sites[htmlFileName.replace(".html", "")] = jsonFilePath;
    }

    fs.writeFile(`${path.resolve(process.cwd(), "public/sites.json")}`, JSON.stringify(sites, null, 2), err => {
        if (err) {
            console.error("Error writing to sites.json: ", err);
        }
    });
});