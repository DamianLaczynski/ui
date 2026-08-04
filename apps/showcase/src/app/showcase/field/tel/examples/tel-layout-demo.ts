import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TelComponent } from 'ui';

@Component({
  selector: 'app-tel-layout-demo',
  standalone: true,
  imports: [TelComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:46rem">
      <div
        style="display:flex;flex-wrap:wrap;gap:1rem;align-items:flex-start;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="flex:1 1 15rem;min-width:14rem">
          <ui-tel
            label="Compact extension"
            size="small"
            inputVariant="filled-lighter"
            placeholder="555-0109"
          />
        </div>

        <div style="flex:1 1 15rem;min-width:14rem">
          <ui-tel
            label="Desk phone"
            labelPosition="before"
            size="medium"
            inputVariant="filled-gray"
            placeholder="+1 (555) 987-6543"
          />
        </div>
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.9375rem;font-weight:600">Prominent callback field</div>
        <ui-tel
          label="Callback number"
          size="large"
          inputVariant="filled"
          placeholder="+44 20 7946 0958"
          helpText="Use a larger field when phone contact is a primary action in the flow."
        />
      </div>
    </div>
  `,
})
export class TelLayoutDemoComponent {}
