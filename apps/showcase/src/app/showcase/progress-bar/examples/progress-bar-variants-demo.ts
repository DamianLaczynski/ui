import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ProgressBarComponent } from 'ui';

@Component({
  selector: 'app-progress-bar-variants-example',
  standalone: true,
  imports: [ProgressBarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:0.9rem;width:100%;max-width:32rem">
      <div style="display:flex;flex-direction:column;gap:0.4rem">
        <div style="display:flex;justify-content:space-between;gap:1rem;font-size:0.8125rem">
          <span style="font-weight:600">Sync in progress</span>
          <span>35%</span>
        </div>
        <ui-progress-bar variant="primary" [value]="35" ariaLabel="Sync in progress" />
      </div>
      <div style="display:flex;flex-direction:column;gap:0.4rem">
        <div style="display:flex;justify-content:space-between;gap:1rem;font-size:0.8125rem">
          <span style="font-weight:600">Review completed</span>
          <span>100%</span>
        </div>
        <ui-progress-bar variant="success" [value]="100" ariaLabel="Review completed" />
      </div>
      <div style="display:flex;flex-direction:column;gap:0.4rem">
        <div style="display:flex;justify-content:space-between;gap:1rem;font-size:0.8125rem">
          <span style="font-weight:600">Storage limit approaching</span>
          <span>91%</span>
        </div>
        <ui-progress-bar variant="warning" [value]="91" ariaLabel="Storage limit approaching" />
      </div>
      <div style="display:flex;flex-direction:column;gap:0.4rem">
        <div style="display:flex;justify-content:space-between;gap:1rem;font-size:0.8125rem">
          <span style="font-weight:600">Import failed</span>
          <span>47%</span>
        </div>
        <ui-progress-bar variant="danger" [value]="47" ariaLabel="Import failed" />
      </div>
    </div>
  `,
})
export class ProgressBarVariantsExampleComponent {}
