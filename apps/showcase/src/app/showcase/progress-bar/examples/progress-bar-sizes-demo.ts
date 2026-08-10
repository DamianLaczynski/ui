import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ProgressBarComponent } from 'lui';

@Component({
  selector: 'app-progress-bar-sizes-example',
  standalone: true,
  imports: [ProgressBarComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div style="display:flex;flex-direction:column;gap:1rem;width:100%;max-width:30rem">
      <div style="display:flex;flex-direction:column;gap:0.4rem">
        <div style="font-size:0.8125rem;font-weight:600">Small for dense rows</div>
        <ui-progress-bar size="small" [value]="32" ariaLabel="Dense row completion" />
      </div>
      <div style="display:flex;flex-direction:column;gap:0.4rem">
        <div style="font-size:0.8125rem;font-weight:600">Medium for standard panels</div>
        <ui-progress-bar size="medium" [value]="58" ariaLabel="Panel completion" />
      </div>
      <div style="display:flex;flex-direction:column;gap:0.4rem">
        <div style="font-size:0.8125rem;font-weight:600">Large for prominent status areas</div>
        <ui-progress-bar size="large" [value]="84" ariaLabel="Prominent completion status" />
      </div>
    </div>
  `,
})
export class ProgressBarSizesExampleComponent {}
