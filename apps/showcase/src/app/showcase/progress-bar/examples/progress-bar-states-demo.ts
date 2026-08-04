import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ProgressBarComponent } from 'ui';

@Component({
  selector: 'app-progress-bar-states-example',
  standalone: true,
  imports: [ProgressBarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:32rem">
      <div style="display:flex;flex-direction:column;gap:0.45rem">
        <div style="display:flex;justify-content:space-between;gap:1rem;font-size:0.875rem">
          <span style="font-weight:600">Processing invoice batch</span>
          <span>Step 2 of 4</span>
        </div>
        <ui-progress-bar
          variant="info"
          type="determinate"
          [value]="48"
          ariaLabel="Processing invoice batch"
          ariaValueText="Step 2 of 4, 48 percent complete"
        />
      </div>

      <div style="display:flex;flex-direction:column;gap:0.45rem">
        <div style="display:flex;justify-content:space-between;gap:1rem;font-size:0.875rem">
          <span style="font-weight:600">Waiting for antivirus scan</span>
          <span>Unknown duration</span>
        </div>
        <ui-progress-bar
          variant="secondary"
          type="indeterminate"
          ariaLabel="Waiting for antivirus scan"
          ariaValueText="Scan in progress"
        />
      </div>
    </div>
  `,
})
export class ProgressBarStatesExampleComponent {}
