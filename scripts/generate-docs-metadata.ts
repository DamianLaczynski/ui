import { mkdirSync, readdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import type { GuideDocPageConfig } from '../apps/showcase/src/app/shared/components/guide-doc-page/guide-doc-page.models';
import { guideConfigToMarkdown } from '../apps/showcase/src/app/shared/components/guide-doc-page/guide-doc-markdown.util';
import { GETTING_STARTED_PAGE_CONFIG } from '../apps/showcase/src/app/pages/docs/getting-started/getting-started.page';
import { INSTALLATION_PAGE_CONFIG } from '../apps/showcase/src/app/pages/docs/installation/installation.page';
import { I18N_PAGE_CONFIG } from '../apps/showcase/src/app/pages/docs/i18n/i18n.page';
import { ROADMAP_PAGE_CONFIG } from '../apps/showcase/src/app/pages/docs/roadmap/roadmap.page';
import { LLMS_PAGE_CONFIG } from '../apps/showcase/src/app/pages/docs/llms/llms.page';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const publicDir = join(rootDir, 'public');
const docsDir = join(publicDir, 'docs');

const GUIDE_PAGES: { slug: string; desc: string; config: GuideDocPageConfig }[] = [
  {
    slug: 'getting-started',
    desc: 'Install, wire styles/icons, and compose your first screen.',
    config: GETTING_STARTED_PAGE_CONFIG,
  },
  {
    slug: 'installation',
    desc: 'Package install, Angular config, icon assets and SSR notes.',
    config: INSTALLATION_PAGE_CONFIG,
  },
  {
    slug: 'i18n',
    desc: 'Translation loading and NGX Translate integration.',
    config: I18N_PAGE_CONFIG,
  },
  {
    slug: 'roadmap',
    desc: 'Milestones and planned focus areas.',
    config: ROADMAP_PAGE_CONFIG,
  },
  {
    slug: 'llms',
    desc: 'Index of discovery files and Markdown URL patterns.',
    config: LLMS_PAGE_CONFIG,
  },
];

mkdirSync(docsDir, { recursive: true });

for (const row of GUIDE_PAGES) {
  writeFileSync(join(docsDir, `${row.slug}.md`), guideConfigToMarkdown(row.config), 'utf8');
}

function listComponentLlmsMarkdown(): string[] {
  const componentsDir = join(publicDir, 'docs', 'components');
  let names: string[] = [];
  try {
    names = readdirSync(componentsDir, { withFileTypes: true })
      .filter(d => d.isFile() && d.name.endsWith('.md'))
      .map(d => d.name)
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
  return names.map(n => `/docs/components/${n}`);
}

const guidePaths = GUIDE_PAGES.map(g => ({
  path: `/docs/${g.slug}.md`,
  desc: g.desc,
}));

const componentPaths = listComponentLlmsMarkdown();

const llmsFullChunks = [
  '# @laczynski/lui Showcase - Full Markdown URI list',
  '',
  'Generated during npm run docs:build. Paths are rooted at this site.',
  '',
  '## Guides',
  '',
  ...guidePaths.map(g => `- ${g.path}: ${g.desc}`),
  '',
];

if (componentPaths.length === 0) {
  llmsFullChunks.push(
    '## Components',
    '',
    '(none - run docs:build after showcase metadata is present)',
  );
} else {
  llmsFullChunks.push('## Components', '', ...componentPaths.map(p => `- ${p}`));
}

writeFileSync(join(publicDir, 'llms-full.txt'), llmsFullChunks.join('\n') + '\n', 'utf8');

const previewComponents = componentPaths.slice(0, 12);

const llmsTxt = [
  '# @laczynski/lui Showcase',
  '',
  'LLM-oriented documentation endpoints. Fetch Markdown instead of HTML when possible.',
  '',
  '## Discovery',
  '',
  '- /llms.txt - this concise index.',
  `- /llms-full.txt - every guide and component Markdown URI (${guidePaths.length} guides + ${componentPaths.length} components).`,
  '- /docs/llms.md - expanded Markdown companion to this file.',
  '',
  '## Guide pages (*.md)',
  '',
  ...guidePaths.map(g => `- [${g.path}](${g.path}): ${g.desc}`),
  '',
];

if (componentPaths.length === 0) {
  llmsTxt.push(
    '## Components',
    '',
    'Run npm run docs:build to populate /docs/components/*.md from showcase metadata, then regenerate this index.',
    '',
  );
} else {
  llmsTxt.push(
    '## Components (snippet)',
    '',
    ...previewComponents.map(p => `- ${p}`),
    '',
    `...and ${Math.max(componentPaths.length - previewComponents.length, 0)} more paths listed in /llms-full.txt`,
    '',
  );
}

writeFileSync(join(publicDir, 'llms.txt'), llmsTxt.join('\n') + '\n', 'utf8');
