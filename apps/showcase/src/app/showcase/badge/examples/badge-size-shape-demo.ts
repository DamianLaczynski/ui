import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BadgeComponent } from 'ui';

@Component({
  selector: 'app-badge-size-shape-demo',
  standalone: true,
  imports: [BadgeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:grid;gap:1rem">
      <div
        style="display:flex;flex-wrap:wrap;align-items:center;gap:1rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-badge text="S" size="small" />
        <ui-badge text="Medium" size="medium" />
        <ui-badge text="Large badge" size="large" />
      </div>

      <div
        style="display:flex;flex-wrap:wrap;align-items:center;gap:1rem;padding:1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-badge text="Rounded" shape="rounded" variant="secondary" appearance="tint" />
        <ui-badge text="24" shape="circular" variant="danger" />
        <ui-badge text="Tile" shape="square" variant="info" appearance="outline" />
      </div>
    </div>
  `,
})
export class BadgeSizeShapeDemoComponent {}
