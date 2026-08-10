import { GuideDocPageConfig } from '@shared/components/guide-doc-page/guide-doc-page.models';

const iconSpriteAssetJson = `{
  "glob": "**/*",
  "input": "node_modules/@laczynski/lui/assets/icons",
  "output": "/assets/icons"
}`;

export const INSTALLATION_PAGE_CONFIG: GuideDocPageConfig = {
  title: 'Installation',
  description:
    'End-to-end setup for @laczynski/lui, from package install to first successful render.',
  containerClass: 'installation-doc',
  markdownAssetPath: '/docs/installation.md',
  sections: [
    {
      id: 'prerequisites',
      title: 'Prerequisites',
      blocks: [
        {
          type: 'list',
          items: [
            'Node.js 22.22.3+ (Node 24 LTS recommended)',
            'Angular 22+ project (standalone or module-based)',
            'Package manager: npm',
          ],
        },
      ],
    },
    {
      id: 'install-package',
      title: 'Install package',
      blocks: [
        {
          type: 'cards',
          layout: 'grid',
          cards: [
            {
              id: 'npm',
              eyebrow: 'npm',
              title: 'Package install',
              code: 'npm install @laczynski/lui',
            },
          ],
        },
      ],
    },
    {
      id: 'register-styles',
      title: 'Register styles',
      description: 'Add @laczynski/lui styles before your app styles in `angular.json`.',
      blocks: [
        {
          type: 'code',
          code: `"styles": [
  "node_modules/@laczynski/lui/src/lib/scss/main.scss",
  "src/styles.scss"
]`,
        },
      ],
    },
    {
      id: 'icon-sprite-npm-consumers',
      title: 'Icon sprite (npm consumers)',
      description:
        '`ui-icon` resolves the SVG sprite at `/assets/icons/sprite.svg`. The library ships that file under `node_modules/@laczynski/lui/assets/icons/`; copy it into your app bundle so the URL matches at runtime.',
      blocks: [
        {
          type: 'paragraph',
          content:
            'In `angular.json`, under `projects.<your-app>.architect.build.options`, merge this entry into the existing `assets` array (do not replace your other asset rules):',
        },
        {
          type: 'code',
          code: iconSpriteAssetJson,
        },
        {
          type: 'note',
          content:
            'After a production build, you should see `sprite.svg` under your output folder at `assets/icons/sprite.svg`. Without this step, icons render empty because the sprite file is not on the server.',
        },
      ],
    },
    {
      id: 'verify-setup',
      title: 'Verify setup',
      blocks: [
        {
          type: 'list',
          items: [
            'The app compiles without unknown element errors in templates.',
            'Base component styles are visible (buttons, inputs, typography).',
            'Dark and light mode tokens switch correctly if your app supports themes.',
            'Icons using `ui-icon` load: `/assets/icons/sprite.svg` is present in the built output when you install from npm.',
          ],
        },
        {
          type: 'note',
          content:
            'If something is missing, start by checking style order and then ensure components are imported in the consuming standalone component.',
        },
      ],
    },
    {
      id: 'legal-notice',
      title: 'Legal notice',
      blocks: [
        {
          type: 'note',
          content:
            '@laczynski/lui is an independent open-source project and is not affiliated with Microsoft Corporation. Fluent and Microsoft are trademarks of Microsoft Corporation.',
        },
      ],
    },
    {
      id: 'related-pages',
      title: 'Related pages',
      blocks: [
        {
          type: 'links',
          links: [
            {
              id: 'llms-docs',
              title: 'LLMs & Markdown endpoints',
              description: '`/llms.txt`, `/llms-full.txt`, and Markdown variants of docs pages.',
              routerLink: '/docs/llms',
            },
            {
              id: 'getting-started',
              title: 'Getting Started',
              description: 'Fast path from install to first production-ready feature.',
              routerLink: '/docs/getting-started',
            },
            {
              id: 'roadmap',
              title: 'Roadmap',
              description: 'Current priorities and upcoming milestones for @laczynski/lui.',
              routerLink: '/docs/roadmap',
            },
          ],
        },
      ],
    },
  ],
};
