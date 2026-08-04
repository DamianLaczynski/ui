import { Component, ChangeDetectionStrategy } from '@angular/core';
import { KbdComponent } from 'ui';

@Component({
  selector: 'app-kbd-size-appearance-demo',
  standalone: true,
  imports: [KbdComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr));gap:1rem;align-items:start"
    >
      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.875rem;font-weight:600">Default appearance</div>
        <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center">
          <ui-kbd text="Ctrl" size="small" appearance="default" />
          <ui-kbd text="Ctrl" size="medium" appearance="default" />
          <ui-kbd text="Ctrl" size="large" appearance="default" />
        </div>
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.75rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.875rem;font-weight:600">Filled appearance</div>
        <div style="display:flex;flex-wrap:wrap;gap:0.75rem;align-items:center">
          <ui-kbd text="Ctrl" size="small" appearance="filled" />
          <ui-kbd text="Ctrl" size="medium" appearance="filled" />
          <ui-kbd text="Ctrl" size="large" appearance="filled" />
        </div>
      </div>
    </div>
  `,
})
export class KbdSizeAppearanceDemoComponent {}
