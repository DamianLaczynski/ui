import { Component, signal } from '@angular/core';
import { ContextMenuDirective, type MenuItem, type MenuSection } from 'ui';

interface WorkspaceRow {
  id: string;
  label: string;
  meta: string;
  sections: MenuSection[];
}

@Component({
  selector: 'app-context-menu-sections-demo',
  standalone: true,
  imports: [ContextMenuDirective],
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:46rem">
      <div
        style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest);padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        Last action: <strong>{{ lastAction() || 'none' }}</strong>
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        @for (row of rows; track row.id) {
          <div
            uiContextMenu
            [uiContextMenuSections]="row.sections"
            (contextMenuItemClick)="onAction($event, row.label)"
            style="display:flex;flex-direction:column;gap:0.1875rem;padding:0.875rem 1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest);cursor:context-menu"
          >
            <div style="font-weight:600">{{ row.label }}</div>
            <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
              {{ row.meta }}
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class ContextMenuSectionsDemoComponent {
  protected readonly lastAction = signal('');

  protected readonly rows: WorkspaceRow[] = [
    {
      id: 'brief',
      label: 'Creative brief',
      meta: 'Updated 10 minutes ago',
      sections: [
        {
          header: 'File',
          items: [
            { id: 'open', label: 'Open', icon: 'open', shortcut: 'Enter' },
            { id: 'duplicate', label: 'Duplicate', icon: 'document_copy', shortcut: 'Ctrl+D' },
          ],
          divider: true,
        },
        {
          header: 'Workflow',
          items: [
            { id: 'share', label: 'Share', icon: 'share' },
            { id: 'archive', label: 'Archive', icon: 'archive' },
          ],
        },
      ],
    },
    {
      id: 'assets',
      label: 'Campaign assets',
      meta: '5 files waiting for approval',
      sections: [
        {
          items: [
            { id: 'preview', label: 'Preview', icon: 'eye' },
            { id: 'download', label: 'Download', icon: 'arrow_download' },
            { id: 'delete', label: 'Delete', icon: 'delete', disabled: true },
          ] as MenuItem[],
        },
      ],
    },
  ];

  protected onAction(item: MenuItem, label: string): void {
    this.lastAction.set(`${item.label} on ${label}`);
  }
}
