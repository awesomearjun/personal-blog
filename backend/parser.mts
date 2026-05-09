import fs from 'fs';
import { writeFile } from 'fs/promises';
import matter from 'gray-matter';
import * as marked from 'marked';
import path from 'path';
import type { Post } from '../shared/global.ts';
import minimist from 'minimist';

const posts = fs.readdirSync(path.resolve(process.cwd(), 'posts/markdown'));
const regen = minimist(process.argv.slice(2)).regen ?? false;
const imgFolder = path.resolve(process.cwd(), 'posts/assets');
const newImgFolder = path.resolve(process.cwd(), 'src/assets/postAssets');
const newSitesFolder = path.resolve(process.cwd(), 'src/assets/html');
const assetsFolder = path.resolve(process.cwd(), 'src/assets');

// no checks because it should exist anyway
if (!fs.existsSync(assetsFolder)) {
  fs.mkdirSync(assetsFolder);
}

if (!fs.existsSync(newImgFolder) || regen) {
  if (fs.existsSync(newImgFolder) && regen) {
    fs.rmSync(newImgFolder, { recursive: true });
  }
  fs.cpSync(imgFolder, newImgFolder, { recursive: true });
}

if (!fs.existsSync(newSitesFolder) || regen) {
  if (fs.existsSync(newSitesFolder) && regen) {
    fs.rmSync(newSitesFolder, { recursive: true });
  }

  fs.mkdirSync(newSitesFolder);
}
// sort by time created
const sortedPosts = posts
  .map((post) => {
    const fullPath = path.join(path.resolve(process.cwd(), 'posts/markdown'), post);
    const stats = fs.statSync(fullPath);
    return { post, ctime: stats.birthtimeMs };
  })
  .sort((a, b) => a.ctime - b.ctime)
  .map((post) => post.post);

let sites: Post[] = [];

for (const post of sortedPosts) {
  const file = matter.read(path.join(path.resolve(process.cwd(), 'posts/markdown'), post));
  const tokens = marked.lexer(file.content);
  const htmlFileName = post.replace('.md', '.html');
  const htmlFilePath = path.resolve(process.cwd(), 'src/assets/html', htmlFileName);

  // Not a path to json, a path to the html file FOR the json entry
  const jsonFilePath = `/${path.join('assets/html', htmlFileName)}`;

  const html = makeSEO(tokens, post);

  if (!regen) {
    try {
      await writeFile(htmlFilePath, html, { flag: 'wx' });
    } catch {
      sites.push({
        uid: 0,
        slug: file.data['slug'],
        title: file.data['title'],
        date: file.data['date'],
        description: file.data['description'],
        path: jsonFilePath,
      });
      continue;
    }
  } else {
    try {
      await writeFile(htmlFilePath, html);
    } catch (err) {
      throw new Error(`Error rewriting file: ${err}`);
    }
  }

  sites.push({
    uid: 0,
    slug: file.data['slug'],
    title: file.data['title'],
    date: file.data['date'],
    description: file.data['description'],
    path: jsonFilePath,
  });
}

sites.sort((a, b) => {
  let aTime = new Date(a.date).getTime();
  let bTime = new Date(b.date).getTime();

  return aTime - bTime;
});
sites.forEach((site, index) => (site.uid = index));

fs.writeFile(
  `${path.resolve(process.cwd(), 'src/assets/sites.json')}`,
  JSON.stringify(sites, null, 2),
  (err) => {
    if (err) {
      console.error('Error writing to sites.json: ', err);
    }
  },
);

function makeSEO(tokens: marked.TokensList, postPath: string): string {
  let site: string = '<article>';
  let lastWasH2 = false;
  let lastWasH3 = false;
  let alreadyH1 = false;

  for (const token of tokens) {
    if (token.type === 'heading' && token.depth === 1) {
      if (alreadyH1) {
        throw new Error(
          `Multiple H1 headings found in markdown file ${postPath}. Only one H1 is allowed.`,
        );
      }
      alreadyH1 = true;
      continue;
    }

    if (token.type === 'heading' && token.depth === 2) {
      if (lastWasH3) {
        site += `</section></section>`;
        lastWasH3 = false;
      } else if (lastWasH2) {
        site += `</section>`;
      }

      site += `<section class="blog-section" aria-label="${token.text}">
                <header>
                    <h2>${token.text}</h2>
                </header>`;
      lastWasH2 = true;
      continue;
    }

    if (token.type === 'heading' && token.depth === 3) {
      if (lastWasH3) {
        site += `</section>`;
      }
      site += `<section aria-label="${token.text}">
                <header>
                    <h3>${token.text}</h3>
                </header>`;
      lastWasH3 = true;
      continue;
    }

    if (token.type === 'paragraph') {
      // Correctly mutate image paths within paragraphs
      if (token.tokens) {
        token.tokens.forEach(t => {
          if (t.type === 'image') {
            t.href = `/assets/postAssets/${path.basename(t.href)}`;
          }
        });
      }
      // Cast as any to satisfy parser if needed, though parser accepts array of tokens
      site += marked.parser([token] as any);
      continue;
    }

    if (token.type === 'code') {
      const lang = token.lang || 'plaintext';
      const escapeHTML = (str: string) =>
        str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');

      site += `<pre><code class="language-${lang}">${escapeHTML(token.text)}</code></pre>`;
      continue;
    }

    // This handles lists and everything else properly
    site += marked.parser([token] as any);
  }

  // Close any remaining open sections
  if (lastWasH3) site += '</section>';
  if (lastWasH2) site += '</section>';

  site += '</article>';

  return site;
}
