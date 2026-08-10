import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SpinnerComponent } from 'lui';

@Component({
  selector: 'app-spinner-basic-example',
  standalone: true,
  imports: [SpinnerComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-wrap:wrap;gap:1.25rem;align-items:flex-end">
      <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:flex-start">
        <ui-spinner labelPosition="none" ariaLabel="Refreshing issues list" />
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          label off · ariaLabel only
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.35rem;align-items:flex-start">
        <ui-spinner labelPosition="below" label="Loading workspace" ariaLabel="Loading workspace" />
        <span style="font-size:0.75rem;color:var(--color-neutral-foreground2-rest)">
          visible label + matching aria
        </span>
      </div>
    </div>
  `,
})
export class SpinnerBasicExampleComponent {}
