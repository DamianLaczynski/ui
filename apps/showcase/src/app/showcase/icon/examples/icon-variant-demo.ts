import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IconComponent } from 'lui';

@Component({
  selector: 'app-icon-variant-demo',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr));max-width:40rem;"
    >
      <div
        style="display:grid;gap:0.75rem;justify-items:center;padding:1rem;border:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 60%,transparent);border-radius:12px;background:var(--color-neutral-background-rest);"
      >
        <ui-icon icon="star" size="large" variant="regular" />
        <strong style="font-size:0.875rem;">Regular</strong>
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest);">
          Best for lower visual weight
        </span>
      </div>

      <div
        style="display:grid;gap:0.75rem;justify-items:center;padding:1rem;border:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 60%,transparent);border-radius:12px;background:var(--color-neutral-background-rest);"
      >
        <ui-icon icon="star" size="large" variant="filled" />
        <strong style="font-size:0.875rem;">Filled</strong>
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest);">
          Better for emphasis and active states
        </span>
      </div>

      <div
        style="display:grid;gap:0.75rem;justify-items:center;padding:1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:12px;background:var(--color-neutral-background2-rest);"
      >
        <ui-icon icon="arrow_clockwise_dashes_settings" size="large" [rotate]="90" />
        <strong style="font-size:0.875rem;">Rotation</strong>
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest);">
          Optional rotate for special cases
        </span>
      </div>
    </div>
  `,
})
export class IconVariantDemoComponent {}
