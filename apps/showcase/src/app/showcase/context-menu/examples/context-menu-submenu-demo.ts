import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ContextMenuDirective, type MenuItem } from 'lui';

@Component({
  selector: 'app-context-menu-submenu-demo',
  standalone: true,
  imports: [ContextMenuDirective],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem">
      <div
        style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest);padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        Last action: <strong>{{ lastAction() || 'none' }}</strong>
      </div>

      <div
        uiContextMenu
        [uiContextMenuItems]="menuItems"
        uiContextMenuAriaLabel="Document actions"
        (contextMenuItemClick)="onAction($event)"
        style="display:flex;flex-direction:column;gap:0.5rem;justify-content:center;min-height:10rem;padding:1.25rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest);cursor:context-menu"
      >
        <div style="font-size:0.9375rem;font-weight:600">Quarterly report.docx</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Right-click to open export and share branches.
        </div>
      </div>
    </div>
  `,
})
export class ContextMenuSubmenuDemoComponent {
  protected readonly lastAction = signal('');

  protected readonly menuItems: MenuItem[] = [
    { id: 'open', label: 'Open', icon: 'open' },
    {
      id: 'export',
      label: 'Export as',
      icon: 'arrow_export',
      submenuItems: [
        { id: 'pdf', label: 'PDF', icon: 'document_pdf' },
        { id: 'docx', label: 'Word', icon: 'document' },
        { id: 'csv', label: 'CSV', icon: 'table' },
      ],
    },
    {
      id: 'share',
      label: 'Share',
      icon: 'share',
      submenuItems: [
        { id: 'link', label: 'Copy link', icon: 'link' },
        { id: 'invite', label: 'Invite people', icon: 'person_add' },
      ],
    },
    { id: 'delete', label: 'Delete', icon: 'delete', variant: 'danger' },
  ];

  protected onAction(item: MenuItem): void {
    this.lastAction.set(item.label);
  }
}
