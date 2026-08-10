import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const siteOriginRaw = (
  process.env.SHOWCASE_SITE_ORIGIN?.trim() ||
  process.env.PUBLIC_ORIGIN?.trim() ||
  'https://ui.laczynski.dev'
).replace(/\/$/, '');

const dsRoutesPath = join(rootDir, 'apps/showcase/src/app/layout/ds/ds.routes.ts');
const indexPath = join(rootDir, 'apps/showcase/src/index.html');

function extractSlugPaths(routeFileText) {
  const paths = [];
  const re = /path:\s*'([^']*)'/g;
  let m;
  while ((m = re.exec(routeFileText)) !== null) {
    const p = m[1];
    if (!p || p === '**') continue;
    paths.push(p);
  }
  return paths;
}

function collectPublicMdHrefPaths(relBaseDir) {
  const abs = join(rootDir, relBaseDir);
  if (!existsSync(abs)) return [];

  /** @type {string[]} */
  const out = [];

  function walk(dir, relFromBase) {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      const nextRel = relFromBase ? `${relFromBase}/${name}` : name;
      if (statSync(full).isDirectory()) {
        walk(full, nextRel);
      } else if (name.endsWith('.md')) {
        out.push(nextRel.replace(/\\/g, '/'));
      }
    }
  }

  walk(abs, '');
  return out.map(rel => `/docs/${rel}`);
}

function collectUrls() {
  const routeText = readFileSync(dsRoutesPath, 'utf8');
  const slugs = extractSlugPaths(routeText);

  const set = new Set(['/', '/docs']);
  for (const slug of slugs) {
    set.add(`/docs/${slug}`);
  }
  collectPublicMdHrefPaths('public/docs').forEach(p => set.add(p));

  return [...set].sort((a, b) => a.localeCompare(b));
}

function renderNavAnchorsInner(pathnames) {
  return pathnames
    .map(p => `<a href="${escapeAttr(p)}" tabindex="-1">${escapeText(p)}</a>`)
    .join('\n');
}

function escapeAttr(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/\r|\n|\t/g, '');
}

function escapeText(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\r|\n|\t/g, '');
}

function writeSitemap(pathnames, outFile) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const body = pathnames
    .map(pathname => {
      const absolute =
        pathname === '/' ? `${siteOriginRaw}/` : `${siteOriginRaw}${pathname}`;
      const loc = encodeURI(absolute);
      return `<url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
    })
    .join('\n  ');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ${body}\n</urlset>\n`;
  writeFileSync(outFile, xml, 'utf8');
}

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function patchIndexHtml(navInnerHtml) {
  let html = readFileSync(indexPath, 'utf8');
  const headInsert = `\n<link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />\n<link rel="help" href="/crawl-links.html" />\n`;

  const navBlock =
    `<!-- showcase-static-discovery:start --><nav aria-hidden="true" class="showcase-static-discovery" tabindex="-1" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0">${navInnerHtml}<a tabindex="-1" href="/crawl-links.html">Documentation URL index</a></nav><!-- showcase-static-discovery:end -->`;

  if (!html.includes('<!-- showcase-static-discovery:start -->')) {
    throw new Error(
      'Missing showcase-static-discovery sentinels in apps/showcase/src/index.html.',
    );
  }
  html = html.replace(
    /<!-- showcase-static-discovery:start -->[\s\S]*?<!-- showcase-static-discovery:end -->/,
    navBlock,
  );

  if (!html.includes('href="/sitemap.xml"')) {
    html = html.replace(/(<head[^>]*>)/i, `$1${headInsert}`);
  }

  writeFileSync(indexPath, html, 'utf8');
}

function main() {
  const pathnames = collectUrls();
  const navInnerHtml = renderNavAnchorsInner(pathnames);

  const publicDir = join(rootDir, 'public');
  writeSitemap(pathnames, join(publicDir, 'sitemap.xml'));
  writeFileSync(
    join(publicDir, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${siteOriginRaw}/sitemap.xml\n`,
    'utf8',
  );

  const crawlHref = encodeURI(`${siteOriginRaw}/crawl-links.html`);
  const crawlLinksBody = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Showcase crawl index — @laczynski/lui</title>
  <meta name="robots" content="index,follow" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="canonical" href="${escapeXml(crawlHref)}" />
</head>
<body>
<main>
<h1>@laczynski/lui showcase — URL index for crawlers</h1>
<p>Plain HTML links to Angular routes (and Markdown mirrors under /docs).</p>
<nav><ul>${pathnames.map(p => `<li><a href="${escapeAttr(p)}">${escapeText(p)}</a></li>`).join('')}</ul></nav>
</main>
</body>
</html>
`;

  writeFileSync(join(publicDir, 'crawl-links.html'), crawlLinksBody, 'utf8');
  patchIndexHtml(navInnerHtml);

  console.log(
    `[showcase-crawl-discovery] sitemap (${pathnames.length} URLs), robots.txt, crawl-links.html, index.html patched. Origin: ${siteOriginRaw}\n`,
  );
}

main();
