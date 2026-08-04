import { Component, ChangeDetectionStrategy } from '@angular/core';
import { KbdComponent } from 'ui';

@Component({
  selector: 'app-kbd-navigation-demo',
  standalone: true,
  imports: [KbdComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(17rem,1fr));gap:1rem;align-items:start"
    >
      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.875rem;font-weight:600">Navigation cluster</div>
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
          <ui-kbd text="↑" />
          <ui-kbd text="↓" />
          <ui-kbd text="←" />
          <ui-kbd text="→" />
          <ui-kbd text="Home" />
          <ui-kbd text="End" />
        </div>
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.875rem;font-weight:600">Paged movement</div>
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
          <ui-kbd text="Page Up" appearance="filled" />
          <ui-kbd text="Page Down" appearance="filled" />
          <ui-kbd text="Shift" />
          <ui-kbd text="Tab" />
        </div>
      </div>
    </div>
  `,
})
export class KbdNavigationDemoComponent {}
