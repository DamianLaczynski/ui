import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BadgeComponent, ButtonComponent, IconComponent } from 'ui';

@Component({
  selector: 'app-icon-semantic-demo',
  standalone: true,
  imports: [IconComponent, ButtonComponent, BadgeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <section
      style="display:grid;gap:1rem;max-width:48rem;padding:1.25rem;border:1px solid color-mix(in srgb,var(--color-neutral-stroke-rest) 70%,transparent);border-radius:1rem;background:color-mix(in srgb,var(--color-neutral-background-rest) 92%,white);"
    >
      <div style="display:grid;gap:0.25rem;">
        <h3 style="margin:0;font-size:1rem;">Decorative and semantic usage</h3>
        <p style="margin:0;font-size:0.875rem;color:var(--color-neutral-foreground2-rest);">
          Most icons are decorative. Add ariaLabel only when the icon itself needs to be announced
          as meaningful content.
        </p>
      </div>

      <div style="display:flex;flex-wrap:wrap;gap:0.875rem;">
        <ui-button text="Search workspace" icon="search" />
        <ui-button text="Settings" icon="settings" variant="secondary" />
        <ui-badge text="Synced" icon="checkmark" variant="success" />
      </div>

      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;padding:0.875rem 1rem;border:1px dashed var(--color-neutral-stroke-rest);border-radius:12px;background:var(--color-neutral-background2-rest);"
      >
        <div style="display:flex;align-items:center;gap:0.5rem;">
          <ui-icon icon="info" ariaLabel="Informational status" />
          <span style="font-size:0.875rem;">Semantic icon with ariaLabel</span>
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem;">
          <ui-icon icon="info" />
          <span style="font-size:0.875rem;">Decorative icon without extra announcement</span>
        </div>
      </div>
    </section>
  `,
})
export class IconSemanticDemoComponent {}
