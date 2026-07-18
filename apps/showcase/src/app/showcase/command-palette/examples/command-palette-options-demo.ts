import { Component, signal } from '@angular/core';
import { ButtonComponent, CommandPaletteComponent, type CommandPaletteItem } from 'ui';

const SEARCH_ITEMS: CommandPaletteItem[] = [
  {
    id: 'format-document',
    label: 'Format document',
    description: 'Auto-format the current document',
    icon: 'text_align_justify',
    shortcut: 'Ctrl+Shift+F',
    keywords: ['format', 'beautify', 'code', 'document'],
    action: () => {},
  },
  {
    id: 'build-project',
    label: 'Build project',
    description: 'Compile and validate the current project',
    icon: 'wrench',
    keywords: ['build', 'compile', 'validate', 'project'],
    action: () => {},
  },
  {
    id: 'run-tests',
    label: 'Run tests',
    description: 'Execute all available test suites',
    icon: 'beaker',
    keywords: ['test', 'qa', 'verify', 'checks'],
    action: () => {},
  },
  {
    id: 'deploy-preview',
    label: 'Deploy preview',
    description: 'Publish a preview build to the review environment',
    icon: 'arrow_upload',
    keywords: ['deploy', 'preview', 'publish', 'release'],
    action: () => {},
  },
  {
    id: 'save-all',
    label: 'Save all',
    description: 'Persist all open changes',
    icon: 'save',
    shortcut: 'Ctrl+S',
    keywords: ['save', 'store', 'persist'],
    action: () => {},
  },
];

const DISABLED_ITEMS: CommandPaletteItem[] = [
  {
    id: 'sync-now',
    label: 'Sync now',
    description: 'Synchronize the current workspace',
    icon: 'arrow_sync',
    group: 'Actions',
    keywords: ['sync', 'refresh'],
    action: () => {},
  },
  {
    id: 'premium-export',
    label: 'Export analytics',
    description: 'Requires a premium plan',
    icon: 'chart_multiple',
    group: 'Actions',
    keywords: ['export', 'analytics', 'premium'],
    disabled: true,
    action: () => {},
  },
  {
    id: 'locked-admin',
    label: 'Admin console',
    description: 'Unavailable without admin access',
    icon: 'shield',
    group: 'Navigation',
    keywords: ['admin', 'console', 'permissions'],
    disabled: true,
    action: () => {},
  },
  {
    id: 'open-billing',
    label: 'Open billing',
    description: 'Review billing and invoices',
    icon: 'wallet',
    group: 'Navigation',
    keywords: ['billing', 'invoices', 'payments'],
    action: () => {},
  },
];

@Component({
  selector: 'app-command-palette-options-demo',
  standalone: true,
  imports: [ButtonComponent, CommandPaletteComponent],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:40rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-button variant="primary" (click)="searchVisible.set(true)"
          >Open search-heavy palette</ui-button
        >
        <ui-button variant="secondary" appearance="outline" (click)="disabledVisible.set(true)">
          Open disabled-items palette
        </ui-button>
        <ui-button variant="secondary" appearance="outline" (click)="reset()">Reset</ui-button>
      </div>

      <ui-command-palette
        [(visible)]="searchVisible"
        [items]="searchItems"
        placeholder="Search commands, tests, builds..."
        emptyText="Try another keyword"
        emptyDescription="Search matches label, description, and keywords."
        [maxResults]="5"
      />

      <ui-command-palette
        [(visible)]="disabledVisible"
        [items]="disabledItems"
        placeholder="What would you like to do?"
        emptyText="No matching actions found"
        [maxResults]="8"
      />
    </div>
  `,
})
export class CommandPaletteOptionsDemoComponent {
  protected readonly searchVisible = signal(false);
  protected readonly disabledVisible = signal(false);

  protected readonly searchItems = SEARCH_ITEMS;
  protected readonly disabledItems = DISABLED_ITEMS;

  protected reset(): void {
    this.searchVisible.set(false);
    this.disabledVisible.set(false);
  }
}
