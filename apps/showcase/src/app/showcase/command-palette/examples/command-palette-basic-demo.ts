import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, CommandPaletteComponent, type CommandPaletteItem } from 'ui';

const WORKSPACE_ITEMS: Omit<CommandPaletteItem, 'action'>[] = [
  {
    id: 'go-dashboard',
    label: 'Go to dashboard',
    description: 'Open the main workspace dashboard',
    icon: 'apps',
    group: 'Navigation',
    keywords: ['home', 'overview', 'dashboard'],
  },
  {
    id: 'go-projects',
    label: 'Open projects',
    description: 'Browse active and archived projects',
    icon: 'folder',
    group: 'Navigation',
    keywords: ['projects', 'workspaces', 'files'],
  },
  {
    id: 'new-project',
    label: 'Create project',
    description: 'Start a new project from a template',
    icon: 'document_add',
    group: 'Actions',
    keywords: ['new', 'create', 'project'],
  },
  {
    id: 'invite-user',
    label: 'Invite teammate',
    description: 'Send an invite to a new collaborator',
    icon: 'person_add',
    group: 'Actions',
    keywords: ['invite', 'user', 'teammate'],
  },
  {
    id: 'open-shortcuts',
    label: 'Show keyboard shortcuts',
    description: 'Open the keyboard shortcuts reference',
    icon: 'keyboard',
    group: 'Help',
    keywords: ['shortcuts', 'help', 'keyboard'],
  },
];

@Component({
  selector: 'app-command-palette-basic-demo',
  standalone: true,
  imports: [ButtonComponent, CommandPaletteComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:36rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-button variant="primary" (click)="visible.set(true)">Open command palette</ui-button>
        <ui-button variant="secondary" appearance="outline" (click)="reset()">Reset</ui-button>
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Last action: <strong>{{ lastAction() || 'none' }}</strong>
        </span>
      </div>

      <ui-command-palette
        [(visible)]="visible"
        [items]="items"
        placeholder="Type a command or search..."
        emptyText="No commands found"
        [maxResults]="8"
        (commandExecuted)="onExecuted($event)"
        (closed)="onClosed()"
      />
    </div>
  `,
})
export class CommandPaletteBasicDemoComponent {
  protected readonly visible = signal(false);
  protected readonly lastAction = signal('');

  protected readonly items = WORKSPACE_ITEMS.map(item => ({
    ...item,
    action: () => this.lastAction.set(item.label),
  }));

  protected onExecuted(item: CommandPaletteItem): void {
    this.lastAction.set(item.label);
  }

  protected onClosed(): void {
    if (!this.lastAction()) {
      this.lastAction.set('palette closed');
    }
  }

  protected reset(): void {
    this.visible.set(false);
    this.lastAction.set('');
  }
}
