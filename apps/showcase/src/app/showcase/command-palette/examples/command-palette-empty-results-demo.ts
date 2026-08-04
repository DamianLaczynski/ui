import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, CommandPaletteComponent, type CommandPaletteItem } from 'ui';

const NAVIGATION_ITEMS: CommandPaletteItem[] = [
  {
    id: 'nav-inbox',
    label: 'Inbox',
    description: 'Review pending notifications and mentions',
    icon: 'mail',
    group: 'Navigation',
    keywords: ['mail', 'mentions', 'notifications'],
    action: () => {},
  },
  {
    id: 'nav-roadmap',
    label: 'Roadmap',
    description: 'Open the team roadmap view',
    icon: 'rocket',
    group: 'Navigation',
    keywords: ['roadmap', 'planning'],
    action: () => {},
  },
  {
    id: 'nav-settings',
    label: 'Settings',
    description: 'Configure account and workspace settings',
    icon: 'settings',
    group: 'Navigation',
    keywords: ['settings', 'preferences'],
    action: () => {},
  },
  {
    id: 'nav-help',
    label: 'Help center',
    description: 'Browse support articles and product docs',
    icon: 'question_circle',
    group: 'Support',
    keywords: ['docs', 'support', 'help'],
    action: () => {},
  },
];

@Component({
  selector: 'app-command-palette-empty-results-demo',
  standalone: true,
  imports: [ButtonComponent, CommandPaletteComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:40rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground2-rest)">
        Good empty results should explain what happened without turning into another generic empty
        state screen.
      </div>

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-button variant="primary" (click)="visible.set(true)">Open palette</ui-button>
        <ui-button variant="secondary" appearance="outline" (click)="visible.set(false)"
          >Close</ui-button
        >
      </div>

      <ui-command-palette
        [(visible)]="visible"
        [items]="items"
        placeholder="Search docs or support..."
        emptyText="No matching actions found"
        emptyDescription="Try another keyword such as dashboard, projects, or help."
        [maxResults]="6"
      />
    </div>
  `,
})
export class CommandPaletteEmptyResultsDemoComponent {
  protected readonly visible = signal(false);
  protected readonly items = NAVIGATION_ITEMS;
}
