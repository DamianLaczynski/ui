import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TagComponent } from 'lui';

@Component({
  selector: 'app-tag-appearance-variant-demo',
  standalone: true,
  imports: [TagComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:44rem">
      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.9375rem;font-weight:600">Subtle metadata tags</div>
        <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
          <ui-tag text="Billing" appearance="subtle" variant="secondary" />
          <ui-tag text="Compliance" appearance="subtle" variant="info" />
          <ui-tag text="High priority" appearance="subtle" variant="danger" />
        </div>
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.9375rem;font-weight:600">Higher-emphasis state tags</div>
        <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
          <ui-tag text="Published" appearance="filled" variant="success" />
          <ui-tag text="At risk" appearance="tint" variant="warning" />
          <ui-tag text="Blocked" appearance="outline" variant="danger" />
          <ui-tag text="New" appearance="filled" variant="primary" />
        </div>
      </div>
    </div>
  `,
})
export class TagAppearanceVariantDemoComponent {}
