import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, MenuComponent, type MenuItem } from 'lui';

@Component({
  selector: 'app-menu-overflow-demo',
  standalone: true,
  imports: [ButtonComponent, MenuComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:40rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-button variant="secondary" appearance="outline" (click)="reset()">Reset</ui-button>
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Last action: <strong>{{ lastAction() || 'none' }}</strong>
        </span>
      </div>

      <div style="font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground2-rest)">
        The trigger sits inside a clipped shell, but the overlay should still escape and stay
        usable.
      </div>

      <div
        style="position:relative;height:8rem;overflow:hidden;padding:1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:linear-gradient(180deg,var(--color-neutral-background2-rest),var(--color-neutral-background-rest))"
      >
        <div style="position:absolute;right:1rem;bottom:1rem">
          <ui-menu
            triggerVariant="dropdown"
            text="More"
            icon="more_horizontal"
            [menuItems]="items"
            (menuItemClick)="onItemClick($event)"
          />
        </div>
      </div>
    </div>
  `,
})
export class MenuOverflowDemoComponent {
  protected readonly lastAction = signal('');

  protected readonly items: MenuItem[] = [
    { id: 'duplicate', label: 'Duplicate', icon: 'document_copy' },
    { id: 'move', label: 'Move to folder', icon: 'folder' },
    { id: 'delete', label: 'Delete', icon: 'delete' },
  ];

  protected onItemClick(item: MenuItem): void {
    this.lastAction.set(item.label);
  }

  protected reset(): void {
    this.lastAction.set('');
  }
}
