import { GuideDocPageConfig } from '@shared/components/guide-doc-page/guide-doc-page.models';

export const GETTING_STARTED_PAGE_CONFIG: GuideDocPageConfig = {
  title: 'Getting Started',
  description:
    'Build a production-ready @laczynski/lui flow in minutes. This guide gives you the fastest path from installation to your first shipped screen.',
  containerClass: 'getting-started-doc',
  markdownAssetPath: '/docs/getting-started.md',
  sections: [
    {
      id: 'who-this-guide-is-for',
      title: 'Who this guide is for',
      blocks: [
        {
          type: 'list',
          items: [
            'Teams building an internal design system on top of Angular components',
            'Projects that need consistent Fluent-inspired styling and accessibility defaults',
            'Developers who want fast setup without giving up TypeScript safety',
          ],
        },
      ],
    },
    {
      id: '30-minute-setup-path',
      title: '30-minute setup path',
      blocks: [
        {
          type: 'cards',
          cards: [
            {
              id: 'install',
              eyebrow: 'Step 1',
              title: 'Install the package',
              description: 'Add ui to your workspace with your package manager of choice.',
              code: 'npm install ui',
            },
            {
              id: 'styles',
              eyebrow: 'Step 2',
              title: 'Register base styles',
              description:
                'Include library styles once in angular.json so every component gets consistent tokens.',
              code: `"styles": [
  "node_modules/@laczynski/lui/src/lib/scss/main.scss",
  "src/styles.scss"
]`,
            },
            {
              id: 'import',
              eyebrow: 'Step 3',
              title: 'Import only what you use',
              description:
                'Use standalone imports in your feature component to keep bundles lean and code explicit.',
              code: `import { ButtonComponent } from 'lui';

@Component({
  selector: 'app-example',
  imports: [ButtonComponent],
  template: '<ui-button variant="primary">Save changes</ui-button>'
})
export class ExampleComponent {}`,
            },
            {
              id: 'theme',
              eyebrow: 'Step 4',
              title: 'Set up theming',
              description:
                'Start with default light/dark support, then override CSS variables in your app styles.',
            },
          ],
        },
      ],
    },
    {
      id: 'first-production-feature-checklist',
      title: 'First production feature checklist',
      blocks: [
        {
          type: 'note',
          content: 'Use this as a minimum quality gate before merging your first screen to main.',
        },
        {
          type: 'list',
          items: [
            'Define one source of truth for colors and spacing tokens.',
            'Add form validation states (default, error, disabled, loading).',
            'Test keyboard navigation and focus states before release.',
            'Document your internal usage pattern in one page for the team.',
          ],
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
            '@laczynski/lui is an independent open-source project. It is not affiliated with, endorsed by, or sponsored by Microsoft Corporation. Visual styling is inspired by Fluent 2 design principles. Fluent, Fluent UI, and Microsoft are trademarks of Microsoft Corporation. Icons use @fluentui/svg-icons (MIT License).',
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
              id: 'installation',
              title: 'Installation',
              description: 'Environment requirements and setup checklist for your project.',
              routerLink: '/docs/installation',
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
