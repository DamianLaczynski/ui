import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const outputDir = join(rootDir, 'public', 'docs', 'components');
const snippetsOutputDir = join(outputDir, 'snippets');

const showcases = [
  loadShowcaseMeta({ slug: 'accordion' }),
  loadShowcaseMeta({ slug: 'avatar' }),
  loadShowcaseMeta({ slug: 'badge' }),
  loadShowcaseMeta({ slug: 'breadcrumb' }),
  loadShowcaseMeta({ slug: 'button' }),
  loadShowcaseMeta({ slug: 'calendar' }),
  loadShowcaseMeta({ slug: 'card' }),
  loadShowcaseMeta({ slug: 'carousel' }),
  loadShowcaseMeta({ slug: 'command-palette' }),
  loadShowcaseMeta({ slug: 'context-menu' }),
  loadShowcaseMeta({ slug: 'popover' }),
  loadShowcaseMeta({ slug: 'checkbox', showcaseDir: 'field/checkbox' }),
  loadShowcaseMeta({ slug: 'color', showcaseDir: 'field/color' }),
  loadShowcaseMeta({ slug: 'date', showcaseDir: 'field/date' }),
  loadShowcaseMeta({ slug: 'date-range', showcaseDir: 'field/date-range' }),
  loadShowcaseMeta({ slug: 'datetime', showcaseDir: 'field/datetime' }),
  loadShowcaseMeta({ slug: 'divider' }),
  loadShowcaseMeta({ slug: 'dropdown', showcaseDir: 'field/dropdown' }),
  loadShowcaseMeta({ slug: 'drawer' }),
  loadShowcaseMeta({ slug: 'dialog' }),
  loadShowcaseMeta({ slug: 'empty-state' }),
  loadShowcaseMeta({ slug: 'email', showcaseDir: 'field/email' }),
  loadShowcaseMeta({ slug: 'error-state' }),
  loadShowcaseMeta({ slug: 'file', showcaseDir: 'field/file' }),
  loadShowcaseMeta({ slug: 'icon' }),
  loadShowcaseMeta({ slug: 'kbd' }),
  loadShowcaseMeta({ slug: 'loading-state' }),
  loadShowcaseMeta({ slug: 'message-bar' }),
  loadShowcaseMeta({ slug: 'menu' }),
  loadShowcaseMeta({ slug: 'nav' }),
  loadShowcaseMeta({ slug: 'node' }),
  loadShowcaseMeta({ slug: 'number', showcaseDir: 'field/number' }),
  loadShowcaseMeta({ slug: 'month', showcaseDir: 'field/month' }),
  loadShowcaseMeta({ slug: 'password', showcaseDir: 'field/password' }),
  loadShowcaseMeta({ slug: 'pagination' }),
  loadShowcaseMeta({ slug: 'progress-bar' }),
  loadShowcaseMeta({ slug: 'radio-button-group', showcaseDir: 'field/radio-button-group' }),
  loadShowcaseMeta({ slug: 'range', showcaseDir: 'field/range' }),
  loadShowcaseMeta({ slug: 'rating' }),
  loadShowcaseMeta({ slug: 'search', showcaseDir: 'field/search' }),
  loadShowcaseMeta({ slug: 'scroll-panel' }),
  loadShowcaseMeta({ slug: 'scroll-container' }),
  loadShowcaseMeta({ slug: 'skeleton' }),
  loadShowcaseMeta({ slug: 'slider', showcaseDir: 'field/slider' }),
  loadShowcaseMeta({ slug: 'speed-dial' }),
  loadShowcaseMeta({ slug: 'stepper', showcaseDir: 'field/stepper' }),
  loadShowcaseMeta({ slug: 'spinner' }),
  loadShowcaseMeta({ slug: 'splitter' }),
  loadShowcaseMeta({ slug: 'switch', showcaseDir: 'field/switch' }),
  loadShowcaseMeta({ slug: 'tag' }),
  loadShowcaseMeta({ slug: 'tabs' }),
  loadShowcaseMeta({ slug: 'table-of-content' }),
  loadShowcaseMeta({ slug: 'tel', showcaseDir: 'field/tel' }),
  loadShowcaseMeta({ slug: 'text', showcaseDir: 'field/text' }),
  loadShowcaseMeta({ slug: 'textarea', showcaseDir: 'field/textarea' }),
  loadShowcaseMeta({ slug: 'time', showcaseDir: 'time' }),
  loadShowcaseMeta({ slug: 'time-picker' }),
  loadShowcaseMeta({ slug: 'time-span', showcaseDir: 'field/time-span' }),
  loadShowcaseMeta({ slug: 'timeline' }),
  loadShowcaseMeta({ slug: 'toast' }),
  loadShowcaseMeta({ slug: 'totp', showcaseDir: 'field/totp' }),
  loadShowcaseMeta({ slug: 'toolbar' }),
  loadShowcaseMeta({ slug: 'tree' }),
  loadShowcaseMeta({ slug: 'tree-node' }),
  loadShowcaseMeta({ slug: 'tooltip' }),
  loadShowcaseMeta({ slug: 'url', showcaseDir: 'field/url' }),
  loadShowcaseMeta({ slug: 'week', showcaseDir: 'field/week' }),
];

mkdirSync(outputDir, { recursive: true });
mkdirSync(snippetsOutputDir, { recursive: true });

for (const showcase of showcases) {
  const snippetDir = join(snippetsOutputDir, showcase.slug);
  mkdirSync(snippetDir, { recursive: true });

  const docs = {};
  for (const [key, fileName] of Object.entries(showcase.snippets)) {
    const sourcePath = join(showcase.sourceDir, fileName);
    const raw = readFileSync(sourcePath, 'utf8').replace(/\r\n/g, '\n');
    docs[key] = raw;
    cpSync(sourcePath, join(snippetDir, fileName));
  }

  writeFileSync(join(outputDir, `${showcase.slug}.md`), renderMarkdown(showcase, docs), 'utf8');
}

function trimDoc(source) {
  return source.trim();
}

function renderMarkdown(showcase, docs) {
  const parts = [`# ${showcase.title}`, '', showcase.intro];

  parts.push('', '## Import');
  parts.push('```ts');
  parts.push(trimDoc(showcase.importCode));
  parts.push('```');

  for (const section of showcase.featureSections) {
    parts.push('', `## ${section.title}`);
    parts.push('```ts');
    parts.push(trimDoc(docs[section.codeKey]));
    parts.push('```');
  }

  if (showcase.accessibility?.length) {
    parts.push('', '## Accessibility');
    for (const block of showcase.accessibility) {
      parts.push('', `### ${block.title}`);
      parts.push(block.body);
    }
  }

  parts.push('');
  return parts.join('\n');
}

function loadShowcaseMeta({ slug, showcaseDir = slug }) {
  const showcaseRootDir = join(rootDir, 'apps/showcase/src/app/showcase', showcaseDir);
  const metaPath = join(showcaseRootDir, `${slug}.showcase.meta.json`);
  const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
  return {
    ...meta,
    sourceDir: join(showcaseRootDir, 'examples'),
  };
}
