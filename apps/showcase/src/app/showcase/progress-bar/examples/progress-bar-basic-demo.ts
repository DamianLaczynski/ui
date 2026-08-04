import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ProgressBarComponent } from 'ui';

@Component({
  selector: 'app-progress-bar-basic-example',
  standalone: true,
  imports: [ProgressBarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:0.5rem;width:100%;max-width:28rem">
      <div style="display:flex;justify-content:space-between;gap:1rem;font-size:0.875rem">
        <span style="font-weight:600">Uploading contract.pdf</span>
        <span>64%</span>
      </div>
      <ui-progress-bar
        variant="primary"
        size="medium"
        type="determinate"
        [value]="64"
        ariaLabel="Uploading contract.pdf"
        ariaValueText="64 percent uploaded"
      />
    </div>
  `,
})
export class ProgressBarBasicExampleComponent {}
