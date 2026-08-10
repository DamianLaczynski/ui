import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, MenuComponent, type MenuItem } from 'lui';

@Component({
  selector: 'app-menu-context-actions-demo',
  standalone: true,
  imports: [ButtonComponent, MenuComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:46rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-button variant="secondary" appearance="outline" (click)="reset()">Reset</ui-button>
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Last action: <strong>{{ lastAction() || 'none' }}</strong>
        </span>
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        @for (item of rows; track item.id) {
          <div
            style="display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:0.75rem 0.875rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:0.875rem;background:var(--color-neutral-background-rest)"
          >
            <div style="display:flex;flex-direction:column;gap:0.1875rem;min-width:0">
              <div
                style="font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"
              >
                {{ item.label }}
              </div>
              <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
                {{ item.meta }}
              </div>
            </div>
            <ui-menu
              triggerVariant="dropdown"
              [menuItems]="item.menuItems"
              icon="more_horizontal"
              size="small"
              [ariaLabel]="'Row actions'"
              (menuItemClick)="onMenuAction($event, item.label)"
            />
          </div>
        }
      </div>
    </div>
  `,
})
export class MenuContextActionsDemoComponent {
  protected readonly lastAction = signal('');

  protected readonly rows = [
    {
      id: 'brief',
      label: 'Creative brief',
      meta: 'Updated 10 minutes ago',
      menuItems: [
        { id: 'open-brief', label: 'Open', icon: 'open' },
        { id: 'duplicate-brief', label: 'Duplicate', icon: 'document_copy' },
        { id: 'archive-brief', label: 'Archive', icon: 'archive' },
      ] as MenuItem[],
    },
    {
      id: 'assets',
      label: 'Campaign assets',
      meta: '5 files waiting for approval',
      menuItems: [
        { id: 'open-assets', label: 'Open', icon: 'open' },
        { id: 'share-assets', label: 'Share', icon: 'share' },
        { id: 'delete-assets', label: 'Delete', icon: 'delete', disabled: true },
      ] as MenuItem[],
    },
  ];

  protected onMenuAction(item: MenuItem, label: string): void {
    this.lastAction.set(`${item.label} on ${label}`);
  }

  protected reset(): void {
    this.lastAction.set('');
  }
}
