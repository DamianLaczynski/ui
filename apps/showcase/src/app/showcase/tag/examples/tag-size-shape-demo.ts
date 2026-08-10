import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TagComponent } from 'lui';

@Component({
  selector: 'app-tag-size-shape-demo',
  standalone: true,
  imports: [TagComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:42rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-tag text="Small" size="small" appearance="tint" variant="primary" />
        <ui-tag text="Medium" size="medium" appearance="tint" variant="primary" />
        <ui-tag text="Large" size="large" appearance="tint" variant="primary" />
      </div>

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <ui-tag text="Rounded" shape="rounded" appearance="outline" variant="secondary" />
        <ui-tag text="Circular" shape="circular" appearance="outline" variant="secondary" />
        <ui-tag text="Square" shape="square" appearance="outline" variant="secondary" />
      </div>
    </div>
  `,
})
export class TagSizeShapeDemoComponent {}
