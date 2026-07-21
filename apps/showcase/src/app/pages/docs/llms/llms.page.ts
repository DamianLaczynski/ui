import type { GuideDocPageConfig } from '@shared/components/guide-doc-page/guide-doc-page.models';

export const LLMS_PAGE_CONFIG: GuideDocPageConfig = {
  title: 'LLMs.txt & Markdown docs',
  description:
    'LLM-friendly documentation endpoints for this showcase. Static Markdown mirrors structured guides under `/docs/*.md`; component bundles live under `/docs/components`.',
  containerClass: 'llms-doc',
  markdownAssetPath: '/docs/llms.md',
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      blocks: [
        {
          type: 'paragraph',
          content:
            'These endpoints follow common patterns (similar to `[llms.txt](https://llmstxt.org/)`) so tools and assistants can fetch plain text instead of scraping HTML.',
        },
      ],
    },
    {
      id: 'discovery-files',
      title: 'Discovery files',
      blocks: [
        {
          type: 'list',
          items: [
            '`/llms.txt` - short index of guides, the LLMs overview Markdown URL, and a pointer to the full component list.',
            '`/llms-full.txt` - complete list of `/docs/*.md` guide URLs plus every `/docs/components/{slug}.md` component file.',
          ],
        },
      ],
    },
    {
      id: 'guide-markdown',
      title: 'Guide pages as Markdown',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Append **`.md`** to the slug under `/docs/` to retrieve a Markdown rendition of each guide-style page:',
        },
        {
          type: 'list',
          items: [
            '`/docs/getting-started.md`',
            '`/docs/installation.md`',
            '`/docs/i18n.md`',
            '`/docs/roadmap.md`',
            '`/docs/llms.md` - this overview in Markdown form',
          ],
        },
        {
          type: 'paragraph',
          content:
            'Files are emitted into `public/docs/` during `npm run docs:build` and copied to the deployed site root.',
        },
      ],
    },
    {
      id: 'component-markdown',
      title: 'Component Markdown',
      blocks: [
        {
          type: 'paragraph',
          content:
            'Each showcase publishes an AI-oriented Markdown bundle (title, intro, imports, snippet sources) built from showcase metadata:',
        },
        {
          type: 'list',
          items: [
            '`/docs/components/{component}.md` - e.g. `/docs/components/button.md`, `/docs/components/pagination.md`',
            '`/docs/components/snippets/{slug}/...` - raw TypeScript example files copied alongside the Markdown',
          ],
        },
      ],
    },
    {
      id: 'related',
      title: 'Related',
      blocks: [
        {
          type: 'links',
          links: [
            {
              id: 'getting-started',
              title: 'Getting Started',
              description: 'Fast path through install, styles and first composition.',
              routerLink: '/docs/getting-started',
            },
            {
              id: 'installation',
              title: 'Installation',
              description: 'Package, styles, icons and Angular configuration.',
              routerLink: '/docs/installation',
            },
          ],
        },
      ],
    },
  ],
};
