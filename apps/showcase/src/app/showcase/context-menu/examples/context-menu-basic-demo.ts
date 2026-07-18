import { Component, signal } from '@angular/core';
import { ButtonComponent, ContextMenuDirective, type MenuItem } from 'ui';

@Component({
  selector: 'app-context-menu-basic-demo',
  standalone: true,
  imports: [ButtonComponent, ContextMenuDirective],
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
        uiContextMenu
        [uiContextMenuItems]="menuItems"
        uiContextMenuAriaLabel="Canvas actions"
        (contextMenuItemClick)="onAction($event)"
        style="display:flex;flex-direction:column;gap:0.5rem;justify-content:center;min-height:10rem;padding:1.25rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest);cursor:context-menu"
      >
        <div style="font-size:0.9375rem;font-weight:600">Design canvas</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Right-click anywhere in this surface to open the context menu.
        </div>
      </div>
    </div>
  `,
})
export class ContextMenuBasicDemoComponent {
  protected readonly lastAction = signal('');

  protected readonly menuItems: MenuItem[] = [
    { id: 'open', label: 'Open', icon: 'open' },
    { id: 'duplicate', label: 'Duplicate', icon: 'document_copy' },
    { id: 'rename', label: 'Rename', icon: 'edit' },
    { id: 'archive', label: 'Archive', icon: 'archive' },
  ];

  protected onAction(item: MenuItem): void {
    this.lastAction.set(item.label);
  }

  protected reset(): void {
    this.lastAction.set('');
  }
}
