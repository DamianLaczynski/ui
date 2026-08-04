import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavComponent, type NavNode } from 'ui';

const items: NavNode[] = [
  { id: 'overview', label: 'Overview', icon: 'book', selected: true },
  { id: 'reports', label: 'Reports', icon: 'document' },
  { id: 'automation', label: 'Automation', icon: 'design_ideas' },
];

@Component({
  selector: 'app-nav-appearance-demo',
  standalone: true,
  imports: [NavComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:20rem">
      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="margin:0 0 0.75rem;font-size:0.9375rem;font-weight:600">
          Subtle workspace rail
        </div>
        <ui-nav [items]="items" appearance="subtle" variant="primary" />
      </div>

      <div
        style="padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="margin:0 0 0.75rem;font-size:0.9375rem;font-weight:600">
          Filled secondary rail
        </div>
        <ui-nav [items]="items" appearance="filled" variant="secondary" shape="circular" />
      </div>
    </div>
  `,
})
export class NavAppearanceDemoComponent {
  protected readonly items = items;
}
