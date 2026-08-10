import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, MenuListComponent, type MenuItem, type MenuSection } from 'lui';

@Component({
  selector: 'app-menu-sections-shortcuts-demo',
  standalone: true,
  imports: [ButtonComponent, MenuListComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-button variant="secondary" appearance="outline" (click)="reset()">Reset</ui-button>
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Last action: <strong>{{ lastAction() || 'none' }}</strong>
        </span>
      </div>

      <div
        style="width:100%;max-width:20rem;padding:0.5rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-menu-list
          [sections]="sections"
          size="medium"
          variant="primary"
          appearance="subtle"
          (itemClick)="onItemClick($event)"
          (submenuClick)="lastAction.set('Opened submenu for ' + $event.label)"
        />
      </div>
    </div>
  `,
})
export class MenuSectionsShortcutsDemoComponent {
  protected readonly lastAction = signal('');

  protected readonly sections: MenuSection[] = [
    {
      header: 'File',
      divider: true,
      items: [
        { id: 'new', label: 'New file', icon: 'document', shortcut: 'Ctrl+N' },
        { id: 'open', label: 'Open', icon: 'folder', shortcut: 'Ctrl+O' },
        { id: 'save', label: 'Save', icon: 'save', shortcut: 'Ctrl+S' },
      ],
    },
    {
      header: 'Edit',
      divider: true,
      items: [
        { id: 'undo', label: 'Undo', icon: 'arrow_undo', shortcut: 'Ctrl+Z' },
        { id: 'redo', label: 'Redo', icon: 'arrow_redo', shortcut: 'Ctrl+Shift+Z', disabled: true },
        { id: 'find', label: 'Find', icon: 'search', shortcut: 'Ctrl+F' },
      ],
    },
    {
      header: 'View',
      items: [
        { id: 'outline', label: 'Outline', icon: 'panel_left', selected: true },
        { id: 'comments', label: 'Comments', icon: 'comment' },
      ],
    },
  ];

  protected onItemClick(item: MenuItem): void {
    this.lastAction.set(item.label);
  }

  protected reset(): void {
    this.lastAction.set('');
  }
}
