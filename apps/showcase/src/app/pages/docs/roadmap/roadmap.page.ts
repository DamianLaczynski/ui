import { GuideDocPageConfig } from '@shared/components/guide-doc-page/guide-doc-page.models';

export const ROADMAP_PAGE_CONFIG: GuideDocPageConfig = {
  title: 'Roadmap',
  description:
    'Our current direction for @laczynski/ui. This roadmap reflects planned priorities, not fixed promises.',
  containerClass: 'roadmap-doc',
  markdownAssetPath: '/docs/roadmap.md',
  sections: [
    {
      id: 'planned-milestones',
      title: 'Planned milestones',
      blocks: [
        {
          type: 'cards',
          cards: [
            {
              id: 'q1-2026',
              eyebrow: 'Q1 2026',
              title: 'Core stabilization',
              statusLabel: 'Shipped',
              statusTone: 'shipped',
              items: [
                'Unified token system for light and dark mode.',
                'Baseline accessibility pass for core form and navigation components.',
                'Initial docs foundation with showcase and getting-started flows.',
              ],
            },
            {
              id: 'q2-2026',
              eyebrow: 'Q2 2026',
              title: 'Developer experience',
              statusLabel: 'In Progress',
              statusTone: 'in-progress',
              items: [
                'More complete API docs with usage patterns and anti-patterns.',
                'Theming guide with real enterprise examples.',
                'Improved test coverage for interactive components.',
              ],
            },
            {
              id: 'q3-2026',
              eyebrow: 'Q3 2026',
              title: 'Advanced components',
              statusLabel: 'Planned',
              statusTone: 'planned',
              items: [
                'Data-heavy patterns: richer tables, filtering and state containers.',
                'Animation and motion presets aligned with Fluent-inspired guidance.',
                'Stronger layout primitives for dashboards and enterprise forms.',
              ],
            },
            {
              id: 'q4-2026',
              eyebrow: 'Q4 2026',
              title: 'Release quality and ecosystem',
              statusLabel: 'Planned',
              statusTone: 'planned',
              items: [
                'Versioned migration guides and changelog quality improvements.',
                'Starter templates and schematic support for onboarding speed.',
                'Performance benchmarks and bundle-size tracking in CI.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'how-we-prioritize',
      title: 'How we prioritize',
      blocks: [
        {
          type: 'list',
          items: [
            'Accessibility, performance and API consistency are release gates.',
            'Breaking changes are grouped and documented with migration paths.',
            'Roadmap can shift based on user feedback and production priorities.',
          ],
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
              id: 'getting-started',
              title: 'Getting Started',
              description: 'Fast path from install to first production-ready feature.',
              routerLink: '/docs/getting-started',
            },
            {
              id: 'installation',
              title: 'Installation',
              description: 'Environment requirements and setup checklist for your project.',
              routerLink: '/docs/installation',
            },
          ],
        },
      ],
    },
  ],
};
