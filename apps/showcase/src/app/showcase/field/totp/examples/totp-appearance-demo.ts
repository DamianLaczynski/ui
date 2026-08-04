import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TotpComponent } from 'ui';

@Component({
  selector: 'app-totp-appearance-demo',
  standalone: true,
  imports: [TotpComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:44rem">
      <div
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.9375rem;font-weight:600">Filled verification surface</div>
        <ui-totp
          label="Verification code"
          inputVariant="filled"
          size="medium"
          helpText="Balanced default for most auth surfaces."
        />
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.9375rem;font-weight:600">Alternative visual treatments</div>
        <div style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start">
          <div style="flex:1 1 12rem;min-width:11rem">
            <ui-totp label="Gray" inputVariant="filled-gray" size="small" />
          </div>
          <div style="flex:1 1 12rem;min-width:11rem">
            <ui-totp label="Lighter" inputVariant="filled-lighter" size="medium" />
          </div>
          <div style="flex:1 1 12rem;min-width:11rem">
            <ui-totp label="Underlined" inputVariant="underlined" size="large" />
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TotpAppearanceDemoComponent {}
