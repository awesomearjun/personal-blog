import fs from "fs";
import { writeFile } from "fs/promises";
import matter from "gray-matter";
import * as marked from "marked";
import path from "path";
import type { Post } from "../shared/global.ts";
import minimist from "minimist"

const posts = fs.readdirSync(path.resolve(process.cwd(), "posts/markdown"));
const regen = minimist(process.argv.splice(2)).regen ?? false;
const imgFolder = path.resolve(process.cwd(), "posts/assets");
const newImgFolder = path.resolve(process.cwd(), "src/assets/postAssets");

if (!fs.existsSync(newImgFolder)) {
    fs.cpSync(imgFolder, newImgFolder, { recursive: true });
}

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
    const tokens = marked.lexer(file.content);
    const htmlFileName = post.replace(".md", ".html");
    const htmlFilePath = path.resolve(process.cwd(), "src/assets/html", htmlFileName);

    // Not a path to json, a path to the html file FOR the json entry
    const jsonFilePath = `/${path.join("assets/html", htmlFileName)}`;

    const html = makeSEO(tokens, post);

    if (!regen) {
        try {
            await writeFile(htmlFilePath, html, { flag: "wx" });
            // console.log(`Created file ${htmlFileName}`);

        }
        catch {
            sites.push({ uid: 0, slug: file.data["slug"], title: file.data["title"], date: file.data["date"], description: file.data["description"], path: jsonFilePath });
            // console.log(`didn't Created file ${htmlFilePath}`);
            continue;
        }
    }
    else {
        await writeFile(htmlFilePath, html)
    }

    sites.push({ uid: 0, slug: file.data["slug"], title: file.data["title"], date: file.data["date"], description: file.data["description"], path: jsonFilePath });
    // console.log("added file");
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

function makeSEO(tokens: marked.TokensList, postPath: string): string {
    let site: string = "<article>";
    let lastWasH2 = false;
    let lastWasH3 = false;
    let alreadyH1 = false;

    for (const token of tokens) {
        if (token.type === "heading" && token.depth === 1) {
            site = `<article>
            <header>
                <h1>${token.text}</h1>
            </header>
            `

            alreadyH1 = true;
            continue;
        } else if (token.type === "heading" && token.depth === 1 && alreadyH1) {
            throw new Error(`Multiple H1 headings found in markdown file ${postPath}. Only one H1 is allowed.`);
        }

        if (token.type === "heading" && token.depth === 2 && !lastWasH2) {
            site = `${site}
            <section aria-label="${token.text}">
                <header>
                    <h2>${token.text}</h2>
                </header>`
            lastWasH2 = true;
            continue;
        }
        else if (token.type === "heading" && token.depth === 2 && lastWasH2) {
            site = `${site}
            </section>
            <section aria-label="${token.text}">
                <header>
                    <h2>${token.text}</h2>
                </header>`
            continue;
        }

        if (token.type === "heading" && token.depth === 3 && !lastWasH3) {
            site = `${site}
                <section aria-label="${token.text}">
                    <header>
                        <h3>${token.text}</h3>
                    </header>`
            lastWasH3 = true;
            continue;
        }
        else if (token.type === "heading" && token.depth === 3 && lastWasH3) {
                site = `${site}
                </section>
                <section aria-label="${token.text}">
                    <header>
                        <h3>${token.text}</h3>
                    </header>`
            continue;
        }
        else if (token.type === "heading" && token.depth === 2 && lastWasH3) {
            site = `${site}
            </section>
            <section aria-label="${token.text}">
                <header>
                    <h2>${token.text}</h2>
                </header>`
            lastWasH3 = false;
            continue;
        }

        if (token.type === "paragraph") {
            if (token.tokens === undefined) {
                site += marked.parser([token]);
                continue;
            }

            const imgSubTokens = token.tokens.filter(t => t.type === "image")

            for (const imgSubToken of imgSubTokens) {
                imgSubToken.href = path.join("/assets/postAssets", path.basename(imgSubToken.href));
            }

            site += marked.parser([token]);
            continue;
        }
        if (token.type === "code") {
            site = `${site}
            <pre><code>${token.text}</code></pre>`
            continue;
        }
    }
    site = `${site}
    </section>
    </article>`;

    return site;
}