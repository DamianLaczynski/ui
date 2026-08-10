import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, CommandPaletteComponent, type CommandPaletteItem } from 'lui';

const GROUPED_ITEMS: CommandPaletteItem[] = [
  {
    id: 'go-dashboard',
    label: 'Go to dashboard',
    description: 'Open the main workspace dashboard',
    icon: 'apps',
    group: 'Navigation',
    keywords: ['home', 'overview', 'dashboard'],
    action: () => {},
  },
  {
    id: 'go-projects',
    label: 'Open projects',
    description: 'Browse active and archived projects',
    icon: 'folder',
    group: 'Navigation',
    keywords: ['projects', 'workspaces', 'files'],
    action: () => {},
  },
  {
    id: 'new-project',
    label: 'Create project',
    description: 'Start a new project from a template',
    icon: 'document_add',
    group: 'Actions',
    keywords: ['new', 'create', 'project'],
    action: () => {},
  },
  {
    id: 'invite-user',
    label: 'Invite teammate',
    description: 'Send an invite to a new collaborator',
    icon: 'person_add',
    group: 'Actions',
    keywords: ['invite', 'user', 'teammate'],
    action: () => {},
  },
  {
    id: 'open-shortcuts',
    label: 'Show keyboard shortcuts',
    description: 'Open the keyboard shortcuts reference',
    icon: 'keyboard',
    group: 'Help',
    keywords: ['shortcuts', 'help', 'keyboard'],
    action: () => {},
  },
];

@Component({
  selector: 'app-command-palette-grouping-demo',
  standalone: true,
  imports: [ButtonComponent, CommandPaletteComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;width:100%;max-width:48rem"
    >
      <div
        style="flex:1 1 18rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Grouped commands
        </p>
        <ui-button variant="primary" appearance="outline" (click)="groupedVisible.set(true)">
          Open grouped palette
        </ui-button>
        <ui-command-palette
          [(visible)]="groupedVisible"
          [items]="groupedItems"
          placeholder="Search grouped commands..."
          emptyText="No grouped commands found"
          [maxResults]="8"
        />
      </div>

      <div
        style="flex:1 1 18rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <p
          style="margin:0 0 0.75rem;font-size:0.875rem;font-weight:600;color:var(--color-neutral-foreground2-rest)"
        >
          Flat commands
        </p>
        <ui-button variant="secondary" appearance="outline" (click)="flatVisible.set(true)">
          Open flat palette
        </ui-button>
        <ui-command-palette
          [(visible)]="flatVisible"
          [items]="flatItems"
          placeholder="Search flat commands..."
          emptyText="No flat commands found"
          [maxResults]="8"
        />
      </div>
    </div>
  `,
})
export class CommandPaletteGroupingDemoComponent {
  protected readonly groupedVisible = signal(false);
  protected readonly flatVisible = signal(false);

  protected readonly groupedItems = GROUPED_ITEMS;
  protected readonly flatItems = GROUPED_ITEMS.map(({ group, ...item }) => item);
}
