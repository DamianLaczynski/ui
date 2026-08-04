import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DividerComponent } from 'ui';

@Component({
  selector: 'app-divider-panel-sections-example',
  standalone: true,
  imports: [DividerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:34rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <div style="display:flex;flex-direction:column;gap:0.35rem">
        <div style="font-size:0.9375rem;font-weight:600">Customer health summary</div>
        <div style="font-size:0.8125rem;color:var(--color-neutral-foreground2-rest)">
          Last reviewed 12 minutes ago
        </div>
      </div>

      <ui-divider text="Signals" alignment="start" />
      <div style="font-size:0.875rem;line-height:1.55">
        Renewal confidence fell after legal review was delayed by two weeks.
      </div>

      <ui-divider text="Recommended action" alignment="start" />
      <div style="font-size:0.875rem;line-height:1.55">
        Book a procurement follow-up with finance and legal before the Friday checkpoint.
      </div>
    </div>
  `,
})
export class DividerPanelSectionsExampleComponent {}
