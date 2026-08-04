import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BadgeComponent } from 'ui';

@Component({
  selector: 'app-badge-composition-demo',
  standalone: true,
  imports: [BadgeComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:grid;gap:1rem">
      <div
        style="display:grid;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div
          style="display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:0.875rem;padding:1rem;border-radius:0.875rem;background:var(--color-neutral-background2-rest)"
        >
          <div style="display:flex;flex-direction:column;gap:0.5rem;min-width:0">
            <strong style="font-size:0.9375rem;color:var(--color-neutral-foreground-rest)"
              >Quarterly planning review</strong
            >
            <span
              style="font-size:0.875rem;line-height:1.5;color:var(--color-neutral-foreground2-rest)"
              >Use grouped badges to show ownership, risk, and freshness without building custom
              metadata chrome.</span
            >
            <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
              <ui-badge text="Marketing" variant="secondary" appearance="tint" />
              <ui-badge text="Needs review" variant="warning" appearance="outline" />
              <ui-badge text="Updated today" icon="calendar" variant="info" appearance="subtle" />
            </div>
          </div>
          <ui-badge text="2 blockers" variant="danger" />
        </div>
      </div>
    </div>
  `,
})
export class BadgeCompositionDemoComponent {}
