import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.arjuns-blog.vercel.app';
const INPUT_FILE = path.join(__dirname, '..', 'src', 'assets', 'sites.json');
const OUTPUT_FILE = path.join(__dirname, '..', 'public', 'sitemap.xml');

try {
  // 2. Read and parse the JSON data
  const rawData = fs.readFileSync(INPUT_FILE, 'utf8');
  const sites = JSON.parse(rawData);

  // 3. Start building the XML string
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Add homepage (optional but recommended)
  xml += `  <url>\n    <loc>${BASE_URL}/</loc>\n    <priority>1.0</priority>\n  </url>\n`;

  // 4. Map each blog post to a <url> entry
  sites.forEach((site) => {
    // Extract just the date part (YYYY-MM-DD) from the ISO string
    const lastMod = site.date.split('T')[0];

    // You can link to either the site.path or a slug-based URL
    // depending on how your routing works. I'll use slug here:
    const url = `${BASE_URL}/blog/${site.slug}`;

    xml += `  <url>\n`;
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${lastMod}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  // 5. Write the file to disk
  fs.writeFileSync(OUTPUT_FILE, xml);
  console.log(`✅ Success! Sitemap generated at ${OUTPUT_FILE}`);
} catch (error) {
  console.error('❌ Error generating sitemap:', error.message);
}
