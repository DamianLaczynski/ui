import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BadgeComponent } from 'lui';

@Component({
  selector: 'app-badge-appearance-variant-demo',
  standalone: true,
  imports: [BadgeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:grid;gap:1rem">
      <div
        style="display:grid;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
          <ui-badge text="Primary filled" variant="primary" appearance="filled" />
          <ui-badge text="Primary tint" variant="primary" appearance="tint" />
          <ui-badge text="Primary outline" variant="primary" appearance="outline" />
          <ui-badge text="Primary subtle" variant="primary" appearance="subtle" />
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:0.75rem">
          <ui-badge text="Success" variant="success" appearance="filled" />
          <ui-badge text="Warning" variant="warning" appearance="tint" />
          <ui-badge text="Danger" variant="danger" appearance="outline" />
          <ui-badge text="Info" variant="info" appearance="subtle" />
        </div>
      </div>

      <div
        style="display:flex;flex-wrap:wrap;gap:0.75rem;padding:1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background2-rest)"
      >
        <ui-badge text="Muted metadata" variant="secondary" appearance="subtle" />
        <ui-badge text="Elevated status" variant="info" appearance="filled" />
        <ui-badge text="Inline emphasis" variant="warning" appearance="outline" />
      </div>
    </div>
  `,
})
export class BadgeAppearanceVariantDemoComponent {}
