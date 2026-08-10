import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent, MenuComponent, type MenuItem } from 'lui';

@Component({
  selector: 'app-menu-basic-demo',
  standalone: true,
  imports: [ButtonComponent, MenuComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:38rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:0.75rem 0.875rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-button variant="secondary" appearance="outline" (click)="reset()">Reset</ui-button>
        <span style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Last action: <strong>{{ lastAction() || 'none' }}</strong>
        </span>
      </div>

      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-menu
          triggerVariant="dropdown"
          text="View"
          icon="apps"
          [menuItems]="viewItems"
          appearance="filled"
          variant="primary"
          (menuItemClick)="onItemClick($event)"
        />

        <ui-menu
          triggerVariant="button"
          text="Open quick panel"
          icon="open"
          [menuItems]="[]"
          appearance="outline"
          variant="secondary"
          (primaryClick)="lastAction.set('Quick panel opened')"
        />
      </div>
    </div>
  `,
})
export class MenuBasicDemoComponent {
  protected readonly lastAction = signal('');

  protected readonly viewItems: MenuItem[] = [
    { id: 'board', label: 'Board', icon: 'board' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar' },
    { id: 'timeline', label: 'Timeline', icon: 'clock' },
  ];

  protected onItemClick(item: MenuItem): void {
    this.lastAction.set(item.label);
  }

  protected reset(): void {
    this.lastAction.set('');
  }
}
