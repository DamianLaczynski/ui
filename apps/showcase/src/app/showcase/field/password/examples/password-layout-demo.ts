import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PasswordComponent } from 'ui';

@Component({
  selector: 'app-password-layout-demo',
  standalone: true,
  imports: [PasswordComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:46rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="flex:1 1 15rem;min-width:14rem">
          <ui-password
            label="Compact PIN password"
            labelPosition="above"
            size="small"
            inputVariant="filled-lighter"
            placeholder="Enter password"
          />
        </div>

        <div style="flex:1 1 15rem;min-width:14rem">
          <ui-password
            label="Admin secret"
            labelPosition="before"
            size="medium"
            inputVariant="filled-gray"
            placeholder="Enter password"
          />
        </div>
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.9375rem;font-weight:600">Prominent credential step</div>
        <ui-password
          label="Encryption passphrase"
          size="large"
          inputVariant="filled"
          placeholder="Create an encryption passphrase"
          helpText="Use a larger field when password creation is the primary task in the view."
        />
      </div>
    </div>
  `,
})
export class PasswordLayoutDemoComponent {}
